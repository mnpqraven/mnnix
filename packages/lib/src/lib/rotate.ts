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
