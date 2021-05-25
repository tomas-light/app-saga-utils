import { SagaMiddleware } from 'redux-saga';

import { Watcher, WatchFunction } from './types';

export abstract class RootSagaBase {
  protected watchFunctions: WatchFunction[];

  protected addWatchers(baseWatchers: Watcher[]) {
    baseWatchers.forEach((watcher) => this.addWatcher(watcher));
  }

  protected addWatcher(baseWatcher: Watcher) {
    this.watchFunctions.push(...baseWatcher.watchFunctions);
  }

  constructor() {
    this.watchFunctions = [];
  }

  run(sagaMiddleware: SagaMiddleware) {
    this.watchFunctions.forEach(saga => sagaMiddleware.run(saga));
  }
}
