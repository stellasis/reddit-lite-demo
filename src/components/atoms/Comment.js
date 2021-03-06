import React from 'react'
import PropTypes from 'prop-types'

const Comment = ({ numComments }) => (
  <>
    {numComments === null ? null : (
      <div className="font-weight-bold">
        {numComments
          ? `${numComments} ${numComments > 1 ? 'comments' : 'comment'}`
          : '0 comments'}
      </div>
    )}
  </>
)

Comment.propTypes = {
  numComments: PropTypes.number.isRequired,
}

export default Comment
