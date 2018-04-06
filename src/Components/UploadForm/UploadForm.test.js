import React from 'react';
import { mount } from 'enzyme';
import UploadForm from './UploadForm';
import mockData from './mockData';

describe('Upload form tests', () => {
  let renderedForm;
  beforeEach(() => {
    renderedForm = mount(<UploadForm />);
  });

  it('Should match the snapshot', () => {
    expect(renderedForm).toMatchSnapshot();
  });

  it('Should render the correct default components', () => {
    expect(renderedForm.find('UploadForm').length).toEqual(1);
    expect(renderedForm.find('.showUpload').length).toEqual(1);
    expect(renderedForm.find('form').length).toEqual(0);
  });

  it('Should show the form after clicking the button', () => {
    expect(renderedForm.state().showUpload).toEqual(false);
    
    renderedForm.find('.showUpload').simulate('click');

    expect(renderedForm.find('.showUpload').length).toEqual(0);
    expect(renderedForm.find('form').length).toEqual(1);
    expect(renderedForm.state().showUpload).toEqual(true);
  });

  it('Should have the right default state', () => {
    const defaultState = {
      uploadMsg: null,
      uploadSuccessful: true,
      showUpload: false
    };

    expect(renderedForm.state()).toEqual(defaultState);
  });

  it('Should set state correctly given an invalid upload type', () => {
    const expectedState = {
      "showUpload": false,
      "uploadMsg": "Please upload a valid JSON file",
      "uploadSuccessful": false
    };
    renderedForm.instance().invalidUpload();
    expect(renderedForm.state()).toEqual(expectedState);
  });

  it('Should set state correctly given a JSON upload with incomplete information', () => {
    const expectedState = {
      "showUpload": false,
      "uploadMsg": "Invalid JSON file - Missing search data.",
      "uploadSuccessful": false
    };
    renderedForm.instance().badUpload('search');
    expect(renderedForm.state()).toEqual(expectedState);
  });


});