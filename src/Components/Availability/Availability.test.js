import React from 'react';
import { shallow } from 'enzyme';
import Availability from './Availability';

describe('Availability tests', () => {
  let renderedAvailability;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      campsites: { "1": { "name": "Grizzly Adams Adventure Cabin", "gaps": { "0": true, "1": false, "2": false, "3": false, "4": false, "5": false } }, "2": { "name": "Lewis and Clark Camp Spot", "gaps": { "0": true, "1": true, "2": false, "3": false, "4": false, "5": false } }, "3": { "name": "Jonny Appleseed Log Cabin", "gaps": { "0": true, "1": false, "2": false, "3": false, "4": false, "5": false } }, "4": { "name": "Davey Crockett Camphouse", "gaps": { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true } }, "5": { "name": "Daniel Boone Bungalo", "gaps": { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true } } },
      gap: 'unset'
    };

    renderedAvailability = shallow(<Availability {...mockProps} />);
  });

  it('Should match the snapshot', () => {
    expect(renderedAvailability).toMatchSnapshot();
  })

  it('Should render 6 rows', () => {
    expect(renderedAvailability.find('tr').length).toEqual(6);
  });

  it('Should not have any highlighted rows when the gap is unset', () => {
    expect(renderedAvailability.find('.highlight').length).toEqual(0);
  });

  it('Should highlight TD\'s containing true when the gap is set', () => {
    renderedAvailability.setProps({ gap: 1 });
    expect(renderedAvailability.find('.highlight').length).toEqual(3);
  });
});