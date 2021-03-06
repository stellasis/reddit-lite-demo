/* eslint-disable func-names */
/* eslint-disable camelcase */
import { takeLatest, put, call } from 'redux-saga/effects'
import { getThreads } from '../../api'

// Actions
import { LOAD_MORE_THREADS_DATA_ASYNC } from '../../actions/sagaActionTypes'
import {
  LOAD_MORE_THREADS_DATA,
  ERROR_LOAD_THREADS_DATA,
} from '../../actions/reduxActionTypes'

// Worker (handler) saga
function* getMoreThreadsAsync({ payload }) {
  try {
    const response = yield call(getThreads, payload.after, payload.filter)

    yield put({
      type: LOAD_MORE_THREADS_DATA,
      payload: {
        response,
        filter: payload.filter,
      },
    })
  } catch (e) {
    yield put({
      type: ERROR_LOAD_THREADS_DATA,
      payload: { error: e.message },
    })
  }
}

// Watcher saga
export default function* () {
  yield takeLatest(LOAD_MORE_THREADS_DATA_ASYNC, getMoreThreadsAsync)
}
