import {GET_USER} from  '../actions/constants'



const initialState = []
const User = (state=initialState , action) => {
    const {type , payload} = action 
    
    switch(type){
        case GET_USER : 
            return [
                ...payload
            ]
        default :
            return state
    }

}


export default User