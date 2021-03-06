/* eslint-disable func-names */
import { takeLatest, put, call } from 'redux-saga/effects'
import { getCommentsByThreadId } from '../../api'

import { LOAD_COMMENTS_ASYNC } from '../../actions/sagaActionTypes'
import {
  LOAD_COMMENTS_DATA,
  ERROR_LOAD_COMMENTS_DATA,
} from '../../actions/reduxActionTypes'

// Worker (handler) saga
function* getCommentsAsync({ payload }) {
  try {
    const { threadId } = payload

    const response = yield call(getCommentsByThreadId, threadId)

    console.log('rsp ', response)
    yield put({
      type: LOAD_COMMENTS_DATA,
      payload: { response },
    })
  } catch (e) {
    yield put({
      type: ERROR_LOAD_COMMENTS_DATA,
      payload: { error: e.message },
    })
  }
}

// Watcher saga
export default function* () {
  yield takeLatest(LOAD_COMMENTS_ASYNC, getCommentsAsync)
}
