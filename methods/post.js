const crypto = require('crypto')
const requestBodyParser = require('../util/body_parser')
const writeToFile = require('../util/write_to_file')

module.exports = async (req, res) => {
    if (req.url === '/api/movies') {
        try {
            let body = await requestBodyParser(req)
            body.id = crypto.randomUUID()
            req.movies.push(body)
            writeToFile(req.movies)
            res.writeHead(201, { 'Content-Type': '/application/json' })
            res.end()
        }

        catch (err) {
            console.log('catch-block')
            console.log(err)
            res.writeHead(400, { 'Content-type': 'application/json' })
            res.end(JSON.stringify({
                title: 'validation failed',
                message: 'Requested body is not valid!!',
            }))
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
}

