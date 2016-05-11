/**
 * Executa callbackFunction se ENTER foi pressionado
 *
 * handleEnterKey(e => callbackFunction(e.target.value))
 */
export const handleEnterKey = callback => event => {
    if (typeof callback !== 'function') {
        throw new Error('handleEnterKey() deve receber uma function de callback')
    }

    return event.key === 'Enter' && callback(event)
}
