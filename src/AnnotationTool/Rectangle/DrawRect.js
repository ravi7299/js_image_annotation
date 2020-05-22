import React, { Fragment } from 'react';
import Rectangle from './Rectangle';
import RectTransformer from './RectTransformer';
import shortid from 'shortid';

class DrawRect extends React.Component{
    state = {
        rectangles: [],
        rectCount: 0,
        selectedShapeName: '',
        mouseDown: false,
        mouseDraw: false,
        newRectX: 0,
        newRectY: 0,
        i: 0
    }



    handleStageMouseDown = (event) => {
        const { rectangles } = this.state;
        
        // clicked on stage - clear selection or ready to generate new rectangle
        if (event.target.className === 'Image') {

          const stage = event.target.getStage();
          const mousePos = stage.getPointerPosition();
          this.setState({
            mouseDown: true,
            newRectX: mousePos.x,
            newRectY: mousePos.y,
            selectedShapeName: '',
          });
          return;
        }
        // clicked on transformer - do nothing
        const clickedOnTransformer = event.target.getParent().className === 'Transformer';
        if (clickedOnTransformer) {
          return;
        }
    
        // find clicked rect by its name
        const name = event.target.name();
        console.log(name);
        const rect = rectangles.find(r => r.name === name);
        if (rect) {
          this.setState({
            selectedShapeName: name,
            rectangles,
          });
        } else {
          this.setState({
            selectedShapeName: '',
          });
        }
      };
    
      // When a properties of rectangle are changed
      handleRectChange = (index, newProps) => {
        const { rectangles } = this.state;
        rectangles[index] = {
          ...rectangles[index],
          ...newProps,
        };
    
        this.setState({ rectangles });
      };
    
      // when a new rectangle is drawn
      handleNewRectChange = (event) => {
        const {
          rectangles, rectCount, newRectX, newRectY,
        } = this.state;
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();    // get mouse position
        if (!rectangles[rectCount]) {
          rectangles.push({
            x: newRectX,
            y: newRectY,
            width: mousePos.x - newRectX,
            height: mousePos - newRectY,
            name: '',
            stroke: '#00A3AA',
            key: shortid.generate(),
          });
          return this.setState({ rectangles, mouseDraw: true });
        }
        rectangles[rectCount].width = mousePos.x - newRectX;
        rectangles[rectCount].height = mousePos.y - newRectY;
        return this.setState({ rectangles });
      };
    
      handleStageMouseUp = () => {
        var this1 = this;
    
        const { rectCount, mouseDraw } = this.state;
        const { rectangles, i } = this.state;
        if (mouseDraw) {
          this.setState({ rectCount: rectCount + 1, mouseDraw: false });
          var annotations = document.getElementById('annotate');
          var e1 = annotations.appendChild(document.createElement('input'));    // creating input field
          e1.className = 'fieldClass';
          e1.onchange = updateName;
    
          function updateName() {       //Local function to update name
            var value = this.value;
            console.log(value);
            this1.setState(Object.assign(this1.state.rectangles[i], { name: value }));
          }
          console.log(this1.state.rectangles);
          console.log(rectangles[i].name);
          this.setState({
            i: i + 1
    
            //this.state.rectangles[this.state.i].name = document.querySelector('input[className="fieldCLass"]');
            //this1.state.i = this1.state.i + 1;
          });
        }
    
        //console.log(this1.state.rectangles);
        this.setState({ mouseDown: false });
      };

      

    render(){
        const {
            state: { rectangles, selectedShapeName },
            handleRectChange,
          } = this;
        return(
            <Fragment>
                {rectangles.map((rect, i) => (
                <Rectangle id="annotate"
                    
                  sclassName="rect"
                  key={rect.key}
                  {...rect}
                  onTransform={(newProps) => {
                    handleRectChange(i, newProps);
                  }}
                />
              ))}
              <RectTransformer selectedShapeName={selectedShapeName} />
            </Fragment>
            
        )
    }
}

export default DrawRect;