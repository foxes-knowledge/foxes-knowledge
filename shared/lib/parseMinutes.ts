/**
 *  Parse number of minutes into hours and/or minutes
 *  @param {number} minutes The number of minutes to parse
 *  @returns {string} The parsed minutes
 *  @example
 *  parseMinutes(5) // '5 minutes'
 *  parseMinutes(65) // '1 hour(s) and 5 minutes'
 *  parseMinutes(120) // '2 hour(s)'
 */
export const parseMinutes = (min: number): string => {
    const hrs = min / 60
    const rhrs = Math.floor(hrs)
    const mins = Math.round((hrs - rhrs) * 60)
    let result = ''

    if (rhrs > 0) {
        result = result.concat(`${rhrs} hour(s)`)
    }

    if (rhrs > 0 && mins > 0) {
        result = result.concat(` and ${mins} minute(s)`)
    } else if (mins > 0) {
        result = result.concat(`${mins} minute(s)`)
    }

    return result
}
