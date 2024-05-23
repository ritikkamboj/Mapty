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

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);


  constructor(cords, distance, duration) {
    this.cords = cords;
    this.distance = distance;
    this.duration = duration;

  }
}

class Running extends Workout {
  type ='running';

  constructor(cords, distance, duration, cadence) {
    super(cords, distance, duration);
    this.cadence = cadence;
    this.calcPace();

  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }

}

class Cycling extends Workout {
  type='cycling';
  constructor(cords, distance, duration, elevation) {
    super(cords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();

  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }


}


const run1 = new Running([39, -12], 5.2, 24, 170);
const cycling1 = new Cycling([39, -12], 27, 95, 523);
console.log(run1, cycling1)

class App {

  #map;
  #mapEvent;
  #workouts =[];

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

  }

  _getPosition() {
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

    this.#map.on('click', this._showForm.bind(this));
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
    const validInputs = (...inputs)=> inputs.every(inp => Number.isFinite(inp));
    const allPosititve =(...inputs)=> inputs.every(inp => inp >0);


    e.preventDefault();

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng; 
    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      console.log("jeet")

      //here we are using the guard class , like we have to check on opposite condition 
      if(!validInputs(distance,duration,cadence) || !allPosititve(distance,duration,cadence)) 
        {
          return alert("please enter a finite a number ");
        }
        
         workout = new Running([lat, lng],distance,duration,cadence);
         
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value

      if(!validInputs(distance,duration,elevation) || !allPosititve(distance,duration)){
        return alert("please enter a finite a number ");
      }

      workout = new Cycling([lat, lng], distance,duration,elevation);
    }
    this.#workouts.push(workout);
    console.log(workout);
    this.renderWorkoutMarker(workout);

    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';


    console.log(this.#mapEvent);
    // const { lat, lng } = this.#mapEvent.latlng; 
    // console.log(L);
    
  }

  renderWorkoutMarker(workout){
    console.log(workout)
    L.marker(workout.cords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,

        })).setPopupContent(`workout`)
      .openPopup();

  }
}

const app = new App();




// handling separetly that when user click on the submit 



