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
let map;
let mapEvent;

class Workout
{
  date = new Date();
  id = (Date.now() + '').slice(-10);


  constructor(cords, distance,duration)
  {
    this.cords= cords;
    this.distance = distance;
    this.duration = duration;

  }
}

class Running extends Workout{

  constructor(cords, distance,duration,cadence){
    super(cords, distance,duration);
    this.cadence= cadence;
    this.calcPace();
    
  }
  calcPace()
  {
    this.pace = this.duration/this.distance;
    return this.pace;
  }

}

class Cycling extends Workout{
  constructor(cords, distance,duration,elevation){
    super(cords, distance,duration);
    this.elevation=elevation;
    this.calcSpeed();

  }
  calcSpeed(){
    this.speed = this.distance/(this.duration/60);
    return this.speed;
  }
  

}


const run1 = new Running([39,-12],5.2,24,170);
const cycling1 = new Cycling([39,-12],27,95,523);
console.log(run1,cycling1)

class App{

  #map;
  #mapEvent;

  constructor(){
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    
    inputType.addEventListener('change', this._toggleElevationField);

  }

  _getPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
       this._loadMap.bind(this)
        ,
        function () {
          console.log('not able to fetched the coordinates ');
        }
      );
    }
  }

  _loadMap(position) {
    
      console.log(position.coords);

      const { longitude } = position.coords;
      const { latitude } = position.coords;

      const location = [latitude, longitude];
     
     this.#map = L.map('map').setView(location, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);



      // instead of using eventlistener to add marker on map , we are using the leaflet provided method to handle that 

      this.#map.on('click', this._showForm.bind(this) );
    }
  

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {

    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {

    
    e.preventDefault();
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
  
  
    console.log(this.#mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;  // why not here we change as #mapEvent ???
    // console.log(L);
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup'
  
        })).setPopupContent("Workout")
      .openPopup();
  }
}

const app = new App();




// handling separetly that when user click on the submit 



