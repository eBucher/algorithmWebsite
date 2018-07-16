const AppInitialState = {
    pagePath: "",
}

const AppReducer = (state = AppInitialState, action) => {
    switch (action.type){
        case "SET_PAGE_PATH":
            state = {
                ...state,
                pagePath: action.payload
            }
            break;
    }

    return state;
}

export default AppReducer;
