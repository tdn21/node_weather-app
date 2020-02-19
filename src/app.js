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
    res.render('index', {
        title : 'Weather App',
        name : 'Tarun Duhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tarun Duhan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Tarun Duhan'
    })
})

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
            
            // forecast (latitude , longitude , (err, {daily, currently} = {}) => {             //destructured data object to its two properties
            //     if(err){
            //         return res.send({ err })
            //     }
        
            //     console.log(location)

            //     res.send({location : location,
            //             summary : daily.summary,
            //         temperature : currently.temperature
            //     })
            // })
            forecast (latitude , longitude , (err, data) => {             //destructured data object to its two properties
                if(err){
                    return res.send({ err })
                }
        
                console.log(location)
                console.log(data)

                res.send({location : location,
                        summary : data.daily.summary,
                    temperature : data.currently.temperature
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