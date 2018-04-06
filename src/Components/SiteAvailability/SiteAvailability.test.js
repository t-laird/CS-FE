import React from 'react';
import { shallow } from 'enzyme';
import SiteAvailability from './SiteAvailability';

describe('SiteAvailability component tests', () => {
  let renderedSite;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      "campsites": { "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true } } },
      "reservations": [ { "campsiteId": 1, "startDate": "2016-06-01", "endDate": "2016-06-03" }],
      "search": { "startDate": "2016-06-04", "endDate": "2016-06-06" },
    }
    renderedSite = shallow(<SiteAvailability {...mockProps} />);
  });

  it('Should match the snapshot', () => {
    expect(renderedSite).toMatchSnapshot();
  });

  it('Should have the expected default elements', () => {
    expect(renderedSite.find('.SiteAvailability').length).toEqual(1);
  });

  it('Should render the availability details if there are reservations', () => {
    expect(renderedSite.find('.availabilityDetails').length).toEqual(1);
    expect(renderedSite.find('form').length).toEqual(1);
    expect(renderedSite.find('Availability').length).toEqual(1);
  });

  it('Should not render availability details if information has not yet been passed', () => {
    const emptyMockProps = { reservations: [], search: {}, campsites: {}};
    const emptyDataWrapper = shallow(<SiteAvailability {...emptyMockProps} />);
  });
});