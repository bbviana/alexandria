const handleEnterKey = (event, callback) => {
    event.key === 'Enter' && callback.call()
}

export default {
    handleEnterKey
}