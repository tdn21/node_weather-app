const request = require('request')


const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/8ff07e8210b1ae56a3c8219343e71841/' + latitude + ',' + longitude +'?units=si'

    request({ url, json : true }, (err, { body } ) => {                                   //used shorthand notation instead of writing {url : url, json : true} nd destructured res object to its body property
        if(err)
        {
            callback('Unable to connect to weather service!', undefined)
        }else if (body.error)
        {
            callback('Unable to find location', undefined)
        }else 
            callback(undefined, body)
    })
}

module.exports = forecast