export const getVisitorName = (n: string | number) => {
  if (typeof n === "undefined") return "";
  const str = n.toString()?.slice(-4);
  return str.split("").reverse().join("");
};

export function customDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  context?: any // Add an optional context parameter
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args); // Use the provided context
    }, delay);
  };
}
