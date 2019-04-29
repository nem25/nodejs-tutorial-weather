const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a229e10e4fd56dfc1ae0220bb63d688c/' + lat + ',' + long

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to find network service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature 
            + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }  
    })
}

module.exports = forecast
