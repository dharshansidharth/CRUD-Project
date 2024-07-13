module.exports = async (request) => {
    return new Promise ((resolve , reject) => {
        try{
            let body = ''
            request.on('data' , (chunk) => {
                body += chunk
            })
            request.on('end' , () => {
                // console.log(body , 'body')
                try{
                resolve(JSON.parse(body))
                }
                catch(err){
                    console.log('catch')
                    console.log(err)
                }
            })
            
        }

        catch(err){
            console.log(err)
            reject(err)
        }
    })
}