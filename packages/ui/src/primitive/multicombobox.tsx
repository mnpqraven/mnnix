// SOURCE: https://craft.mxkaske.dev/post/fancy-box

import { cn } from "@repo/lib";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type } from "arktype";
import { cva } from "class-variance-authority";
import Fuse, { type FuseOptionKey } from "fuse.js";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  type HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Badge } from "./badge";
import { Button, type ButtonProps } from "./button";
import { Command, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function stringSer(val: string | number): string {
  if (typeof val === "string") return val;
  if (typeof val === "number") {
    if (Number.isNaN(val)) return "";
    return val.toString();
  }
  return "";
}

const searchOptSchema = type({
  value: "boolean = true",
  label: "boolean = true",
});
type SearchOptSchema = typeof searchOptSchema.infer;

type Value = string | number;

interface Prop<T> extends ButtonProps {
  options: T[];
  labelAccessor: (item: T) => string;
  valueAccessor: (item: T) => Value;
  defaultValues?: Value[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  selectedPlaceholder?: (amount: number) => string;
  values?: Value[] | null;
  onValueChange?: (to: (string | number)[]) => void;
  /**
   * if the items should be displayed as badges
   * */
  badge?: boolean;
  /**
   * the amount of items that will make the list truncate
   * */
  truncateAmount?: number;
  isLoading?: boolean;
  searchOpt?: SearchOptSchema;
}

export function MultiCombobox<T>({
  options,
  valueAccessor,
  labelAccessor,
  defaultValues,
  emptyLabel = "No result found.",
  placeholder,
  searchPlaceholder,
  selectedPlaceholder,
  values,
  isLoading = false,
  onValueChange,
  className,
  badge = false,
  truncateAmount = 3,
  searchOpt,
  ...props
}: Prop<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<Value[]>(
    defaultValues ?? [],
  );
  const vals = values ?? selectedValues;

  useEffect(() => {
    if (values) setSelectedValues(values);
  }, [values]);

  function toggleItem(index: number) {
    const option = filteredOptions[index];
    if (option) {
      const nextFn = (currentOptions: Value[]): Value[] => {
        const ret = !currentOptions.some((e) => e === valueAccessor(option))
          ? [...currentOptions, valueAccessor(option)]
          : currentOptions.filter((l) => l !== valueAccessor(option));
        return ret;
      };
      const nextVals = nextFn(selectedValues);

      if (onValueChange) onValueChange(nextVals);
      setSelectedValues(nextVals);

      // inputRef?.current?.focus();
    }
  }

  const onComboboxOpenChange = (value: boolean) => {
    // inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const searchEngine = useMemo(() => {
    const parsed = searchOptSchema(searchOpt);
    const keys: FuseOptionKey<T>[] = [];

    if (!(parsed instanceof type.errors)) {
      const { label: doSearchLabel, value: doSearchValue } = parsed;
      if (doSearchLabel) keys.push({ getFn: labelAccessor, name: "label" });
      if (doSearchValue)
        keys.push({
          getFn: (val) => stringSer(valueAccessor(val)),
          name: "value",
        });
    }

    return new Fuse(options, { keys });
  }, [searchOpt, options]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filteredOptions = useMemo(() => {
    if (!searchValue.length) return options;
    const searchQuery = searchEngine.search(searchValue);
    return searchQuery.map((e) => e.item);
  }, [searchValue, options]);

  return (
    <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={openCombobox}
          className={cn(
            "flex w-full justify-between text-foreground",
            className,
          )}
          {...props}
        >
          <AmountLabel
            values={vals}
            options={filteredOptions}
            placeholder={placeholder}
            labelAccessor={labelAccessor}
            selectedPlaceholder={selectedPlaceholder}
            truncateAmount={truncateAmount}
            valueAccessor={valueAccessor}
            badge={badge}
          />

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder={searchPlaceholder ?? "Search..."}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandGroup>
            {isLoading || !filteredOptions.length ? (
              <LoadingDisplay
                isLoading={isLoading}
                dataLength={filteredOptions.length}
                emptyLabel={emptyLabel}
              />
            ) : (
              <VirtualizedList<T>
                options={filteredOptions}
                values={vals}
                labelAccessor={labelAccessor}
                valueAccessor={valueAccessor}
                onItemSelect={toggleItem}
                searchValue={searchValue}
                disabled={props.disabled}
              />
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface VirtualizedListProp<T> {
  options: T[];
  labelAccessor: (item: T) => string;
  valueAccessor: (item: T) => Value;
  values: Value[];
  searchValue: string;
  disabled?: boolean;
  onItemSelect: (index: number) => void;
}

/**
 * we need to wrap the inner content as its own component for virtual to work
 */
function VirtualizedList<T>({
  options: filteredOptions,
  labelAccessor,
  valueAccessor,
  values,
  searchValue,
  disabled,
  onItemSelect,
}: VirtualizedListProp<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virt = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
  });
  const itemId = (item: T) => `${valueAccessor(item)}-${labelAccessor(item)}`;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // @ts-ignore
    parentRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchValue]);

  return (
    <div
      ref={parentRef}
      className="max-h-96 overflow-auto"
      onWheel={(e) => {
        // dialog/popover strips scrolling events so needs this if this component is used in a dialog
        e.stopPropagation();
      }}
    >
      <div
        style={{
          height: `${virt.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virt.getVirtualItems().map((item) => {
          const isActive = values.some(
            (e) => e === valueAccessor(filteredOptions[item.index]),
          );
          return (
            <CommandItem
              className="absolute top-0 left-0 w-full"
              key={item.key}
              style={{
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
              }}
              value={itemId(filteredOptions[item.index])}
              onSelect={() => {
                onItemSelect(item.index);
              }}
              disabled={disabled}
            >
              <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {labelAccessor(filteredOptions[item.index])}
              </div>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
          );
        })}
      </div>
    </div>
  );
}

function AmountLabel<T>({
  values,
  placeholder,
  options,
  labelAccessor,
  selectedPlaceholder,
  truncateAmount = 3,
  badge,
  valueAccessor,
}: {
  placeholder?: string;
  values: Value[];
  options: T[];
  labelAccessor: (item: T) => string;
  selectedPlaceholder?: (amount: number) => string;
  truncateAmount?: number;
  badge: boolean;
  valueAccessor: (item: T) => Value;
}) {
  const filteredOptions = options.filter((e) =>
    values.includes(valueAccessor(e)),
  );
  const { length } = filteredOptions;
  if (length === 0)
    return (
      <span className="whitespace-nowrap text-muted-foreground">
        {placeholder ?? "Select items"}
      </span>
    );

  if (length === 1) {
    const text = labelAccessor(filteredOptions[0]);
    return badge ? (
      <Badge className="whitespace-nowrap">{text}</Badge>
    ) : (
      <span className="whitespace-nowrap">{text}</span>
    );
  }
  if (length < truncateAmount) {
    return badge ? (
      <div className="flex gap-2">
        {filteredOptions.map((e) => (
          <Badge key={valueAccessor(e)}>{labelAccessor(e)}</Badge>
        ))}
      </div>
    ) : (
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {filteredOptions.map((e) => labelAccessor(e)).join(", ")}
      </span>
    );
  }
  if (selectedPlaceholder)
    return (
      <span className="whitespace-nowrap">{selectedPlaceholder(length)}</span>
    );
  return <span>{`${length} items selected`}</span>;
}

interface LoadingDisplayProp extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  dataLength: number;
  emptyLabel?: string;
}
const LoadingDisplay = ({
  dataLength,
  isLoading,
  emptyLabel,
  className,
  ...props
}: LoadingDisplayProp) => {
  const st = cva(
    "flex gap-2 justify-center text-muted-foreground items-center p-2",
  );

  if (isLoading)
    return (
      <div {...props} className={st({ className })}>
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  if (!isLoading && dataLength <= 0)
    return (
      <div {...props} className={st({ className })}>
        {emptyLabel}
      </div>
    );

  return null;
};
