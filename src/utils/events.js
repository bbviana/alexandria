
export function handleEnterKey(event, callback) {
    return event.key === 'Enter' && callback.call()
}
