import React from 'react';
import Pointer, {pointerDefaultProps} from './Pointer.js';

class PointerWrapper {
    constructor(settings) {
        this.settings = {
            ...pointerDefaultProps,
            ...settings,
        }
    }


    build = () => {
        return(
            <Pointer {...this.settings}/>
        )
    }
}

export default PointerWrapper;
