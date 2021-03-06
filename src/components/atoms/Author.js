import React from 'react'
import PropTypes from 'prop-types'

const Author = ({ text }) => <span>{`u/${text}`}</span>

Author.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Author
