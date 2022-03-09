import { SHOW_PROGRESS, WEEk_SELECTED, FROM_DATE_SELECTED, TO_DATE_SELECTED } from "../constants/ActionTypes";

export function showProgress(value = false) {
    return async (dispatch) => {
        dispatch({
            type: SHOW_PROGRESS,
            payload: value
        });
    };
}

export function selectedWeek(value) {
    return (dispatch) => {
        dispatch({
            type: WEEk_SELECTED,
            payload: value
        });
    };
}

export function fromDateSelected(value) {
    return (dispatch) => {
        dispatch({
            type: FROM_DATE_SELECTED,
            payload: value
        });
    };
}

export function toDateSelected(value) {
    return (dispatch) => {
        dispatch({
            type: TO_DATE_SELECTED,
            payload: value
        });
    };
}