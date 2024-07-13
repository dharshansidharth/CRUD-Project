const { log } = require('console')
const http = require('http')
const getReq = require('./methods/get')
const putReq = require('./methods/put')
const postReq = require('./methods/post')
const deleteReq = require('./methods/delete')
let movies = require('./data/movies.json')                                                                                       
const PORT = process.env.PORT || 5001
const server = http.createServer((req , res) => {
    const method = req.method
    req.movies = movies
    switch(method){
        case 'GET':
            getReq(req , res)
            break
            case 'POST':
            // console.log('hello')
            postReq(req , res)
            break
        case 'PUT':
            putReq(req , res)
            break
        case 'DELETE':
            deleteReq(req , res)
            break
        default:
            res.statusCode = 404
            res.setHeader('Content-Type' , 'application/json')
            res.write(JSON.stringify({error: 'page not found!' , message : 'This is my first nodejs project'}))
            res.end()
    }
})

server.listen(PORT , () => {
    console.log(`Listerning on port ${PORT}`)
})