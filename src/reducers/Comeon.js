//define the initial state
const initialState = {
    username : 'Dias',
    password : 'Raphael',
    categories : [],
    status : '',
    error : '',
    streams :[],
    credentials : [],
    player:{}
}

// define a reducer with initialised state action
function Comeon(state = initialState, action){
    switch(action.type){
        case 'FETCH_REQUEST':
            const requested = Object.assign({},state,{status:action.status});
            return requested;

        case 'FETCH_SUCCESS':
            const successful =  Object.assign({},state,{status:action.status,streams:action.streams});
            return successful;

        case 'FETCH_FAILURE':
            const failed = Object.assign({}, state, {
                status: action.status,
                error: action.error
            })
            return failed;

        default:
            return state;
    }
}

export default Comeon;