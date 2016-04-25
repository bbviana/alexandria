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
 * TODO permitir passar um array de styles e conditions ser opcional
 * styles([s1, s2]) fica equivalente ao m
 *
 */
export default function (styles, conditions) {
    const result = {}

    const simpleValuesFirst = (key1, key2)=> {
        const value = styles[key1]
        return (value instanceof Object) ? 1 : -1;
    }

    Object
        .keys(styles)
        .sort(simpleValuesFirst)
        .forEach(key => {
            const value = styles[key]
            if (value instanceof Object) {
                if (conditions[key]) {
                    Object.assign(result, value)
                }
            } else {
                result[key] = value
            }
        })

    return result
}