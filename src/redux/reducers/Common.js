import { SHOW_PROGRESS, WEEk_SELECTED, FROM_DATE_SELECTED, TO_DATE_SELECTED } from "../constants/ActionTypes";

const initialSettings = {
    showLoader: false,
    fromDateDetails: "",
    toDateDetails: "",
    totalWeekSelected: "",
};

// eslint-disable-next-line default-param-last
const common = (state = initialSettings, action) => {
    switch (action.type) {
        case SHOW_PROGRESS:
            return {
                ...state,
                showLoader: action.payload
            };
        case WEEk_SELECTED:
            return {
                ...state,
                totalWeekSelected: action.payload
            };
        case FROM_DATE_SELECTED:
        return {
            ...state,
            fromDateDetails: action.payload
        };
        case TO_DATE_SELECTED:
        return {
            ...state,
            toDateDetails: action.payload
        };
        default:
            return state;
    }
};

export default common;
