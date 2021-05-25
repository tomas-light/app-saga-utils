import { SimpleEffect } from '@redux-saga/core/effects';
import { Action } from 'app-redux-utils';

type AbstractConstructor<T = any> = abstract new(...args: any[]) => T;
type Constructor<T = any> = new(...args: any[]) => T;

interface DependencyResolver {
  resolve: <TInstance>(type: Constructor<TInstance> | AbstractConstructor<TInstance>, ...args: any[]) => TInstance;
}

type WatchFunction = () => IterableIterator<SimpleEffect<any>>;

interface Watcher {
  watchFunctions: WatchFunction[];
}

interface InternalWatcher<TSaga> extends Watcher {
  watchLatest: (actionType: string, sagaName: keyof TSaga) => void;
  watchEvery: (actionType: string, sagaName: keyof TSaga) => void;
  watchThrottle: (actionType: string, sagaName: keyof TSaga, throttleInMilliseconds?: number) => void;
}

type SagaFunction = (action: Action) => Generator<any, any, any>;
type Saga<T> = T & {
  [key: string]: SagaFunction;
};

export type {
  Constructor,
  DependencyResolver,
  InternalWatcher,
  Saga,
  SagaFunction,
  Watcher,
  WatchFunction,
};
