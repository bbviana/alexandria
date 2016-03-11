/**
 * <div style={styles(s, this.props)}>...</div>
 *
 * const s = {
 *      border: 'none',
 *
 *      focused: {
 *          border: '1px solid'
 *      }
 * }
 *
 * props = {focused: true}
 *
 */
export default function(styles, conditions) {
    const result = {}

    Object.keys(styles).forEach(key => {
        const value = styles[key]
        if(value instanceof Object){
            if(conditions[key]){
                Object.assign(result, value)
            }
        } else {
            result[key] = value
        }
    })

    return result
}