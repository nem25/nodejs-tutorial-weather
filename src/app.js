const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname, ('../public'))
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Neha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Neha'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Neha',
        message: 'This is the help page.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter an address.'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {   
        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, foreCastdata = '') => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: foreCastdata,
                location,
                address: req.query.address
            })
          })
        
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Error 404',
        name: 'Neha',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'Error 404',
        name: 'Neha',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})