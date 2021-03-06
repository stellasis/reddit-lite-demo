/* eslint-disable func-names */
import { all } from 'redux-saga/effects'
import watchLoadThreadsData from './api/watchLoadThreadsData'
import watchLoadMoreThreadsData from './api/watchLoadMoreThreadsData'
import watchLoadComments from './api/watchLoadComments'
import watchLoadMoreComments from './api/watchLoadMoreComments'

export default function* () {
  yield all([
    watchLoadThreadsData(),
    watchLoadMoreThreadsData(),
    watchLoadComments(),
    watchLoadMoreComments(),
  ])
}
