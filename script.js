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

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    

      // instead of using eventlistener to add marker on map , we are using the leaflet provided method to handle that 

      map.on('click',function(mapEvent){
        console.log(mapEvent);
        const {lat , lng} = mapEvent.latlng;
        // console.log(L);
        L.marker([lat,lng])
      .addTo(map)
      .bindPopup(
        L.popup({
      maxWidth: 250,
      minWidth : 100,
      autoClose : false,
      closeOnClick : false,
      className : 'running-popup'

      })).setPopupContent("Workout")
      .openPopup();

      });
  },
  function () {
    console.log('not able to fetched the coordinates ');
  }
);

