import React from 'react';
import { Stage, Layer } from 'react-konva';
import AnnotationImage from './AnnotationImage/AnnotationImage';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawRect from './Rectangle/DrawRect';

class App extends React.Component {
  state = {
    image: "",
    stageWidth: 1000,
    mouseDown : false,
    rector : false,
    circle : false,
    line: false,
    polygon: false,
    point: false
  };

  //Setting background image
  imageSet = (file) =>{
    this.setState({image: file})
  }

  // Calling child functions inside parent
  handleNewShapeChange = (event) =>{
    if(this.state.rector){
      this.refs.child.handleNewRectChange(event);
    }
  }
  handleStageMouseUp = () =>{
    if(this.state.rector){
      this.refs.child.handleStageMouseUp();
      this.setState({mouseDown : this.refs.child.state.mouseDown});
    }
  }
  handleStageMouseDown = (event) =>{
    if(this.state.rector){
      this.refs.child.handleStageMouseDown(event);
      this.setState({mouseDown : this.refs.child.state.mouseDown})
    }
  }

  //To resize the canvas dynamically
  componentDidMount() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
  }

  checkSize = () => {
    this.setState({
      stageWidth: window.innerWidth*0.763
    });
  };

  //Setting the buttons
  buttonClick = (rector, circle, line, polygon, point)=>{
    this.setState({rector , circle, line , polygon, point})
  }

  render() {

    const { state : {mouseDown},
      handleNewShapeChange,
      handleStageMouseDown,
      handleStageMouseUp
    } = this;
    
    return (
      <div>
      <div className = "row" style={{justifyContent : "center", color : "#00edae"}}><h1>Image Annotator</h1></div>
        <div className="row">
          <div className="sm spa">
            <Sidebar buttonClick = {this.buttonClick} imageSet = {this.imageSet}/>
          </div>
          <div id="app" className="col-md-9">
            <Stage
              ref={(node) => {
                this.stage = node;
              }}
              container="app"
              width= { this.state.stageWidth}
              height= { window.innerHeight * 0.90}
              onMouseDown={handleStageMouseDown}
              onTouchStart={handleStageMouseDown}
              onMouseMove={mouseDown && handleNewShapeChange}
              onTouchMove={mouseDown && handleNewShapeChange}
              onMouseUp={mouseDown && handleStageMouseUp}
              onTouchEnd={mouseDown && handleStageMouseUp}
              
            >
              <Layer
                ref={(node) => {
                  this.img = node;
                }}
              >
                <AnnotationImage image = {this.state.image}/>
              </Layer>

              <Layer>
                <DrawRect ref = "child"/>
              </Layer>
                

            </Stage>

          </div>
          <div className="col-md-2" id = "annotate">
            <div className="row ann">
              <h4>Annotations</h4>
            </div>
			    </div>
        </div>
        </div>
    );
  }
}

export default App;
