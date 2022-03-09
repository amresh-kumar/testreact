import {  LANGUAGE_DETAILS, GENRE_DETAILS, MOOD_DETAILS, RANK_DETAILS, LABEL_DETAILS, REPERTOIRE_DETAILS } from "../constants/ActionTypes";

const initialSettings = {
    labelDetails: [],
    repertoireDetails: [],
    genreDetails: [],
    languageDetails: [],
    moodDetails: [],
    rankDetails: [],
};

// eslint-disable-next-line default-param-last
const Filter = (state = initialSettings, action) => {
    switch (action.type) {
        case LABEL_DETAILS:
            return {
                ...state,
                labelDetails: action.payload
            };
        case REPERTOIRE_DETAILS:
            return {
                ...state,
                repertoireDetails: action.payload
            };
        case GENRE_DETAILS:
            return {
                ...state,
                genreDetails: action.payload
            };
        case LANGUAGE_DETAILS:
            return {
                ...state,
                languageDetails: action.payload
            };
        case MOOD_DETAILS:
            return {
                ...state,
                moodDetails: action.payload
            };
        case RANK_DETAILS:
            return {
                ...state,
                rankDetails: action.payload
            };
        default:
            return state;
    }
};

export default Filter;
