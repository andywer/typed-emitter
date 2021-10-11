export type Arguments<T> = [T] extends [(...args: infer U) => any]
	? U
	: [T] extends [void]
	? []
	: [T];

export type EventFunction = (...args: any[]) => void;
export type EmitterEvents = EmitterEvent<string, EventFunction>;
export type EmitterEvent<Name extends string, Func extends EventFunction> = {
	name: Name;
	args: Arguments<Func>;
};

/**
 * Type-safe event emitter.
 *
 * Use it like this:
 *
 * type DynamicEvents =
 * | EmitterEvent<'ping', () => void>
 * | EmitterEvent<'message', (from: string, content: string) => void>
 * | EmmiterEvents<'error': (error: Error) => void>
 * | EmitterEvent<`foo:${string}`, (size: number, strict: boolean) => void>
 * | EmitterEvent<`bar:${string}`, (force: boolean) => void>;
 *
 * const myEmitter = new EventEmitter() as TypedEmitter<DynamicEvents>
 *
 * myEmitter.on("message", (from, content) => {
 *   // ...
 * })
 *
 * myEmitter.emit("error", "x")  // <- Will catch this type error
 *
 * myEmitter.emit("foo:1", 2, false) // dynamic/variable event names work
 * myEmitter.emit(`foo:${'456'}`, 2, false)
 *
 */
export interface TypedEventEmitter<Events extends EmitterEvents> {
	addListener<E extends keyof Events>(event: E, listener: Events[E]): this;
	on<E extends keyof Events>(event: E, listener: Events[E]): this;
	once<E extends keyof Events>(event: E, listener: Events[E]): this;
	prependListener<E extends keyof Events>(event: E, listener: Events[E]): this;
	prependOnceListener<E extends keyof Events>(event: E, listener: Events[E]): this;

	off<E extends keyof Events>(event: E, listener: Events[E]): this;
	removeAllListeners<E extends keyof Events>(event?: E): this;
	removeListener<E extends keyof Events>(event: E, listener: Events[E]): this;

	emit<E extends Events>(name: E['name'], ...args: E['args']): boolean;
	eventNames(): (keyof Events | string | symbol)[];
	rawListeners<E extends keyof Events>(event: E): Function[];
	listeners<E extends keyof Events>(event: E): Function[];
	listenerCount<E extends keyof Events>(event: E): number;

	getMaxListeners(): number;
	setMaxListeners(maxListeners: number): this;
}

export default TypedEventEmitter;
