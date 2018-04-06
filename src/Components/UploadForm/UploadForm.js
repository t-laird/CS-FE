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

  badUpload = (prop) => {
    this.setState({ uploadSuccessful: false, uploadMsg: `Invalid JSON file - Missing ${prop} data.` });
    setTimeout(() => { this.setState({ uploadMsg: null}) }, 2000);
  }

  invalidUpload = () => {
    this.setState({ uploadSuccessful: false, uploadMsg: `Please upload a valid JSON file` });
    setTimeout(() => { this.setState({ uploadMsg: null}) }, 2000);
  }

  successfulUpload = () => {
    this.setState({ uploadSuccessful: true, uploadMsg: `Successfully uploaded file.` });
    
    setTimeout(() => { this.setState({ showUpload: false, uploadMsg: null}) }, 2000);
  }

  handleUpload = (e) => {
    e.preventDefault();
    const file = this.fileUpload.files;
    
    if (!file.length) return;

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      try {
        const result = JSON.parse(e.target.result);
        const expectedProps = ['search', 'campsites', 'reservations'];
        for (const prop in expectedProps) {
          if (!result[expectedProps[prop]]) {
            return this.badUpload(expectedProps[prop]);
          }
        }
        this.props.updateData(result);
        this.successfulUpload();
       
      } catch (err) {
        return this.invalidUpload()
      }
    }

    fileReader.readAsText(file.item(0));
  }

  render() {
    const statusColor = this.state.uploadSuccessful ? 'pos' : 'neg';
    
    return (
      <div className="UploadForm">
      { !this.state.showUpload && 
        <button className="showUpload" onClick={() => {this.setState({showUpload: true})}}>Upload File</button>
      }
      { this.state.showUpload && 
        <form>
          <input type="file" ref={(input) => this.fileUpload = input} />
          <button onClick={this.handleUpload}>Upload</button>
          <span className={statusColor}>{this.state.uploadMsg}</span>
        </form>
      }
      </div>
    );
  }
}
export default UploadForm;