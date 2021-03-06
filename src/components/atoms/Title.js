import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { THREAD_PATH } from '../../constants'

const Title = ({ title, id }) => (
  <Button
    variant="link"
    href={`${THREAD_PATH}/${id}`}
    className="px-0 text-left"
  >
    {title}
  </Button>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Title
