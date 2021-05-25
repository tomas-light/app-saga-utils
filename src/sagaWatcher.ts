import { all, put, takeEvery, takeLatest, throttle } from '@redux-saga/core/effects';
import { Action } from 'app-redux-utils';
import {
  Constructor,
  DependencyResolver,
  WatchFunction,
  Saga, InternalWatcher,
} from './types';

function sagaWatcher<TSaga>(
  sagaInstanceType: Constructor<TSaga>,
  container?: DependencyResolver
): InternalWatcher<TSaga> {

  if (!container) {
    container = {
      resolve: sagaConstructor => new sagaConstructor(),
    };
  }

  const watchFunctions: WatchFunction[] = [];

  const getSagaWithCallbackAction = (sagaName: keyof TSaga) => {
    return function* (action: Action) {
      const saga = container!.resolve(sagaInstanceType) as Saga<TSaga>;
      if (typeof saga[sagaName] === 'function') {
        yield saga[sagaName](action);
      }

      if (!action.stopPropagation) {
        const actions = action.getActions();
        const putActionEffects = actions.map(callbackAction => put(callbackAction()));
        yield all(putActionEffects);
      }
    };
  }

  const watchLatest = (actionType: string, sagaName: keyof TSaga) => {
    const sagaWithCallbackAction = getSagaWithCallbackAction(sagaName);
    watchFunctions.push(
      function* () {
        yield takeLatest(actionType, sagaWithCallbackAction);
      }
    );
  }

  const watchEvery = (actionType: string, sagaName: keyof TSaga) => {
    const sagaWithCallbackAction = getSagaWithCallbackAction(sagaName);
    watchFunctions.push(
      function* () {
        yield takeEvery(actionType, sagaWithCallbackAction);
      }
    );
  }

  const watchThrottle = (
    actionType: string,
    sagaName: keyof TSaga,
    throttleInMilliseconds: number = 1000
  ) => {
    const sagaWithCallbackAction = getSagaWithCallbackAction(sagaName);
    watchFunctions.push(
      function* () {
        yield throttle(throttleInMilliseconds, actionType, sagaWithCallbackAction);
      }
    );
  }

  return {
    watchFunctions,
    watchLatest,
    watchEvery,
    watchThrottle,
  };
}

export { sagaWatcher };
