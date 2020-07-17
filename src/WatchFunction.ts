import { SimpleEffect } from "@redux-saga/core/effects";

export type WatchFunction = () => IterableIterator<SimpleEffect<any>>;
