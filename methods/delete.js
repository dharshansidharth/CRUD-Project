const writeToFile = require('../util/write_to_file')

module.exports = (req , res) => {
    let baseUrl = req.url.substring(0 , req.url.lastIndexOf('/') + 1)
    let id = req.url.split('/')[3]
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )

    if(!regexV4.test(id)){

        res.writeHead(400 , {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({error: 'Validation Error' , message : 'Invalid UUID!'}))
    }

    else if ((baseUrl === '/api/movies' || '/api/movies/') && regexV4.test(id)){
        const index = req.movies.findIndex((movie) => {
            return movie.id === id
        })
        if(index === -1){
            console.log('if-block')
            res.statusCode = 404
            res.write({error: 'Movie not found!' , message : 'No movie exist'})
            res.end()
        }

        else{
            console.log(req.movies)
            req.movies.splice(index , 1)
            writeToFile(req.movies)
            res.writeHead(204 , {'Content-Type' : 'application/json'})
            res.end(JSON.stringify(req.movies))
        }
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
      }
}