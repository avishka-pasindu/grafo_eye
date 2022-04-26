import axios from 'axios'
import {

    SAVE_IMAGE_URI, GET_PREDICTION_FAILED, GET_PREDICTION_LOADING, GET_PREDICTION_SUCCESS

} from '../../constants';



export const saveImageURI = (uri) => {
    console.log('started to execute action', uri)
    return dispatch => {

        saveURI(dispatch, uri)
        console.log('save image uri action called ...', uri)


    }
}

export const getPrediction = () => {
    console.log('hello')
    return dispatch => {
        console.log('hello2')
        getPredictionLoading(dispatch)
        console.log('hello3')
        axios.get(`http://10.0.2.2:5000/`)
            .then(data => {
                console.log('Loaded  ', data.data)
                getPredictionSuccess(dispatch, data.data)

            }).catch((error) => {
                console.log(error)
                getPredictionFailed(dispatch, error.response && error.response.data)
            })
    }

}


const saveURI = (dispatch, data) => { dispatch({ type: SAVE_IMAGE_URI, payload: data }) }
const getPredictionLoading = (dispatch) => { dispatch({ type: GET_PREDICTION_LOADING }) }
const getPredictionSuccess = (dispatch, data) => { dispatch({ type: GET_PREDICTION_SUCCESS, payload: data }) }
const getPredictionFailed = (dispatch, error) => { dispatch({ type: GET_PREDICTION_FAILED, error }) }

