import { cn } from "@repo/lib";
import type { Column } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../primitive";

interface OptionItem {
  label: string;
  value: string;
  icon?: LucideIcon;
}
interface Prop<TData> extends ComponentPropsWithoutRef<typeof Button> {
  placeholder: string;
  buttonPlaceholder?: string;
  options: OptionItem[];
  column: Column<TData> | undefined;
}

export function DataTableMultiSelect<TData>({
  column,
  options,
  placeholder,
  buttonPlaceholder,
  ...props
}: Prop<TData>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const facets = column?.getFacetedUniqueValues();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...props}>{buttonPlaceholder}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput className="border-none" placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) selectedValues.delete(option.value);
                      else selectedValues.add(option.value);

                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon ? (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    ) : null}
                    <span>{option.label}</span>
                    {facets?.get(option.value) ? (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    ) : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => column?.setFilterValue(undefined)}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
