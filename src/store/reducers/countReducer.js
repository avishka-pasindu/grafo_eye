import {
    COUNTER_CHANGE,
    GET_SEARCHBY_CAMPAIGNS_LOADING,
    GET_SEARCHBY_CAMPAIGNS_SUCCESS,
    GET_SEARCHBY_CAMPAIGNS_FAILED,
} from '../../constants';
const initialState = {
    count: 100,
    searchByAssesmentsLoading: false,
    searchByAssesmentsError: undefined,
    AssesmentList: {},
    pages: 'Empty',
};
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTER_CHANGE:
            return { ...state, count: action.payload };
        case GET_SEARCHBY_CAMPAIGNS_LOADING:
            return { ...state, searchByAssesmentsLoading: true, searchByAssesmentsError: null };
        case GET_SEARCHBY_CAMPAIGNS_SUCCESS:
            return { ...state, AssesmentList: action.payload,  searchByAssesmentsLoading: false, searchByAssesmentsError: null };
        case GET_SEARCHBY_CAMPAIGNS_FAILED:
            return { ...state, searchByAssesmentsLoading: false, searchByAssesmentsError: action.error };
        default:
            return state;
    }
}
export default countReducer;