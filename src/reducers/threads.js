/* eslint-disable camelcase */
import * as R from 'ramda'
import {
  LOAD_THREADS_DATA,
  LOAD_MORE_THREADS_DATA,
  ERROR_LOAD_THREADS_DATA,
  FILTER_THREADS,
  UPVOTE_THREAD,
  DOWNVOTE_THREAD,
} from '../actions/reduxActionTypes'

// TODO: Create a proper schema
const initialState = {
  data: {},
  filter: '',
  error: '',
}

const transformThread = (data) =>
  data.map((v) => {
    const {
      id,
      title,
      ups,
      selftext_html,
      author,
      num_comments,
      created_utc,
      url,
      media_embed,
      suggested_sort,
    } = v.data

    return {
      [`${id}`]: {
        id,
        title,
        ups,
        selftextHtml: selftext_html,
        author,
        numComments: num_comments,
        createdUtc: created_utc,
        url,
        mediaEmbedContent: media_embed.content,
        suggestedSort: suggested_sort,
      },
    }
  })

const getNextStateForUpvote = (state, id, operation) => {
  const threadIndex = state.data.children.findIndex((thread) => thread[id])
  const upvoteRef = R.lensPath(['data', 'children', threadIndex, id, 'ups'])
  const upvote = R.view(upvoteRef, state)

  return R.set(
    upvoteRef,
    operation === 'increment' ? upvote + 1 : upvote - 1,
    state
  )
}

const threads = (state = initialState, { type, payload }) => {
  let after
  let before
  let dist
  let children

  switch (type) {
    case LOAD_THREADS_DATA:
      after = payload.response.data.after
      before = payload.response.data.before
      dist = payload.response.data.dist
      children = payload.response.data.children

      return {
        ...state,
        data: {
          totalCount: dist,
          after,
          before,
          children: transformThread(children),
        },
        filter: payload.filter,
        error: '',
      }
    case LOAD_MORE_THREADS_DATA: {
      after = payload.response.data.after
      before = payload.response.data.before
      dist = payload.response.data.dist
      children = payload.response.data.children

      const totalCount = state.data.totalCount + dist

      return {
        ...state,
        data: {
          totalCount,
          after,
          before,
          children: state.data.children.concat(transformThread(children)),
        },
        filter: payload.filter,
        error: '',
      }
    }
    case ERROR_LOAD_THREADS_DATA:
      return {
        ...state,
        data: {},
        error: payload.error,
      }

    case FILTER_THREADS:
      return {
        ...state,
        filter: payload.filter,
      }

    case UPVOTE_THREAD:
      return getNextStateForUpvote(state, payload.id, 'increment')

    case DOWNVOTE_THREAD:
      return getNextStateForUpvote(state, payload.id, 'decrement')

    default:
      return state
  }
}

export default threads
