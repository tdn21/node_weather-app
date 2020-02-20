const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Defining paths for express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//setup static public directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tarun Duhan'
    })
})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.',
//         title: 'Help',
//         name: 'Tarun Duhan'
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    { 
            geocode(req.query.address, (err, {latitude, longitude, location}={}) => {                //destructured data object to its three properties
            if(err)
            {
                return res.send({ err })
            }
            
            forecast (latitude , longitude , (err, data) => {             //destructured data object to its two properties
                if(err){
                    return res.send({ err })
                }

                res.send({location : {
                    location,
                    latitude,
                    longitude
                },  
                    current_summary : data.currently.summary,
                    day_summary : data.hourly.summary,
                    day_high : data.daily.data[0].temperatureHigh,
                    day_low : data.daily.data[0].temperatureLow,
                    week_summary : data.daily.summary,
                    current_temperature : data.currently.temperature,
                    current_appTemp : data.currently.apparentTemperature,
                    current_windSpeed : data.currently.windSpeed,
                    current_precipProbability : data.currently.precipProbability * 100,
                    current_humidity : data.currently.humidity * 100,
                    current_visibility : data.currently.visibility
                })
            })
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tarun Duhan',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tarun Duhan',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('server is up on ' + port)
})