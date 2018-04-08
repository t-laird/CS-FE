import React, { Component } from 'react';
import Availability from '../Availability/Availability';
import './SiteAvailability.css';

class SiteAvailability extends Component {
  constructor() {
    super();
    this.state = {
      gap: 'unset'
    };
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.setState({ gap: parseInt(this.gapSize.value, 10) });
    this.gapSize.focus();
  }

  validReservationData = () => {  
    const { reservations, search, campsites } = this.props;
    const gapInfo = (
      isNaN(this.state.gap) || 
      this.state.gap > 6 || 
      this.state.gap < 0 
    ) ? <span>Input a gap rule size between 0-5 to highlight reservation availability.</span>
      : <span>Gap Size is <span>{this.state.gap}</span></span>
    
    if (!(Object.keys(search).length)) {
      return (
        <h3>Input Reservation Dates to See Availability</h3>
      );
    } else {
      return (
        <div className="availabilityDetails">
          <h3>Availability from <span>{search.startDate}</span> to <span>{search.endDate}</span></h3>
          <form onSubmit={this.handleUpdate}>
            <input type="text" ref={(input) => this.gapSize=input } placeholder="Enter the Desired Gap Size"/>
            <input type="submit" value="Highlight Gap Size" />
          </form>
          {gapInfo}
          <Availability gap={this.state.gap} campsites={campsites}/>
        </div>
      )
    }
  }


  render() {
    return (
      <div className="SiteAvailability">
        {this.validReservationData()}
      </div>
    )
  }
}
export default SiteAvailability;
