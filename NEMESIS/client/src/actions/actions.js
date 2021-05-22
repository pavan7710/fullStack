import {GET_USER} from './constants'
import axios from "axios"
const API = "http://localhost:9000"

export const getUser = () => async dispatch => {
    try {
        const res = await axios.get(`${API}/all`)
        dispatch({
            type : GET_USER,
            payload : res.data
        })
    } catch (error) {
        console.log(error)
    }
}