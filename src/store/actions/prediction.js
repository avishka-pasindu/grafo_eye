import axios from 'axios'
import {

    SAVE_IMAGE_URI, GET_PREDICTION_FAILED, GET_PREDICTION_LOADING, GET_PREDICTION_SUCCESS, CLEAR_CURRENT_PREDICTION

} from '../../constants';



export const saveImageURI = (uri) => {
    console.log('started to execute action', uri)
    return dispatch => {

        saveURI(dispatch, uri)
        console.log('save image uri action called ...', uri)


    }
}

export const getPrediction = (file) => {

    return dispatch => {

        getPredictionLoading(dispatch)
        let config = {
            method: 'post',
            url: `http://10.0.2.2:5000/data`,
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            data: {
                filename: file

            }
        };

        axios(config)
            .then(data => {
                console.log('redux data ', data.data)
                getPredictionSuccess(dispatch, data.data)

            }).catch((error) => {
                console.log(error)
                getPredictionFailed(dispatch, error.response && error.response.data)
            })
    }

}

export const clearCurrentPrediction = () => {
    return dispatch => {
        clearPred(dispatch)
        console.log('cleared prediction from state!')
    }

}

const saveURI = (dispatch, data) => { dispatch({ type: SAVE_IMAGE_URI, payload: data }) }
const getPredictionLoading = (dispatch) => { dispatch({ type: GET_PREDICTION_LOADING }) }
const getPredictionSuccess = (dispatch, data) => { dispatch({ type: GET_PREDICTION_SUCCESS, payload: data }) }
const getPredictionFailed = (dispatch, error) => { dispatch({ type: GET_PREDICTION_FAILED, error }) }
const clearPred = (dispatch) => { dispatch({ type: CLEAR_CURRENT_PREDICTION }) }

