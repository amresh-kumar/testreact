/* eslint-disable prefer-destructuring */
import { useEffect } from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { topGenreLangMoodChart, trackTableList } from "../../redux/actions/Home";

import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-moment';

import Select from "../form/Select/Select";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Title);

const trackTypes = [
    {
        id: 'All',
        name: "All Tracks"
    },
    {
        id: 'New',
        name: "Track Entries"
    },
    {
        id: 'Exits',
        name: "Track Exits"
    },
    {
        id: 'Catalogue',
        name: "Catalogue"
    },
    {
        id: 'Frontline',
        name: "Frontline"

    }

]
const types = [
    {
        id: 'tracks',
        name: "No. of Tracks"
    },
    {
        id: "streams",
        name: "Total Streams"
    },
]
const genreMoodLanData = [
    {
        id: "genre",
        name: "Genre"
    },
    {
        id: "mood",
        name: "Mood"
    },
    {
        id: "language",
        name: "Language"
    },
    {
        id: "languagemood",
        name: "Language Mood"
    },
    {
        id: "languagegenre",
        name: "Language Genre"
    },
    {
        id: "moodgenre",
        name: "Mood Genre"
    },

]

let TopGenreLangMoodChart = ({ _topGenreLangMoodChart, fromDateDetails, toDateDetails, countrySelected, genrelangugaeDetails, TopGenreLangMoodChartForm, _trackTableList, handleTrackDate, handleTrackGroup, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData, change }) => {

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected !== "") {
            _topGenreLangMoodChart(fromDateDetails, toDateDetails, countrySelected, "All", "streams", "genre");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            change(`tracktype`, "All");
            change(`type`, "streams");
            change(`genreChartType`, "genre");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    const trackGroup = TopGenreLangMoodChartForm?.values?.genreChartType
    handleTrackGroup(trackGroup)

    const options = {
        onClick: (event, ele) => {
            const chartDate = genrelangugaeDetails.labels[ele[0].index];
            const chartData = genrelangugaeDetails.datasets[ele[0].datasetIndex].label;
            // console.log(genrelangugaeDetails.labels[ele[0].index])
            // console.log(genrelangugaeDetails.datasets[ele[0].datasetIndex].label)
            handleTrackDate(chartDate);
            if (TopGenreLangMoodChartForm?.values?.genreChartType === "genre") {
                _trackTableList("", chartDate, countrySelected, "", "", chartData)
            }
            else if (TopGenreLangMoodChartForm?.values?.genreChartType === "mood") {
                _trackTableList("", chartDate, countrySelected, "", "", "", "", chartData)
            }
            else if (TopGenreLangMoodChartForm?.values?.genreChartType === "language") {
                _trackTableList("", chartDate, countrySelected, "", "", "", chartData)

            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                usePointStyle: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    padding: 15
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                type: 'time',
                time: {
                    unit: "day",
                    tooltipFormat: 'MMM D',
                    unitStepSize: 1,
                    displayFormats: {
                        'day': 'MMM D'
                    }
                },
                ticks: {
                    source: 'data'
                },
            },
            y: {
                ticks: {
                    callback(value) {
                        if (value > 999 && value < 1000000) {
                            return (value / 1000).toFixed(0) + 'K';
                        }
                        else if (value >= 1000000) {
                            return (value / 1000000).toFixed(0) + 'M';
                        }
                        else if (value < 900) {
                            return value;
                        }
                        return value;
                    },
                }
            }
        }
    }
    const selectedChart = (chart, definedValue) => {
        const selected = chart?.values?.genreChartType
        switch (selected) {
            case "genre":
                return definedValue[0].name
            case "mood":
                return definedValue[1].name
            case "language":
                return definedValue[2].name
            case "languagemood":
                return definedValue[3].name
            case "languagegenre":
                return definedValue[4].name
            case "moodgenre":
                return definedValue[5].name
            default:
                return null
        }

    }
    const trackType = (e) => {
        if (e.target.name === "tracktype") {
            _topGenreLangMoodChart(fromDateDetails, toDateDetails, countrySelected, e.target.value, TopGenreLangMoodChartForm?.values?.type, TopGenreLangMoodChartForm?.values?.genreChartType, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "type") {
            _topGenreLangMoodChart(fromDateDetails, toDateDetails, countrySelected, TopGenreLangMoodChartForm?.values?.tracktype, e.target.value, TopGenreLangMoodChartForm?.values?.genreChartType, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "genreChartType") {
            _topGenreLangMoodChart(fromDateDetails, toDateDetails, countrySelected, TopGenreLangMoodChartForm?.values?.tracktype, TopGenreLangMoodChartForm?.values?.type, e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
    }


    return (
        <div className="chart-wrapper">
            <div className="chart-filter">
                <div className="chart-title">Top {selectedChart(TopGenreLangMoodChartForm, genreMoodLanData)}</div>
                <div className="filter">
                    <div className="view">Select View</div>
                    <Field
                        component={Select}
                        name="tracktype"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackTypes}
                        onChange={trackType}
                    />
                    <Field
                        component={Select}
                        name="type"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={types}
                        onChange={trackType}

                    />
                    <Field
                        component={Select}
                        name="genreChartType"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={genreMoodLanData}
                        onChange={trackType}
                    />
                </div>
            </div>
            <div className="genre-chartwrapper">
                {
                    genrelangugaeDetails && (
                        <Line
                            height={350}
                            width={600}
                            data={genrelangugaeDetails}
                            options={options}
                        />
                    )
                }
            </div>
        </div>
    )


}

TopGenreLangMoodChart.propTypes = {
    _topGenreLangMoodChart: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    genrelangugaeDetails: PropTypes.instanceOf(Object),
    TopGenreLangMoodChartForm: PropTypes.object,
    _trackTableList: PropTypes.func,
    handleTrackDate: PropTypes.func,
    handleTrackGroup: PropTypes.func,
    chartLabData: PropTypes.string,
    chartGenData: PropTypes.string,
    chartLanData: PropTypes.string,
    chartModData: PropTypes.string,
    chartRepData: PropTypes.string,
    chartRanData: PropTypes.string,
    chartOrcData: PropTypes.bool,
    change: PropTypes.func,
};

TopGenreLangMoodChart.defaultProps = {
    _topGenreLangMoodChart: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",
    genrelangugaeDetails: {},
    TopGenreLangMoodChartForm: {},
    _trackTableList: () => { },
    handleTrackDate: () => { },
    handleTrackGroup: () => { },
    chartLabData: "",
    chartGenData: "",
    chartLanData: "",
    chartModData: "",
    chartRepData: "",
    chartRanData: "",
    chartOrcData: true,
    change: () => { },

};

const mapDispatchToProps = {
    _topGenreLangMoodChart: topGenreLangMoodChart,
    _trackTableList: trackTableList,

};

const mapStateToProps = ({ Common, Home, form }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { genrelangugaeDetails, countrySelected } = Home;
    const { TopGenreLangMoodChartForm } = form;

    const initialValues = {
        tracktype: trackTypes.length > 0 && trackTypes[0].id,
        type: types.length > 0 && types[1].id,
        genreChartType: genreMoodLanData.length > 0 && genreMoodLanData[0].id,
    }
    return { genrelangugaeDetails, initialValues, fromDateDetails, toDateDetails, countrySelected, TopGenreLangMoodChartForm };
};

TopGenreLangMoodChart = reduxForm({
    form: "TopGenreLangMoodChartForm",
    enableReinitialize: true
})(TopGenreLangMoodChart);

export default connect(mapStateToProps, mapDispatchToProps)(TopGenreLangMoodChart);