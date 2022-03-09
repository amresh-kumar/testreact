import { LABEL_DETAILS, REPERTOIRE_DETAILS, GENRE_DETAILS, LANGUAGE_DETAILS, MOOD_DETAILS, RANK_DETAILS } from "../constants/ActionTypes";
import api from "./Api";

export const labelList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getDropdown/label/?&from=${fromdate}&to=${todate}&region=${countryvalue}`)
            .then((response) => {
                dispatch({ type: LABEL_DETAILS, payload: response.data })
            })
            .catch((error) => {
            });
    };
}

export const repertoireList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getDropdown/repertoire/?&from=${fromdate}&to=${todate}&region=${countryvalue}`)
            .then((response) => {
                dispatch({ type: REPERTOIRE_DETAILS, payload: response.data })
            })
            .catch((error) => {
            });
    };
}

export const genreList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getDropdown/genre/?&from=${fromdate}&to=${todate}&region=${countryvalue}`)
            .then((response) => {
                dispatch({ type: GENRE_DETAILS, payload: response.data })
            })
            .catch((error) => {
            });
    };
}

export const languageList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getDropdown/language/?&from=${fromdate}&to=${todate}&region=${countryvalue}`)
            .then((response) => {
                dispatch({ type: LANGUAGE_DETAILS, payload: response.data })
            })
            .catch((error) => {
            });
    };
}

export const moodList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getDropdown/mood/?&from=${fromdate}&to=${todate}&region=${countryvalue}`)
            .then((response) => {
                dispatch({ type: MOOD_DETAILS, payload: response.data })
            })
            .catch((error) => {
            });
    };
}

export const rankList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getDropdown/category/?&from=${fromdate}&to=${todate}&region=${countryvalue}`)
            .then((response) => {
                dispatch({ type: RANK_DETAILS, payload: response.data })
            })
            .catch((error) => {
            });
    };
}