import type { PaginationState } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import Fuse, { type FuseOptionKey } from "fuse.js";
import { twMerge } from "tailwind-merge";
import { ulid } from "ulid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeNewline(data?: string) {
  if (!data) return "";
  return data.replaceAll("\\n", "\n");
}

export const DEFAULT_PAGINATION: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

export function search<T>(
  data: T[],
  keys: FuseOptionKey<T>[],
  query: string | undefined,
) {
  const fz = new Fuse(data, {
    keys,
    threshold: 0.4,
  });

  if (query?.length) return fz.search(query).map((e) => e.item);
  return data;
}

export function* range(start: number, end: number, step = 1) {
  while (start <= end) {
    yield start;
    // eslint-disable-next-line no-param-reassign
    // biome-ignore lint/style/noParameterAssign: yield fn
    start += step;
  }
}

export function* chunks<T>(arr: T[], chunkSize: number) {
  for (let i = 0; i < arr.length; i += chunkSize) {
    yield arr.slice(i, i + chunkSize);
  }
}

/**
 * This function removes trailing zeroes if it's a whole number (eg. 18.00)
 * Otherwise a float percent with n decimals is returned
 * @param fixed - amount of decimals, defaults to 2
 * undefined number will return '0 %'
 */
export function asPercentage(data: number | undefined, fixed?: number): string {
  if (!data) return "0 %";
  return `${Number(`${(data * 100).toFixed(fixed ?? 2)}`)} %`;
}

/**
 * this function rotates your array and shift the elements around
 * @param by - number of rotations, positive number is clockwise (left shift),
 * negative number is ccw (right shift)
 * @param data - any abitrary array, if the array is empty then it's directly
 * returned
 * @returns rotated array
 */
export function rotate<T>(by: number, data: T[]): T[] {
  if (data.length === 0) return data;
  if (by === 0) return data;
  if (by < 0) {
    const temp = data;
    for (let index = 0; index < by * -1; index++) {
      const t = temp.shift();
      if (t) temp.push(t);
    }
    return temp;
  }

  const temp = data;
  for (let index = 0; index < by; index++) {
    const t = temp.pop();
    if (t) temp.unshift(t);
  }
  return temp;
}

export function isEmpty(value: unknown[] | string) {
  return value.length === 0;
}

export function generateUlid() {
  return ulid();
}
