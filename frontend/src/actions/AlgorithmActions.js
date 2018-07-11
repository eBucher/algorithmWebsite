export function setAlgorithmName(name){
    return {
        type: "SET_ALGORITHM_NAME",
        payload: name
    }
}

export function setStarted(started){
    return {
        type: "SET_STARTED",
        payload: started
    }
}

export function setStepNum(newNum){
    return {
        type: "SET_STEP_NUM",
        payload: newNum
    }
}


export function setSteps(steps){
    return {
        type: "SET_STEPS",
        payload: steps
    }
}


export function setAreaDimensions(w, h){
    return {
        type: "SET_AREA_DIMENSIONS",
        payload: {
            width: w,
            height: h
        }
    }
}
