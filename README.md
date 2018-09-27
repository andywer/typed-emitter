# Typed-Emitter

[![NPM Version](https://img.shields.io/npm/v/typed-emitter.svg)](https://www.npmjs.com/package/typed-emitter)

Strictly typed event emitter interface for **TypeScript 3**.

Code size: Zero bytes - Just the typings, no implementation. Use the default event emitter of the `events` module in node.js or bring your favorite implementation when writing code for the browser.


## Installation

```sh
$ npm install typed-emitter

# Using yarn:
$ yarn add typed-emitter
```


## Usage

```ts
import EventEmitter from "events"
import TypedEmitter from "typed-emitter"

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
interface MessageEvents {
  error: (error: Error) => void,
  message: (body: string, from: string) => void
}

const messageEmitter = new EventEmitter() as TypedEmitter<MessageEvents>

// Good 👍
messageEmitter.emit("message", "Hi there!", "no-reply@test.com")

// TypeScript will catch those mistakes ✋
messageEmitter.emit("mail", "Hi there!", "no-reply@test.com")
messageEmitter.emit("message", "Hi there!", true)

// Good 👍
messageEmitter.on("error", (error: Error) => { /* ... */ })

// TypeScript will catch those mistakes ✋
messageEmitter.on("error", (error: string) => { /* ... */ })
messageEmitter.on("failure", (error: Error) => { /* ... */ })
```

## Why another package?

The interface that comes with `@types/node` is not type-safe at all. It does not even offer a way of specifying the events that the emitter will emit...

The `eventemitter3` package is a popular event emitter implementation that comes with TypeScript types out of the box. Unfortunately there is no way to declare the event arguments that the listeners have to expect.

There were a few other examples of type-safe event emitter interfaces out there as well. They were either not published to npm, had an inconsistent interface or other limitations.


## License

MIT
