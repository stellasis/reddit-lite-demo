/* eslint-disable func-names */
/* eslint-disable camelcase */
import { takeLatest, put, call } from 'redux-saga/effects'
import { getCommentsByThreadId } from '../../api'

// Actions
import { LOAD_MORE_COMMENTS_ASYNC } from '../../actions/sagaActionTypes'
import {
  LOAD_MORE_COMMENTS_DATA,
  ERROR_LOAD_COMMENTS_DATA,
} from '../../actions/reduxActionTypes'

// Worker (handler) saga
function* getMoreCommentsAsync({ payload }) {
  try {
    const threadId = payload.id
    const { moreChildren, suggestedSort } = payload

    const response = yield call(
      getCommentsByThreadId,
      threadId,
      moreChildren,
      suggestedSort
    )

    yield put({
      type: LOAD_MORE_COMMENTS_DATA,
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
  yield takeLatest(LOAD_MORE_COMMENTS_ASYNC, getMoreCommentsAsync)
}
