import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Button } from "react-materialize";
import Dropzone from 'react-dropzone'
import './App.css';
import axios from "axios";

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      file:null,
      dist: {}
    };
  }

  onDrop = (acceptFile,rejectFile)=> {
    console.log("this.defualtState",this.test);
    if(!acceptFile){
        return;
    }
    this.setState({
        file: acceptFile[0]
    })
  }

  fileUpload =()=>{
    
     var formData = new FormData();
     formData.append("File", this.state.file);

     axios.post('localhost:8080/image', formData)
     .then((res)=>{
        let {status} =res.data;

        if (status === 200){
          this.setState({
            dist: res.data.dist
          })
        }
     })
  }


  render() {
    return (
      <div className="App">
       <Row>
       <Dropzone onDrop={this.onDrop} className="dropzone">
            {
                !!this.state.file ?
                <div>
                    <h2 className="instruction">Click upload to upload the file</h2>
                    <img src={this.state.file.preview}/>
                </div>:
                <h2 className="instruction">Try dropping some files here, or click to select files to upload.</h2>
            }
        </Dropzone>
       </Row>
       <Row>
         <Button>Upload and check my age</Button>
       </Row>
       <Row>
         <h2>result</h2>
       </Row>
      </div>
    );
  }
}

export default App;
