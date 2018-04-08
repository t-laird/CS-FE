import React, { Component } from 'react';
import './App.css';
import UploadForm from './Components/UploadForm/UploadForm';
import SiteAvailability from './Components/SiteAvailability/SiteAvailability';
import logo from'./cs-logo.svg';
import moment from 'moment';


class App extends Component {
  constructor() {
    super();
    this.state = {
      campsites: {},
      reservations: [],
      search: {}
    };
  }

  async componentDidMount() {
    const fetchCampsites = await fetch('/campsites');
    const rawCampsites = await fetchCampsites.json();

    const campsites = rawCampsites.reduce((res, campsite) => {
      res[campsite.id] = {};
      res[campsite.id].name = campsite.name;
      res[campsite.id].gaps = {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      };
      return res;
    }, {});

    const fetchReservations = await fetch('/reservations');
    const reservations = await fetchReservations.json();

    this.setState({ campsites, reservations });

  }

  checkAvailability = (start, end, resSize, campsites, res) => {
    for (let i = 0 ; i < 6 ; i++) {
      if (
        (
          moment(start).diff(end, 'days') !== 1 &&
          moment(start).diff(end, 'days') <= i + 1 &&
          moment(start).diff(end, 'days') > 0
        ) 
        || 
        (
          moment(start).diff(end, 'days') <= 0 && 
          moment(start).diff(end, 'days') >= (resSize * -1)
        )
      ) {
        campsites[res.campsiteId].gaps[i] = false;
      }
    }
    return campsites;
  }

  generateAvailability = (search) => {
    const { campsites, reservations } = this.state;
    console.log(search);

    let campsitesCopy = Object.assign({}, campsites);

    const startDate = moment(search.startDate);
    const endDate = moment(search.endDate);

    const reservationSize = endDate.diff(startDate, 'days') + 1;

    reservations.forEach( (res, ind) => {
      campsitesCopy = this.checkAvailability(res.startDate, endDate, reservationSize, campsitesCopy, res, this.state.gap);

      campsitesCopy = this.checkAvailability(startDate, res.endDate, reservationSize, campsitesCopy, res, this.state.gap);
    });

    this.setState({
      search, campsites: campsitesCopy, reservations
    });
  }

  updateDates = (startDate, endDate) => {
    console.log(startDate, endDate);
    const search = {startDate, endDate};
    this.setState({ search });
    this.generateAvailability(search);


    // {
    //   "search": {
    //     "startDate": "2016-06-04",
    //     "endDate": "2016-06-06"
    //   },
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Campspot Logo" />
          <h1>Code Challenge</h1>
        </header>
       <UploadForm updateDates={this.updateDates}/>
       <SiteAvailability 
        reservations={this.state.reservations} 
        campsites={this.state.campsites} 
        search={this.state.search} />
      </div>
    );
  }
}

export default App;
