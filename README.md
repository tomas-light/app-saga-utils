# Installation
```bush
npm install app-saga-utils
```

# How to use

```ts
// User.watcher.ts
import { Watcher } from "app-saga-utils";

import { UserActions } from "../redux";
import { UserSaga } from "./User.saga";

export class UserWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            UserActions.SET_USER,
            UserSaga.setUser
        );
    }
}
```

```ts
// RootSagaBase.ts
import { RootSaga } from "app-saga-utils";

import { UserWatcher } from "./User.watcher";

export class RootSagaBase extends RootSaga {
    constructor() {
        super();

        this.addWatchers([
            new UserWatcher(),
        ]);
    }
}
```

and  register your saga like usually `new RootSagaBase().run(sagaMiddleware);`
