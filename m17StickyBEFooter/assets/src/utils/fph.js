const _pipe = (f, g) => (...args) => g(f(...args))

export const add = (a, b) => a + b
export const subtract = (a, b) => a - b
export const pipe = (...fns) => fns.reduce(_pipe)
export const partial = (fn, firstArg) => {  return (...lastArgs) => {    return fn(firstArg, ...lastArgs);  }}
