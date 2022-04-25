import axios from 'axios'
import {

    SAVE_IMAGE_URI

} from '../../constants';



export const saveImageURI = (uri) => {
    console.log('started to execute action', uri)
    return dispatch => {

        saveURI(dispatch, uri)
        console.log('save image uri action called ...', uri)


    }
}


const saveURI = (dispatch, data) => { dispatch({ type: SAVE_IMAGE_URI, payload: data }) }
