/* eslint-disable camelcase */
import {
  LOAD_COMMENTS_DATA,
  ERROR_LOAD_COMMENTS_DATA,
  LOAD_MORE_COMMENTS_DATA,
} from '../actions/reduxActionTypes'

// TODO: Create a proper schema
const initialState = {
  thread: {},
  comments: {
    children: [], // Array of comment objects
    moreChildren: [], // Array of comment id
  },
  error: '',
}

const transformThread = (data) => {
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
  } = data

  return {
    id,
    title,
    ups,
    selftextHtml: selftext_html,
    author,
    numComments: num_comments,
    createdUtc: created_utc,
    url,
    mediaEmbedContent: media_embed.content,
    suggestedSort: suggested_sort || 'confidence',
  }
}

// Normalize the comments data so it's fast to access O(1) and easier to iterate
const transformChildren = (data) =>
  data.map((el) => {
    const { id, author, body_html, ups, created_utc } = el.data

    return {
      [`${id}`]: {
        id,
        author,
        bodyHtml: body_html,
        ups,
        createdUtc: created_utc,
      },
    }
  })

const comments = (state = initialState, { type, payload }) => {
  const children = []
  let moreChildren = []

  switch (type) {
    case LOAD_COMMENTS_DATA:
      // TODO: Move this to a separate function
      payload.response[1].data.children.forEach((item) => {
        // Will be loaded first
        if (item.kind === 't1') {
          children.push(item)
        }

        // Will be loaded later when user interacts with load more button
        if (item.kind === 'more') {
          moreChildren = item.data.children
        }
      })

      return {
        ...state,
        thread: transformThread(payload.response[0].data.children[0].data),
        comments: {
          children: transformChildren(children),
          moreChildren,
        },
      }

    case LOAD_MORE_COMMENTS_DATA:
      // TODO: Move this to a separate function
      payload.response.json.data.things.forEach((item) => {
        if (item.kind === 't1') {
          children.push(item)
        }

        if (item.kind === 'more' && item.data.depth === 0) {
          moreChildren = item.data.children
        }
      })

      return {
        ...state,
        comments: {
          children: state.comments.children.concat(transformChildren(children)),
          moreChildren,
        },
      }
    case ERROR_LOAD_COMMENTS_DATA:
      return {
        ...state,
        data: {},
        error: payload.error,
      }
    default:
      return state
  }
}

export default comments
