import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { dispatchType, threadType, commentsType, matchType } from '../types'
import Comments from './Comments'
import {
  LOAD_COMMENTS_ASYNC,
  LOAD_MORE_COMMENTS_ASYNC,
} from '../actions/sagaActionTypes'
import ThreadCard from '../components/ThreadCard'

const Thread = (props) => {
  const {
    dispatch,
    thread,
    comments,
    match: {
      params: { id },
    },
  } = props

  useEffect(() => {
    dispatch({
      type: LOAD_COMMENTS_ASYNC,
      payload: {
        threadId: id,
      },
    })
  }, [])

  const handleLoadMoreComments = () => {
    dispatch({
      type: LOAD_MORE_COMMENTS_ASYNC,
      payload: {
        id,
        moreChildren: comments.moreChildren,
        suggestedSort: thread.suggestedSort,
      },
    })
  }

  return (
    <Container fluid className="my-2">
      {!R.isEmpty(thread) ? (
        <>
          <ThreadCard key={id} data={thread} fullDescription />

          <Comments data={comments.children} />
          {comments.moreChildren.length > 0 ? (
            <Button onClick={handleLoadMoreComments}>Load more comments</Button>
          ) : (
            <div>
              <hr className="my-4" />
              You&apos;ve reached the end of the thread. That&apos;s all :)
            </div>
          )}
        </>
      ) : null}
    </Container>
  )
}

Thread.propTypes = {
  dispatch: dispatchType.isRequired,
  thread: threadType.isRequired,
  comments: commentsType.isRequired,
  match: matchType.isRequired,
}

const mapStateToProps = (state) => ({
  thread: state.comments.thread,
  comments: state.comments.comments,
})

export default connect(mapStateToProps)(Thread)
