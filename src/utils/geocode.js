const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    + address 
    +'.json?access_token=pk.eyJ1IjoibmVtMjUiLCJhIjoiY2p1YmN2aTY0MDBzMzN6a2J5dWNwYTJ1MSJ9.UxYGC_jR7NrfqKLwQKbELQ'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to network.', undefined)
        } else if (body.features.length < 1){
            callback('Cannot find location.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }    
     })
}

module.exports = geocode