import React from 'react'
import PropTypes from 'prop-types'
import Filter from '../atoms/Filter'
import { filtersType } from '../../types'

const Filters = ({ filters, cbSelectFilter }) =>
  filters.map((el) => {
    const filter = Object.keys(el)[0]

    return (
      <Filter
        key={filter}
        text={filter}
        activeStatus={el[filter]}
        cbSelectFilter={cbSelectFilter}
      />
    )
  })

Filters.propTypes = {
  filters: PropTypes.arrayOf(filtersType).isRequired,
  cbSelectFilter: PropTypes.func.isRequired,
}

export default Filters
