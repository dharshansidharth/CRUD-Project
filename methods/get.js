module.exports = (req , res) => {

    let baseUrl = req.url.substring(0 , req.url.lastIndexOf('/') + 1)
    let id = req.url.split('/')[3]
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    
    if (req.url === '/api/movies/' || req.url === '/api/movies'){
        console.log('get')
        res.statusCode = 200
        res.setHeader('Content-Type' , 'application/json')
        res.write(JSON.stringify(req.movies))
        res.end()
    } 
    
    else if ((baseUrl === '/api/movies' || '/api/movies/') && regexV4.test(id)){
        res.setHeader('Content-Type' , 'application/json')

        let filteredMovies = req.movies.filter((m) => {
            return m.id === id
        })

        if (filteredMovies){
            res.statusCode = 200
            res.write(JSON.stringify(filteredMovies))
            res.end()
        }

        else{
            res.statusCode = 404
            res.write({error: 'Movie not found!' , message : 'No movie exist'})
        }

        res.write(JSON.stringify())
        res.end()
    }

    else if(!regexV4.test(id)){

        res.writeHead(400 , {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({error: 'Validation Error' , message : 'Invalid UUID!'}))
    }


     else{
        console.log('hello')
        res.writeHead(404 , {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({error: 'page not found!' , message : 'Route not found!!'}))
    }
}
