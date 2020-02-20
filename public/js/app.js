console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#weather-form-input')
const messageOne = document.querySelector('#message-1')
const day_summary = document.querySelector('#day-summary')
const current_temp_summary = document.querySelector('#current-temp-summary')
const app_temp = document.querySelector('#app-temp')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')
const wind = document.querySelector('#wind')
const humidity = document.querySelector('#humidity')
const visibility = document.querySelector('#visibility')
const precip = document.querySelector('#precip')
const week_summary = document.querySelector('#week-summary')

const changeMap = (latitude, longitude) => {
    const url = "https://maps.darksky.net/@temperature,"+latitude+","+longitude+",6?marker="+latitude+","+longitude+"&linkto=maps"
    document.getElementById('map').src=url
}

const Onload = () => {
    fetch('/weather?address=Delhi').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                current_temp_summary.textContent = data.current_temperature + String.fromCharCode(176) + "C    " + data.current_summary
                app_temp.textContent = data.current_appTemp + String.fromCharCode(176) + "C"
                day_high.textContent = data.day_high + String.fromCharCode(176) + "C"
                day_low.textContent = data.day_low + String.fromCharCode(176) + "C"
                messageOne.textContent = data.location.location
                wind.textContent = data.current_windSpeed + " m/s"
                humidity.textContent = data.current_humidity + "%"
                visibility.textContent = data.current_visibility + " Km"
                precip.textContent = data.current_precipProbability + "% chances"
                day_summary.textContent = data.day_summary
                week_summary.textContent = data.week_summary
            }
        })
    })
}

window.onload = Onload()

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    day_summary.textContent = 'Loading...'
    week_summary.textContent = 'Loading...'
    wind.textContent = 'Loading...'
    humidity.textContent = 'Loading...'
    visibility.textContent = 'Loading...'
    precip.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                current_temp_summary.textContent = data.current_temperature + String.fromCharCode(176) + "C    " + data.current_summary
                app_temp.textContent = data.current_appTemp + String.fromCharCode(176) + "C"
                day_high.textContent = data.day_high + String.fromCharCode(176) + "C"
                day_low.textContent = data.day_low + String.fromCharCode(176) + "C"
                messageOne.textContent = data.location.location
                wind.textContent = data.current_windSpeed + " m/s"
                humidity.textContent = data.current_humidity + "%"
                visibility.textContent = data.current_visibility + " Km"
                precip.textContent = data.current_precipProbability + "% chances"
                day_summary.textContent = data.day_summary
                week_summary.textContent = data.week_summary
                changeMap(data.location.latitude, data.location.longitude)
            }
        })
    })
})