import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Filter = ({ text, activeStatus, cbSelectFilter }) => (
  <Button
    variant="outline-secondary"
    name={text}
    type="button"
    onClick={cbSelectFilter}
    className={`${activeStatus} mr-2`}
  >
    {text}
  </Button>
)

Filter.propTypes = {
  text: PropTypes.string.isRequired,
  activeStatus: PropTypes.string.isRequired,
  cbSelectFilter: PropTypes.func.isRequired,
}

export default Filter
