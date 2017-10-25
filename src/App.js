import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Button } from "react-materialize";
import {ChartCmp} from "./ChartCmp";
import Dropzone from 'react-dropzone'
import './App.css';
import axios from "axios";

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      file:null,
      dist:null,
      res: null
    };
  }

  onDrop = (acceptFile,rejectFile)=> {
    if(!acceptFile){
        return;
    }
    this.setState({
        file: acceptFile[0]
    })
  }

  fileUpload =()=>{
    
     var formData = new FormData();
     formData.append("image", this.state.file);
    //change here to real end point
     axios.post('http://localhost:8080/image',formData)
     .then((res)=>{
        let {status} =res.data;

        if (status === 200){
          this.setState({
            dist: this.mapResult(res.data.dist),
            res: this.topResult(res.data.dist)
          })
        }
     })
  }

  mapResult =(res)=>{
    let mappingRes = [];
    Object.entries(res).forEach(([key, value]) =>{
      mappingRes.push({
        age: key,
        percentage: value
      })
    });

  //  let final= mappingRes.reduce((groupRes, e, index)=>{
  //     if (index % 10 === 0 && index !== 0){
  //       groupRes.push([])
  //     }
  //     groupRes[groupRes.length - 1].push(e)
  //     return groupRes
  //   },[[]])

    // return final;
    return mappingRes;
  }

  topResult =(res)=>{
    var topPrecentage = {
      1:0
    };
    Object.entries(res).forEach(([ key , value]) =>{
      if(value > Object.values(topPrecentage)){
        topPrecentage = {
          [key]:value
        }
      }
    });
    return topPrecentage;
  }

  render() {
    return (
      <div className="App">
        <div className="container">
        <Row>
          <h1>Age detector, just use a photo :)</h1>
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
            <Button onClick={()=>{this.fileUpload()}}
                    disabled={!this.state.file}>Upload and check my age</Button>
          </Row>
          {
            !!this.state.dist?
            <div>
                <Row>
                <h1>Result</h1>
                <span>Your are: {Object.keys(this.state.res)}</span>
              </Row>

              <h1>Details</h1>

              <Row>
                <ChartCmp data={this.state.dist}></ChartCmp>
              </Row>

            </div>
            
              :
              <div></div>
          }
          
        </div>
       
      </div>
    );
  }
}

export default App;
