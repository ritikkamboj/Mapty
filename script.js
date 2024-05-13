'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

console.log(navigator.geolocation);

navigator.geolocation.getCurrentPosition(function(positions){

    
    console.log(positions.coords);

    const {longitude} = positions.coords;
    const {latitude}= positions.coords
    console.log(`https://www.google.com/maps/@${longitude},${latitude}?entry=ttu`);
}, function()
{console.log('not able to fetched the coordinates ')})
