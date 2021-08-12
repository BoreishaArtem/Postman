export default obj => {
    const clone = {}
    for (let key in obj) {
        if (typeof clone[key] !== 'object') clone[key] = obj[key]
    }
    return clone
}