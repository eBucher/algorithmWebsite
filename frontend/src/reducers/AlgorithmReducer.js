const AlgorithmReducer = (state =
    {
        name: null,
        started: false,
        stepNum: null,
        steps: [],
        areaWidth: 0,
        areaHeight: 0,
    }
, action) => {
    switch (action.type){
        case "SET_ALGORITHM_NAME":
            state = {
                ...state,
                name: action.payload
            }
            break;
        case "SET_STARTED":
            state = {
                ...state,
                started: action.payload
            }
            break;
        case "SET_STEP_NUM":
            state = {
                ...state,
                stepNum: action.payload
            }
            break;
        case "SET_STEPS":
            state = {
                ...state,
                steps: action.payload
            }
            break;
        case "SET_AREA_DIMENSIONS":
            state = {
                ...state,
                areaWidth: action.payload.width,
                areaHeight: action.payload.height
            }
            break;
    }

    return state;
}

export default AlgorithmReducer;
