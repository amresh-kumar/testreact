/* eslint-disable complexity */
import {
    TRACK_DETAILS, TRACK_ANALYTICS, TRACK_CITY_CHART, COUNTRY_LIST, COUNTRY_SELECTED, CITY_DETAILS, ENTRY_DETAILS, EXIT_DETAILS, TOP_ARTIST_DETAILS,
    CHART_SUMMARY, PIE_CHART_SUMMARY, MARKET_CHART_ANALYTICS, BENCHMARK_TRACK_DETAILS, LANG_GENRE_MOOD_ANALYTICS,
    GENRE_LANG_DETAILS, CHART_COMPARE_DETAILS, SELECTED_COUNTRY_CHART, SELECTED_TRACK_DETAILS, ARTIST_CHART_ANALYTICS, ARTIST_DETAILS_LIST, SELECTED_ARTIST_DETAILS,
    COMP_COMPARE_CHART, COMP_COMPARE_LIST, TRACK_SPOT_MAP,
} from "../constants/ActionTypes";

const initialSettings = {
    trackDetails: [],
    trackAnalytics: null,
    trackCityAnalytics: null,
    countryDetails: [],
    countrySelected: "in",
    cityDetails: [],
    entryDetails: [],
    exitDetails: [],
    chartSummaryDetails: {},
    topArtistDetails: [],
    pieChartSummary: null,
    marketChartSummary: null,
    benchmarkTrackDetails: [],
    genrelangugaeDetails: null,
    languageGenreMoodAnalytics: null,
    chartFlagDetails: [],
    selectedFlagDetails: [],
    selectedTrackDetails: [],
    selectedArtistDetails: [],
    artistAnalyticsChart: null,
    artistDetailsList: [],
    compCompareChartDetails: null,
    compCompareChartList: [],
    trackSpotMapDetails: [],
};

// eslint-disable-next-line default-param-last
const Home = (state = initialSettings, action) => {
    switch (action.type) {
        case TRACK_DETAILS:
            return {
                ...state,
                trackDetails: action.payload
            };
        case TRACK_ANALYTICS:
            return {
                ...state,
                trackAnalytics: action.payload
            };
        case TRACK_CITY_CHART:
            return {
                ...state,
                trackCityAnalytics: action.payload
            };
        case COUNTRY_LIST:
            return {
                ...state,
                countryDetails: action.payload
            };
        case COUNTRY_SELECTED:
            return {
                ...state,
                countrySelected: action.payload
            };
        case CITY_DETAILS:
            return {
                ...state,
                cityDetails: action.payload
            };
        case ENTRY_DETAILS:
            return {
                ...state,
                entryDetails: action.payload
            };
        case EXIT_DETAILS:
            return {
                ...state,
                exitDetails: action.payload
            };
        case CHART_SUMMARY:
            return {
                ...state,
                chartSummaryDetails: action.payload
            };
        case TOP_ARTIST_DETAILS:
            return {
                ...state,
                topArtistDetails: action.payload
            };
        case PIE_CHART_SUMMARY:
            return {
                ...state,
                pieChartSummary: action.payload
            };
        case MARKET_CHART_ANALYTICS:
            return {
                ...state,
                marketChartSummary: action.payload
            };
        case BENCHMARK_TRACK_DETAILS:
            return {
                ...state,
                benchmarkTrackDetails: action.payload
            };
        case GENRE_LANG_DETAILS:
            return {
                ...state,
                genrelangugaeDetails: action.payload
            };
        case LANG_GENRE_MOOD_ANALYTICS:
            return {
                ...state,
                languageGenreMoodAnalytics: action.payload
            };
        case CHART_COMPARE_DETAILS:
            return {
                ...state,
                chartFlagDetails: action.payload
            };
        case SELECTED_COUNTRY_CHART:
            return {
                ...state,
                selectedFlagDetails: action.payload
            }; 
        case SELECTED_TRACK_DETAILS:
            return {
                ...state,
                selectedTrackDetails: action.payload
            };
        case SELECTED_ARTIST_DETAILS:
            return {
                ...state,
                selectedArtistDetails: action.payload
            }
        case ARTIST_CHART_ANALYTICS:
            return {
                ...state,
                artistAnalyticsChart: action.payload
            }
        case ARTIST_DETAILS_LIST:
            return {
                ...state,
                artistDetailsList: action.payload
            }
        case COMP_COMPARE_CHART:
            return {
                ...state,
                compCompareChartDetails: action.payload
            }
        case COMP_COMPARE_LIST:
            return {
                ...state,
                compCompareChartList: action.payload
            }
        case TRACK_SPOT_MAP:
                    return {
                        ...state,
                        trackSpotMapDetails: action.payload
                    }
        default:
            return state;
    }
};

export default Home;
