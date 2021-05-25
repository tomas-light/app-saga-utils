# Installation

```bush
npm install app-saga-utils
```

# How to use

```ts
// User.watcher.ts
import { WatcherBase } from 'app-saga-utils';

import { UserActions } from '../redux';
import { UserSaga } from './User.saga';

export class UserWatcher extends WatcherBase<UserSaga> {
  constructor() {
    super(UserSaga);

    this.watchLatest(
      UserActions.SET_USER,
      'setUser'
    );
  }
}

// or

export const userWatcher = sagaWatcher(UserSaga);
watcher.watchLatest(UserActions.SET_USER, 'setUser');
```

```ts
// RootSagaBase.ts
import { RootSagaBase } from 'app-saga-utils';

import { UserWatcher } from './User.watcher';

export class RootSaga extends RootSagaBase {
  constructor() {
    super();

    this.addWatchers([
      new UserWatcher(),
    ]);
  }
}
```

and register your saga like usually `new RootSagaBase().run(sagaMiddleware);`
