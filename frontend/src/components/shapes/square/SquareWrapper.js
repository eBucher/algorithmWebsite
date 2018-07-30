import React from 'react';
import Square, {squareDefaultProps} from './Square.js';

/** A wrapper class for the <Square /> component to access helper functions.
    The <Square /> can be rendered with the build() function. */
class SquareWrapper {
    constructor(settings) {
        this.settings = {
            ...squareDefaultProps,
            ...settings,
        }
    }

    /** @return an object with x and y properties that is relative to the position
        of the square that would be rendered. The OUTER prefix shifts the coordinate
        5 pixels away from the side or top of the text while the other positions
        (LEFT, RIGHT, TOP, BOTTOM) return a coordinate that is on the edge. */
    getCoordAt = (position) => {
        var center = this.settings.center;
        var size = this.settings.size;
		if(position === "CENTER"){
			return {x: center.x, y: center.y};
		} else if (position === "TOP"){
            return {x: center.x, y: center.y - size/2}
        } else if (position === "OUTER_TOP"){
            if(this.settings.topText !== null){
                return {x: center.x, y: center.y - size/2 - this.settings.outerFontSize - 5}
            } else {
                return {x: center.x, y: center.y - size/2 - 5}
            }
        } else if (position === "BOTTOM"){
            return {x: center.x, y: center.y + size/2}
        } else if (position === "OUTER_BOTTOM"){
            if(this.settings.topText !== null){
                return {x: center.x, y: center.y + size/2 + this.settings.outerFontSize + 5}
            } else {
                return {x: center.x, y: center.y + size/2 + 5}
            }
        } else if (position === "LEFT"){
            return {x: center.x - size/2, y: center.y}
        } else if (position === "OUTER_LEFT"){
            return {x: center.x - size/2 - 5, y: center.y}
        } else if (position === "RIGHT"){
            return {x: center.x + size/2, y: center.y}
        } else if (position === "OUTER_RIGHT"){
            return {x: center.x + size/2 + 5, y: center.y}
        }

        throw new Error("Bad position (" + position + ") given to getCoordAt() function.");
    }

    build = () => {
        return(
            <Square {...this.settings}/>
        )
    }
}

export default SquareWrapper;
