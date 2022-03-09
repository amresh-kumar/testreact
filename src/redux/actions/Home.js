import {
    TRACK_DETAILS, TRACK_ANALYTICS, TRACK_CITY_CHART, COUNTRY_LIST, COUNTRY_SELECTED, CITY_DETAILS, ENTRY_DETAILS, EXIT_DETAILS, TOP_ARTIST_DETAILS,
    CHART_SUMMARY, PIE_CHART_SUMMARY, MARKET_CHART_ANALYTICS, BENCHMARK_TRACK_DETAILS, LANG_GENRE_MOOD_ANALYTICS,
    GENRE_LANG_DETAILS, CHART_COMPARE_DETAILS, SELECTED_COUNTRY_CHART, SELECTED_TRACK_DETAILS, ARTIST_CHART_ANALYTICS, ARTIST_DETAILS_LIST, SELECTED_ARTIST_DETAILS, COMP_COMPARE_CHART, COMP_COMPARE_LIST, TRACK_SPOT_MAP,
} from "../constants/ActionTypes";
import api from "./Api";
import { showProgress } from "./Common";

//get Tracks-list home page
export const trackList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getTracks?&from=${fromdate}&to=${todate}&region=${countryvalue}`)
            .then((response) => {
                dispatch({ type: TRACK_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}

//get Tracks-list tracks page
export const trackTableList = (fromdate, todate, countryvalue, labelData, repertoireData, genreData, languageData, moodData, rankData, trackType = "", orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getTracks?&from=${fromdate}&to=${todate}&region=${countryvalue}&label_value=${labelData ? labelData : ""}&repertoire=${repertoireData ? repertoireData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&rank=${rankData ? rankData : ""}&tracktype=${trackType}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: TRACK_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}

export const trackChart = (fromdate, todate, countryvalue, trackType, type, trackLabel, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getAnalytics?region=${countryvalue}&from=${fromdate}&to=${todate}&tracktype=${trackType ? trackType : ""}&type=${type ? type : ""}&groupby=${trackLabel}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: TRACK_ANALYTICS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const trackCityChart = (fromdate, todate, countryvalue, label) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getCityAnalytics?region=${countryvalue}&from=${fromdate}&to=${todate}&label=${label ? label : "SME"}`)
            .then((response) => {
                dispatch({ type: TRACK_CITY_CHART, payload: response.data })
            })
            .catch((error) => {

            });
    };
}

export const countryList = () => {

    return (dispatch) => {
        api({ contentType: true }).get(`getDropdown/country`)
            .then((response) => {
                dispatch({ type: COUNTRY_LIST, payload: response.data })
            })
            .catch((error) => {
            });
    };
}

export function countrySelected(value) {
    return (dispatch) => {
        dispatch({
            type: COUNTRY_SELECTED,
            payload: value
        });
    };
}

export const cityList = (fromdate, todate, countryvalue, cityData) => {

    return (dispatch) => {
        api({ contentType: true }).get(`getCity/?&from=${fromdate}&to=${todate}&region=${countryvalue}&city=${cityData}`)
            .then((response) => {
                dispatch({ type: CITY_DETAILS, payload: response.data })
            })
            .catch((error) => {
            });
    };
}

export const trackChartSummary = (avg, region, fromdate, todate, labelData, repertoire, genreData, languageData, moodData, rank, orchard = "true") => {
    return (dispatch) => {
        let trackChartLink = `getChartSumm/?region=${region}&from=${fromdate}&to=${todate}&total=total&label_value=${labelData ? labelData : ""}&repertoire=${repertoire ? repertoire : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&rank=${rank ? rank : ""}&orchard=${orchard}`;
        if (avg) {
            dispatch(showProgress(true));
            trackChartLink = `getChartSumm/?region=${region}&from=${fromdate}&to=${todate}&total=avg&label_value=${labelData ? labelData : ""}&repertoire=${repertoire ? repertoire : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&rank=${rank ? rank : ""}&orchard=${orchard}`;
            dispatch(showProgress(false));
        }
        api({ contentType: true }).get(trackChartLink)
            .then((response) => {
                dispatch({ type: CHART_SUMMARY, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const entryList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getChartTracks/?region=${countryvalue}&from=${fromdate}&to=${todate}&new=new`)
            .then((response) => {
                dispatch({ type: ENTRY_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}

export const exitList = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getChartTracks/?region=${countryvalue}&from=${fromdate}&to=${todate}&new=exit`)
            .then((response) => {
                dispatch({ type: EXIT_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}

export const topArtist = (fromdate, todate, countryvalue) => {

    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getTopArtist/?region=${countryvalue}&from=${fromdate}&to=${todate}`)
            .then((response) => {
                dispatch({ type: TOP_ARTIST_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}

export const marketShareChart = (fromdate, todate, countryvalue, trackType, type, trackLabel, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {

    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getMarketSharePie?from=${fromdate}&to=${todate}&region=${countryvalue}&tracktype=${trackType ? trackType : ""}&type=${type ? type : ""}&groupby=${trackLabel}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: PIE_CHART_SUMMARY, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}

export const marketTrackChart = (fromdate, todate, countryvalue, trackType, type, trackLabel, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {

        dispatch(showProgress(true));
        api({ contentType: true }).get(`getMarketAnalytics?region=${countryvalue}&from=${fromdate}&to=${todate}&total=total&tracktype=${trackType ? trackType : ""}&type=${type ? type : ""}&groupby=${trackLabel}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: MARKET_CHART_ANALYTICS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const benchMarkTrackList = (fromdate, todate, countryvalue, weekrange, minValue, maxValue, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getGenBenchmark/?region=${countryvalue}&from=${fromdate}&to=${todate}&weeks=${weekrange}&min=${minValue}&max=${maxValue}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)

            .then((response) => {
                dispatch({ type: BENCHMARK_TRACK_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}
export const genreLangMoodAnalytics = (fromdate, todate, countryvalue, trackType, type, trackLabel, chartby, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getTopGenreLangMood?region=${countryvalue}&from=${fromdate}&to=${todate}&tracktype=${trackType ? trackType : ""}&type=${type ? type : ""}&chartby=${chartby ? chartby : ""}&groupby=${trackLabel}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: LANG_GENRE_MOOD_ANALYTICS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const topGenreLangMoodChart = (fromdate, todate, countryvalue, trackType, type, chartby, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getGenreLangMoodAnalysis?region=${countryvalue}&from=${fromdate}&to=${todate}&tracktype=${trackType ? trackType : ""}&type=${type ? type : ""}&chartby=${chartby ? chartby : ""}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: GENRE_LANG_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const chartCompare = (fromdate, todate, countryvalue, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getChartCompare/?region=${countryvalue}&from=${fromdate}&to=${todate}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: CHART_COMPARE_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const cityChartCompare = (fromdate, todate, countryvalue, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getChartCompareCity/?region=${countryvalue}&from=${fromdate}&to=${todate}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: SELECTED_COUNTRY_CHART, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}


export const trackDetailsChart = (todate, countryvalue, id, streamValue) => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`/getTrackDetails/?region=${countryvalue}&to=${todate}&rank=${id}&view=${streamValue}`)
            .then((response) => {
                dispatch({ type: SELECTED_TRACK_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const artistChart = (fromdate, todate, countryvalue, artistType, type, trackLabel, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getArtistAnalytics/?region=${countryvalue}&from=${fromdate}&to=${todate}&artisttype=${artistType ? artistType : ""}&type=${type ? type : ""}&groupby=${trackLabel}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: ARTIST_CHART_ANALYTICS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const artistDetails = (todate, countryvalue, artistType, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`/getArtists/?region=${countryvalue}&to=${todate}&artisttype=${artistType ? artistType : ""}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: ARTIST_DETAILS_LIST, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

//for artists detail page
export const artistDetailsChart = (todate, countryvalue, artistname, streamValue) => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`/getArtistDetails/?region=${countryvalue}&to=${todate}&artist=${artistname}&view=${streamValue}`)
            .then((response) => {
                dispatch({ type: SELECTED_ARTIST_DETAILS, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const compCompareChart = (fromdate, todate, countryvalue, type, trackLabel, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true") => {
    return (dispatch) => {
         dispatch(showProgress(true));
        api({ contentType: true }).get(`getCCChart?region=${countryvalue}&from=${fromdate}&to=${todate}&viewby=${type ? type : ""}&groupby=${trackLabel}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: COMP_COMPARE_CHART, payload: response.data })
                 dispatch(showProgress(false));
            })
            .catch((error) => { });
    };
}

export const compCompareTable = (fromdate, todate, countryvalue, artistType, view, type, trackLabel, labelData, repertoireData, genreData, languageData, moodData, rankData, orchard = "true") => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`getCCTable?&from=${fromdate}&to=${todate}&region=${countryvalue}&type=${artistType ? artistType : ""}&view=${view ? view : ""}&viewby=${type ? type : ""}&groupby=${trackLabel}&label_value=${labelData ? labelData : ""}&repertoire=${repertoireData ? repertoireData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}`)
            .then((response) => {
                dispatch({ type: COMP_COMPARE_LIST, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {
            });
    };
}

// eslint-disable-next-line default-param-last
export const getTracksSpotMap = (fromdate, todate, countryvalue, page, label, labelData, genreData, languageData, moodData, repertoireData, rankData, orchard = "true", artist, type) => {
    return (dispatch) => {
        dispatch(showProgress(true));
        api({ contentType: true }).get(`gettrackspotmap?&from=${fromdate}&to=${todate}&region=${countryvalue}&page=${page ? page : ""}&label=${label ? label : ""}&label_value=${labelData ? labelData : ""}&genre=${genreData ? genreData : ""}&language=${languageData ? languageData : ""}&mood=${moodData ? moodData : ""}&repertoire=${repertoireData ? repertoireData : ""}&rank=${rankData ? rankData : ""}&orchard=${orchard}&artist=${artist ? artist : ""}&type=${type ? type : ""}`)
            .then((response) => {
                dispatch({ type: TRACK_SPOT_MAP, payload: response.data })
                dispatch(showProgress(false));
            })
            .catch((error) => {

            });
    };
}
