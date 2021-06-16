export function debounce<T extends Function>(func: T, wait: number): T {
  let timeoutID: number;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    const context = this;

    timeoutID = window.setTimeout(function () {
      func.apply(context, args);
    }, wait);
  } as any;
}
