const request = require("request")


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxwaGEtMjEiLCJhIjoiY2s2MGd0bTB0MDd3bTNlcGl4MHVwOXBpeSJ9.aoiI4JMNDSUuS6Cs_T6o1Q'

    request({ url, json : true}, (err , { body }) => {
        if(err) {
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. Try another search!!', undefined)
        }else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode