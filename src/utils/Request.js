import request from 'superagent'

/**
 * Ex:
 * Request.post('/users', user).then(data => console.log(data))
 */
class Request {
    static execute = (method, url, data) => {
        let requestConfig = request(method, url)
        if (method.toUpperCase() === 'GET') {
            requestConfig = requestConfig.query(data)
        } else {
            requestConfig = requestConfig.send(data)
        }

        return promise(requestConfig)
    }

    static get = (url, query) => {
        return promise(request.get(url).query(query))
    }

    static post = (url, data) => {
        return promise(request.post(url).send(data))
    }

    static put = (url, data) => {
        return promise(request.put(url).send(data))
    }

    static del = url => {
        return promise(request.del(url))
    }
}

const promise = request =>
    new Promise((resolve, reject) => {
        request.end((error, res) => {
            if (error) {
                reject(res.text, error)
            } else {
                resolve(res.body)
            }
        })
    })

export default Request
