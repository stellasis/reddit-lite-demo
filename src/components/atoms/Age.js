import React from 'react'
import PropTypes from 'prop-types'
import { timeDiffInHoursFromNow } from '../../utils'

const Age = ({ utc }) => (
  <span>{`${timeDiffInHoursFromNow(utc)} hours ago`}</span>
)

Age.propTypes = {
  utc: PropTypes.number.isRequired,
}

export default Age
