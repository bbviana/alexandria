
const initialState = false

const isFetching = (state = initialState, action) => {
    if(action.isFetching === undefined){
        return state // ignora action
    }

    return action.isFetching
}

export default isFetching