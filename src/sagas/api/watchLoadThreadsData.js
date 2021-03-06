/* eslint-disable func-names */
/* eslint-disable camelcase */
import { takeLatest, put, call } from 'redux-saga/effects'
import { getThreads } from '../../api'

// Actions
import { LOAD_THREADS_DATA_ASYNC } from '../../actions/sagaActionTypes'
import {
  LOAD_THREADS_DATA,
  ERROR_LOAD_THREADS_DATA,
} from '../../actions/reduxActionTypes'

// Worker (handler) saga
function* getThreadsAsync({ payload }) {
  try {
    // Logic to fetch thread list from Reddit public API
    let after = ''
    let filter = ''

    if (payload.after) after = payload.after
    if (payload.filter) filter = payload.filter

    const response = yield call(getThreads, after, filter)

    console.log('rsp thread ', response)

    yield put({
      type: LOAD_THREADS_DATA,
      payload: {
        response,
        filter,
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
  yield takeLatest(LOAD_THREADS_DATA_ASYNC, getThreadsAsync)
}
