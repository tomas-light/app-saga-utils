import { SagaMiddleware } from "redux-saga";

import { WatchFunction } from "./WatchFunction";
import { IWatcher } from "./IWatcher";

export abstract class RootSagaBase {
    protected watchFunctions: WatchFunction[];

    protected addWatchers(baseWatchers: IWatcher[]) {
        baseWatchers.forEach((watcher) => this.addWatcher(watcher));
    }

    protected addWatcher(baseWatcher: IWatcher) {
        this.watchFunctions.push(...baseWatcher.watchFunctions);
    }

    constructor() {
        this.watchFunctions = [];
    }

    run(sagaMiddleware: SagaMiddleware) {
        this.watchFunctions.forEach(saga => sagaMiddleware.run(saga));
    }
}
