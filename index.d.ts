export type EventMap = {
  [key: string]: (...args: any[]) => void
}

type KeyOf<T> = keyof T | `${Extract<keyof T,number>}` | (Extract<keyof T,`${number}`> extends never ? never : number);

/**
 * Type-safe event emitter.
 *
 * Use it like this:
 *
 * ```typescript
 * type MyEvents = {
 *   error: (error: Error) => void;
 *   message: (from: string, content: string) => void;
 * }
 *
 * const myEmitter = new EventEmitter() as TypedEmitter<MyEvents>;
 *
 * myEmitter.emit("error", "x")  // <- Will catch this type error;
 * ```
 */
interface TypedEventEmitter<Events extends EventMap> {
  addListener<E extends KeyOf<Events>> (event: E, listener: Events[E]): this
  on<E extends KeyOf<Events>> (event: E, listener: Events[E]): this
  once<E extends KeyOf<Events>> (event: E, listener: Events[E]): this
  prependListener<E extends KeyOf<Events>> (event: E, listener: Events[E]): this
  prependOnceListener<E extends KeyOf<Events>> (event: E, listener: Events[E]): this

  off<E extends KeyOf<Events>>(event: E, listener: Events[E]): this
  removeAllListeners<E extends KeyOf<Events>> (event?: E): this
  removeListener<E extends KeyOf<Events>> (event: E, listener: Events[E]): this

  emit<E extends KeyOf<Events>> (event: E, ...args: Parameters<Events[E]>): boolean
  // The sloppy `eventNames()` return type is to mitigate type incompatibilities - see #5
  eventNames (): (KeyOf<Events> | string | symbol)[]
  rawListeners<E extends KeyOf<Events>> (event: E): Events[E][]
  listeners<E extends KeyOf<Events>> (event: E): Events[E][]
  listenerCount<E extends KeyOf<Events>> (event: E): number

  getMaxListeners (): number
  setMaxListeners (maxListeners: number): this
}

export default TypedEventEmitter
