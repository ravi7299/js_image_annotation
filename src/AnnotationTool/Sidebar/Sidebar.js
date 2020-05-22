import React, { Component } from 'react'
import "./Sidebar.css"
import axios from 'axios';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dta: '',
      imageFile: ""
    }
  }

  uploadImage = () => {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onload = () => {
      this.setState(()=>{this.props.imageSet(reader.result)});
    }
    
    if (file) {
      reader.readAsDataURL(file);
      var data = JSON.stringify({ "name": file.name, "Image type": file.type, "Image Size(KB)": (file.size) / 1024, "Last Modified Date": file.lastModifiedDate });
      this.setState({ dta: data });
      // console.log(reader.result);
    }
  }

  DataSend() {
    axios.post('https://labell.herokuapp.com/api/generate', this.state.dta)
      .then(console.log('data send!'))
      .then(
        axios({
          url: 'https://labell.herokuapp.com/api/getfile',
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          console.log(response.data);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.json'); //or any other extension
          document.body.appendChild(link);
          link.click();

        }).catch(err => {
          console.log('error1', err);
        }))
      .catch(err => { console.log('error2', err) })
  }

  // getFile() {
  //   axios({
  //     url: 'https://labell.herokuapp.com/api/getfile',
  //     method: 'GET',
  //     responseType: 'blob',
  //   })
  //   .then((response) => {
  //     // console.log(response.data);
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'file.json'); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();

  //   });
  // }

  render() {
    return (
      <div className="wholeSidebar">
        <div>
          <label htmlFor="files" className="submitButton1" title="Select File to Upload"><i className="fas fa-file-upload fa-3x"></i></label>
          <input id="files" accept="image/*" hidden="hidden" type="file" onChange={this.uploadImage} />
        </div>
        <div>
           <button className="submitButton" title="Draw Rectangle" onClick={()=>{this.props.buttonClick(true, false, false, false, false)}}>
           <i className="fas fa-vector-square fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Circle" onClick={()=>{this.props.buttonClick(false, true, false, false, false)}}>
          <i className="far fa-circle fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Line" onClick={()=>{this.props.buttonClick(false, false, true, false, false)}}>
          <i className="fas fa-pen fa-2x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Polygon" onClick={()=>{this.props.buttonClick(false, false, false, true, false)}}>
          <i className="fas fa-draw-polygon fa-3x"></i>


          </button>
        </div>
        {/* <div>
          <button className="submitButton" title="Draw Point" onClick={()=>{this.props.buttonClick(false, false, false, false, true)}}>
            <p>Point</p>
          </button>
        </div> */}
        <div>
          <button className="submitButton" title="Save JSON">
          <i className="fas fa-download fa-3x"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Sidebar;
