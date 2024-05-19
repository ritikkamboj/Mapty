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

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position.coords);

    const { longitude } = position.coords;
    const { latitude } = position.coords;
  
    const location = [latitude, longitude];
    // console.log(
    //   `https://www.google.com/maps/@${longitude},${latitude}?entry=ttu`
    // );

    // const map = L.map('map').setView(coords, 13);
    const map = L.map('map').setView(location, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(location)
      .addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
  },
  function () {
    console.log('not able to fetched the coordinates ');
  }
);
