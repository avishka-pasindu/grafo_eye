import {

    SAVE_IMAGE_URI
} from '../../constants';
const initialState = {
    imageUriPath: null,

};
const predictionReducer = (state = initialState, action) => {
    switch (action.type) {


        case SAVE_IMAGE_URI:

            return { ...state, imageUriPath: action.payload };

        default:
            return state;
    }
}
export default predictionReducer;