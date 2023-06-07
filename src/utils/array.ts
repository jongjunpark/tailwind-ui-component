export function range(length: number): number[];
export function range(start: number, stop: number): number[];
export function range(start: number, stop: number, step: number): number[];

export function range(...args: number[]): number[] {
  if (args.length === 1) {
    const [length] = args;
    return Array.from({ length }, (_, i) => i);
  }
  if (args.length === 2) {
    const [start, stop] = args;
    return Array.from({ length: stop - start }, (_, i) => i + start);
  }
  if (args.length === 3) {
    const [start, stop, step] = args;
    return Array.from(
      { length: (stop - start) / step },
      (_, i) => i * step + start,
    );
  }
  throw new Error('Invalid arguments');
}
