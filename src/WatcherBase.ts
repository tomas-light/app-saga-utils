import {
  Constructor,
  DependencyResolver,
  InternalWatcher,
  Watcher, WatchFunction,
} from './types';
import { sagaWatcher } from './sagaWatcher';

export abstract class WatcherBase<TSaga> implements Watcher {
  private readonly watcher: InternalWatcher<TSaga>;

  protected constructor(
    private readonly sagaInstanceType: Constructor<TSaga>,
    container?: DependencyResolver
  ) {
    this.watcher = sagaWatcher(sagaInstanceType, container);
    this.watchFunctions = this.watcher.watchFunctions;
  }

  watchFunctions: WatchFunction[];

  protected get watchLatest() {
    return this.watcher.watchLatest;
  }

  protected get watchEvery() {
    return this.watcher.watchEvery;
  }

  protected get watchThrottle() {
    return this.watcher.watchThrottle;
  }
}

