const AlgorithmReducer = (state =
    {
        target: null,
        elements: [],
    }
, action) => {
    switch (action.type){
        case "SET_TARGET":
            state = {
                ...state,
                target: action.payload
            }
            break;
        case "SET_ELEMENTS":
            state = {
                ...state,
                elements: action.payload
            }
            break;
    }

    return state;
}

export default BinarySearchReducer;
