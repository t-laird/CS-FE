import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('App tests', () => {
  let renderedApp;
  beforeEach(() => {
    renderedApp = shallow(<App />);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot', () => {
    expect(renderedApp).toMatchSnapshot();
  });

  it('should render the correct default components', () => {
    expect(renderedApp.find('header').length).toEqual(1);
    expect(renderedApp.find('UploadForm').length).toEqual(1);
    expect(renderedApp.find('SiteAvailability').length).toEqual(1);
  });

  it('should set state with the formatted received data when a valid JSON file is uploaded', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-06-01", endDate: "2016-06-02" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };

    const formattedData =   {
      "campsites": { "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": false, "2": false, "3": false, "4": false, "5": false } } },
      "reservations": [ { "campsiteId": 1, "startDate": "2016-06-01", "endDate": "2016-06-02" }],
      "search": { "startDate": "2016-06-04", "endDate": "2016-06-06" },
    };

    renderedApp.instance().updateData(mockData);

    expect(renderedApp.state('campsites')).toEqual(formattedData.campsites);
    expect(renderedApp.state('reservations')).toEqual(formattedData.reservations);
    expect(renderedApp.state('search')).toEqual(formattedData.search);
  });

  it('Should return all false for a search overlapping an existing reservation', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-06-01", endDate: "2016-06-04" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": false, "1": false, "2": false, "3": false, "4": false, "5": false } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return false for all but 0 gap given a reservation with a 1 day gap after the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-06-08", endDate: "2016-06-10" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": false, "2": false, "3": false, "4": false, "5": false } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return false for all but 0 gap given a reservation with a 1 day gap before the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-05-30", endDate: "2016-06-02" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": false, "2": false, "3": false, "4": false, "5": false } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return false for all but 0 and 1 gap given a reservation with a 2 day gap before the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-05-30", endDate: "2016-06-01" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": true, "2": false, "3": false, "4": false, "5": false } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return false for all but 0 and 1 gap given a reservation with a 2 day gap after the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-06-09", endDate: "2016-06-12" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": true, "2": false, "3": false, "4": false, "5": false } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return false for all but 0, 1 and 2 gap given a reservation with a 3 day gap after the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-06-10", endDate: "2016-06-13" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": true, "2": true, "3": false, "4": false, "5": false } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return false for all but 0 and 1 gap given a reservation with a 2 day gap before the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-05-27", endDate: "2016-05-31" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": true, "2": true, "3": false, "4": false, "5": false } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return true for all given a reservation adjacent to the end date of the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-06-07", endDate: "2016-06-10" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });

  it('Should return true for all given a reservation adjacent to the start date of the search', () => {
    const mockData = { 
      search: {startDate: "2016-06-04", endDate: "2016-06-06"}, 
      reservations: [{ campsiteId: 1, startDate: "2016-06-01", endDate: "2016-06-03" }],
      campsites: [{
        "id": 1,
        "name": "Grizzly Adams Adventure Cabin"
      }]
    };
    
    const expectedCampsiteData = {
      "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true } }
    };
    
    renderedApp.instance().updateData(mockData);
    expect(renderedApp.state().campsites).toEqual(expectedCampsiteData);
  });  
});
