/* eslint-disable import/prefer-default-export */

export const timeDiffInHoursFromNow = (past) => {
  const SECONDS_IN_HOUR = 60 * 60
  return Math.floor((Date.now() / 1000 - past) / SECONDS_IN_HOUR)
}
