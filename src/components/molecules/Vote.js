import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Vote = ({ id, ups, cbUpvote, cbDownvote }) => (
  <div className="d-flex flex-column align-items-center">
    <Button
      variant="link"
      name={id}
      type="button"
      onClick={cbUpvote}
      disabled={!cbUpvote}
    >
      ∆
    </Button>

    <div className="h5">{ups}</div>

    <Button
      variant="link"
      name={id}
      type="button"
      onClick={cbDownvote}
      disabled={!cbDownvote}
    >
      ∇
    </Button>
  </div>
)

Vote.propTypes = {
  id: PropTypes.string.isRequired,
  ups: PropTypes.number.isRequired,
  cbUpvote: PropTypes.func,
  cbDownvote: PropTypes.func,
}

Vote.defaultProps = {
  cbUpvote: null,
  cbDownvote: null,
}

export default memo(Vote)
