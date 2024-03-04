

declare module globalThis {
  // var $: import('./jquery')
  // var $: <T>() => JQuery
  var $: <T>( ...args:string[]| HTMLElement[]) => JQuery<T>
}
