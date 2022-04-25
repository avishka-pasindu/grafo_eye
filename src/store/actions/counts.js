import axios from 'axios'
import {
    COUNTER_CHANGE,
    GET_SEARCHBY_CAMPAIGNS_LOADING,
    GET_SEARCHBY_CAMPAIGNS_SUCCESS,
    GET_SEARCHBY_CAMPAIGNS_FAILED,
} from '../../constants';

export function changeCount(count) {
    return {
        type: COUNTER_CHANGE,
        payload: count
    }
}

export const getAllAssesments = () => {
    return dispatch => {
        getAllAssesmentsLoading(dispatch)
        axios.get(`https://jsonplaceholder.typicode.com/todos/2`)
            .then(data => {
                console.log('Loaded ',data.data)
                getAllAssesmentsSuccess(dispatch, data.data)

            }).catch((error) => {
                getAllAssesmentsFailed(dispatch, error.response && error.response.data)
            })
    }
}

const getAllAssesmentsLoading = (dispatch) => { dispatch({ type: GET_SEARCHBY_CAMPAIGNS_LOADING }) }
const getAllAssesmentsSuccess = (dispatch, data) => { dispatch({ type: GET_SEARCHBY_CAMPAIGNS_SUCCESS, payload: data }) }
const getAllAssesmentsFailed = (dispatch, error) => { dispatch({ type: GET_SEARCHBY_CAMPAIGNS_FAILED, error }) }