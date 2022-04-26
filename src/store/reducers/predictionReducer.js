import {

    SAVE_IMAGE_URI, GET_PREDICTION_FAILED, GET_PREDICTION_LOADING, GET_PREDICTION_SUCCESS
} from '../../constants';
const initialState = {
    imageUriPath: null,
    output: {},
    outputLoading: false,
    outputError: undefined,

};
const predictionReducer = (state = initialState, action) => {
    switch (action.type) {


        case SAVE_IMAGE_URI:
            return { ...state, imageUriPath: action.payload };
        case GET_PREDICTION_LOADING:
            return { ...state, outputLoading: true, outputError: null };
        case GET_PREDICTION_SUCCESS:
            return { ...state, output: action.payload, outputLoading: false, outputError: null };
        case GET_PREDICTION_FAILED:
            return { ...state, outputLoading: false, outputError: action.error };

        default:
            return state;
    }
}
export default predictionReducer;