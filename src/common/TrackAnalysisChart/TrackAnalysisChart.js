/* eslint-disable semi-spacing */
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { trackChart, trackTableList } from "../../redux/actions/Home";
import { reduxForm, Field } from "redux-form";
import Select from "../form/Select/Select";
import "./TrackAnalysisChart.scss"

import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-moment';

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
const trackLabels = [
    {
        id: "summary",
        name: "Chart Total"
    },
    {
        id: "parent_label",
        name: "Parent Labels"
    },
    {
        id: "repertoire",
        name: "Local vs International"
    },
    {
        id: "rank",
        name: "Rank Category"
    }
]


let TrackAnalysisChart = ({ _trackChart, _trackTableList, fromDateDetails, toDateDetails, trackAnalytics, countrySelected, TrackAnalysisChartForm, handleTrackDate, handleTrackGroup, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData, change }) => {


    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected !== "") {
            _trackChart(fromDateDetails, toDateDetails, countrySelected, "All", "tracks", "parent_label");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            change(`tracktype`, "All");
            change(`type`, "tracks");
            change(`tracklabels`, "parent_label");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);


    const handleTrackAnalysisChart = (e) => {
        if (e.target.name === "tracktype") {
            _trackChart(fromDateDetails, toDateDetails, countrySelected, e.target.value, TrackAnalysisChartForm?.values?.type, TrackAnalysisChartForm?.values?.tracklabels, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
            _trackTableList(fromDateDetails, toDateDetails, countrySelected, chartLabData, chartRepData, chartGenData, chartLanData, chartModData, chartRanData, e.target.value, chartOrcData);
        }
        if (e.target.name === "type") {
            _trackChart(fromDateDetails, toDateDetails, countrySelected, TrackAnalysisChartForm?.values?.tracktype, e.target.value, TrackAnalysisChartForm?.values?.tracklabels, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "tracklabels") {
            _trackChart(fromDateDetails, toDateDetails, countrySelected, TrackAnalysisChartForm?.values?.tracktype, TrackAnalysisChartForm?.values?.type, e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
    }
    const trackGroup = TrackAnalysisChartForm?.values?.tracklabels
    handleTrackGroup(trackGroup)

    const options = {
        onClick: (event, ele) => {
            const chartDate = trackAnalytics.labels[ele[0].index];
            const chartData = trackAnalytics.datasets[ele[0].datasetIndex].label;
            handleTrackDate(chartDate);

            if (TrackAnalysisChartForm?.values?.tracklabels === "parent_label") {
                _trackTableList("", chartDate, countrySelected, chartData)

            }
            else if (TrackAnalysisChartForm?.values?.tracklabels === "repertoire") {
                _trackTableList("", chartDate, countrySelected, "", chartData)
            }
            else if (TrackAnalysisChartForm?.values?.tracklabels === "rank") {
                _trackTableList("", chartDate, countrySelected, "", "", "", "", "", chartData)

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
    return (
        <div className="chart-wrapper">
            <div className="chart-filter">
                <div className="chart-title">Track Analysis</div>
                <div className="filter">
                    <div className="view">Select View</div>
                    <Field
                        component={Select}
                        name="tracktype"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackTypes}
                        onChange={handleTrackAnalysisChart}
                    />
                    <Field
                        component={Select}
                        name="type"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={types}
                        onChange={handleTrackAnalysisChart}

                    />
                    <Field
                        component={Select}
                        name="tracklabels"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackLabels}
                        onChange={handleTrackAnalysisChart}
                    />
                </div>
            </div>
            <div>
                {
                    trackAnalytics && (
                        <Line
                            height={350}
                            width={600}
                            data={trackAnalytics}
                            options={options}
                        />
                    )
                }
            </div>
        </div>
    );
}

TrackAnalysisChart.propTypes = {
    _trackChart: PropTypes.func,
    handleTrackDate: PropTypes.func,
    handleTrackGroup: PropTypes.func,
    _trackTableList: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    trackAnalytics: PropTypes.instanceOf(Object),
    countrySelected: PropTypes.string,
    TrackAnalysisChartForm: PropTypes.object,
    chartLabData: PropTypes.string,
    chartGenData: PropTypes.string,
    chartLanData: PropTypes.string,
    chartModData: PropTypes.string,
    chartRepData: PropTypes.string,
    chartRanData: PropTypes.string,
    chartOrcData: PropTypes.bool,
    change: PropTypes.func,
};

TrackAnalysisChart.defaultProps = {
    _trackChart: () => { },
    handleTrackDate: () => { },
    _trackTableList: () => { },
    handleTrackGroup: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    trackAnalytics: {},
    countrySelected: "",
    TrackAnalysisChartForm: {},
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
    _trackChart: trackChart,
    _trackTableList: trackTableList

};

const mapStateToProps = ({ Common, Home, form }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { trackAnalytics, countrySelected } = Home;
    const { TrackAnalysisChartForm } = form;


    const initialValues = {
        tracktype: trackTypes.length > 0 && trackTypes[0].id,
        type: types.length > 0 && types[0].id,
        tracklabels: trackLabels.length > 0 && trackLabels[1].id
    }

    return { trackAnalytics, initialValues, fromDateDetails, toDateDetails, countrySelected, TrackAnalysisChartForm };
};

TrackAnalysisChart = reduxForm({
    form: "TrackAnalysisChartForm",
    enableReinitialize: true
})(TrackAnalysisChart);

export default connect(mapStateToProps, mapDispatchToProps)(TrackAnalysisChart);