import React, { Component } from "react";
import axios from "axios";

export default class UploadResume extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  async handleSubmit(event) {
    event.preventDefault();
    const resume = this.fileInput.current.files[0];
    console.log("RESUME ", resume);
    let formData = new FormData();
    formData.append("file", resume);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    await axios.post("/api/resume", formData, config);

    console.log("after axios");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
