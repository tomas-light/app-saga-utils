import { TakeEffect, ForkEffect, PutEffect } from "@redux-saga/core/effects";

export type WatchFunction = () => IterableIterator<ForkEffect | TakeEffect | PutEffect>;
