import React, { Component } from 'react';
import './UploadForm.css';

class UploadForm extends Component {
  constructor() {
    super();
    this.state = {
      uploadMsg: null,
      uploadSuccessful: true,
      showUpload: false
    };
  }

  invalidUpload = () => {
    this.setState({ uploadSuccessful: false, uploadMsg: `Please enter valid starting and ending dates.` });
    setTimeout(() => { this.setState({ uploadMsg: null}) }, 2000);
  }

  successfulUpload = () => {
    this.setState({ uploadSuccessful: true, uploadMsg: `Successfully updated dates.` });
    
    setTimeout(() => { this.setState({ showUpload: false, uploadMsg: null}) }, 2000);
  }

  handleUpload = (e) => {
    e.preventDefault();
    const {startDate, endDate} = this;

    if (!startDate.value || !endDate.value) {
      return this.invalidUpload();
    }
    
    this.successfulUpload();
    this.props.updateDates(startDate.value, endDate.value);
  }

  render() {
    const statusColor = this.state.uploadSuccessful ? 'pos' : 'neg';
    
    return (
      <div className="UploadForm">
        <form onSubmit={this.handleUpload}>
          <label>Start Date: </label>
          <input type="date" ref={input => this.startDate = input}/>
          <label>End Date: </label>
          <input type="date" ref={input => this.endDate = input}/>
          <input type="submit" value="Submit" />
          <span className={statusColor}>{this.state.uploadMsg}</span>
        </form>
      </div>
    );
  }
}
export default UploadForm;