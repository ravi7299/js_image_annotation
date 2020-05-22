import React, { Fragment } from 'react';
import { Rect, Text } from 'react-konva';

class Rectangle extends React.Component {

    componentDidUpdate() {
        this.rect.getLayer().draw();
    }

    handleChange = (event) => {
        const {
            props: { onTransform },
        } = this;
        const shape = event.target;
        // by default Transformer will change scaleX and scaleY
        // while transforming
        // so we need to adjust that properties to width and height
        onTransform({
            x: shape.x(),
            y: shape.y(),
            width: shape.width() * shape.scaleX(),
            height: shape.height() * shape.scaleY(),
            rotation: shape.rotation()
        });
    };

    handleMouseEnter = (event) => {
        const shape = event.target;
        shape.stroke('#3DF6FF');
        shape.getStage().container().style.cursor = 'move';
        // this.rect.draw();
        this.rect.getLayer().draw();
    };

    handleMouseLeave = (event) => {
        const shape = event.target;
        shape.stroke('#00A3AA');
        shape.getStage().container().style.cursor = 'crosshair';
        // this.rect.draw();
        this.rect.getLayer().draw();
    };

    render() {
        const {
            props: {
                x,
                y,
                width,
                height,
                name,
                stroke,
            },
            handleChange,
            handleMouseEnter,
            handleMouseLeave,
        } = this;
        return (
            <Fragment>
                <Rect x={x}
                    y={y}
                    width={width}
                    height={height}
                    // force no scaling
                    // otherwise Transformer will change it
                    scaleX={1}
                    scaleY={1}
                    stroke={stroke}
                    strokeWidth={5}
                    name={name}
                    // save state on dragend or transformend
                    onDragEnd={handleChange}
                    onTransformEnd={handleChange}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    draggable ref={
                        (node) => {
                            this.rect = node;
                        }
                    }
                />
                <Text
                    text={this.props.name}
                    x={this.props.x}
                    y={this.props.y}
                    fill={'white'}
                    fontSize={'15'}
                />
            </Fragment>
        );
    }
}

export default Rectangle;