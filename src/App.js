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
    const testEndpoint = await fetch('/campsites');
    const data = await testEndpoint.json();
    console.log(testEndpoint);
    console.log(data);

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

  generateAvailability = (reservations, campsites, search) => {
    if (this.state.dataDigested) return;

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

  updateData = (data) => {
    const { search, campsites, reservations } = data;

    const campsitesToObj = campsites.reduce((res, campsite) => {
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

    return this.generateAvailability(reservations, campsitesToObj, search);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Campspot Logo" />
          <h1>Code Challenge</h1>
        </header>
       <UploadForm updateData={this.updateData}/>
       <SiteAvailability 
        reservations={this.state.reservations} 
        campsites={this.state.campsites} 
        search={this.state.search} />
      </div>
    );
  }
}

export default App;
