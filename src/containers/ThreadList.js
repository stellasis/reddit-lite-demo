import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { dispatchType, threadType } from '../types'
import { UPVOTE_THREAD, DOWNVOTE_THREAD } from '../actions/reduxActionTypes'
import ThreadCard from '../components/ThreadCard'

const ThreadList = (props) => {
  const { dispatch, data, cbLoadMoreThreads } = props

  const handleUpvote = useCallback(
    (evt) =>
      dispatch({
        type: UPVOTE_THREAD,
        payload: {
          id: evt.target.name,
        },
      }),
    []
  )

  const handleDownvote = useCallback(
    (evt) =>
      dispatch({
        type: DOWNVOTE_THREAD,
        payload: {
          id: evt.target.name,
        },
      }),
    []
  )

  return (
    <>
      {data.map((item) => {
        const id = Object.keys(item)[0]

        return (
          <ThreadCard
            key={id}
            data={item[id]}
            cbUpvote={handleUpvote}
            cbDownvote={handleDownvote}
          />
        )
      })}

      <Button onClick={cbLoadMoreThreads}>Load more threads</Button>
    </>
  )
}

ThreadList.propTypes = {
  dispatch: dispatchType.isRequired,
  data: PropTypes.arrayOf(threadType).isRequired,
  cbLoadMoreThreads: PropTypes.func.isRequired,
}

export default connect(null)(ThreadList)
