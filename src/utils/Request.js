import xhr from 'superagent'

/**
 * Ex:
 * Request.post('/users', user).then(data => console.log(data))
 */
class Request {
    static execute = (method, url, data) => promise(xhr(method, url).send(data))
    static get = (url, query) => promise(xhr.get(url).query(query))
    static post = (url, data) => promise(xhr.post(url).send(data))
    static put = (url, data) => promise(xhr.put(url).send(data))
    static del = url => promise(xhr.del(url))
}

const promise = xhr =>
    new Promise((resolve, reject) => {
        xhr.end((error, res) => {
            if (error) {
                reject(res.text, error)
            } else {
                resolve(res.body)
            }
        })
    })

export default Request
