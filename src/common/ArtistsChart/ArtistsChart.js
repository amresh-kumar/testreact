import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'

import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2'

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { artistChart, artistDetails } from "../../redux/actions/Home";

import Select from "../form/Select/Select";

import "./ArtistsChart.scss"
import { formatDate } from "../getSelectedDate";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Title);


const artistTypes = [
    {
        id: 'all',
        name: 'All'
    },
    {
        id: 'debut',
        name: "Debut Artists"
    },
    {
        id: 'breakthrough',
        name: "Breakthrough Artists"
    },
]

const types = [
    {
        id: 'tracks',
        name: "No. of Artists"
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

let ArtistsChart = ({ _artistChart, fromDateDetails, toDateDetails, countrySelected, artistAnalyticsChart, ArtistsChartForm, _artistDetails, handleTrackDate, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData, change, handleArtistType }) => {

    useEffect(() => {
        handleArtistType(ArtistsChartForm?.values?.artistType)
        if (fromDateDetails && toDateDetails && countrySelected !== "") {
            _artistChart(fromDateDetails, toDateDetails, countrySelected, 'all', 'streams', 'parent_label');
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            change(`artistType`, "all");
            change(`type`, "streams");
            change(`tracklabels`, "parent_label");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    const options = {
        onClick: (event, ele) => {
            const chartDate = artistAnalyticsChart.labels[ele[0].index];
            const chartData = artistAnalyticsChart.datasets[ele[0].datasetIndex].label;
            handleTrackDate(chartDate);

            if (ArtistsChartForm?.values?.tracklabels === "parent_label") {
                _artistDetails(chartDate, countrySelected, chartData)

            }
            else if (ArtistsChartForm?.values?.tracklabels === "repertoire") {
                _artistDetails(chartDate, countrySelected, "", "", "", "", chartData)
            }
            else if (ArtistsChartForm?.values?.tracklabels === "rank") {
                _artistDetails(chartDate, countrySelected, "", "", "", "", "", chartData)

            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    boxWidth: 15,
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                type: 'time',
                time: {
                    unit: 'day',
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
                            return value.toFixed(0);
                        }
                        return value;
                    },
                }
            }
        },
    }

    const handleArtistsChart = (e) => {
        if (e.target.name === "artistType") {
            handleArtistType(e.target.value)
            _artistChart(fromDateDetails, toDateDetails, countrySelected, e.target.value, ArtistsChartForm?.values?.type, ArtistsChartForm?.values?.tracklabels, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
            _artistDetails(toDateDetails, countrySelected, e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "type") {
            _artistChart(fromDateDetails, toDateDetails, countrySelected, ArtistsChartForm?.values?.artistType, e.target.value, ArtistsChartForm?.values?.tracklabels, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "tracklabels") {
            _artistChart(fromDateDetails, toDateDetails, countrySelected, ArtistsChartForm?.values?.artistType, ArtistsChartForm?.values?.type, e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
    }

    return (
        <div className="chart-wrapper genre">
            <div className="chart-filter">
                <div className="chart-title">Artists {formatDate(fromDateDetails)} - {formatDate(toDateDetails)}</div>
                <div className="filter">
                    <div className="view">Select View</div>
                    <Field
                        component={Select}
                        name="artistType"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={artistTypes}
                        onChange={handleArtistsChart}
                    />
                    <Field
                        component={Select}
                        name="type"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={types}
                        onChange={handleArtistsChart}
                    />
                    <Field
                        component={Select}
                        name="tracklabels"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackLabels}
                        onChange={handleArtistsChart}
                    />
                </div>
            </div>
            <div>
                {
                    artistAnalyticsChart && (
                        <Line height={350}
                            width={600}
                            data={artistAnalyticsChart}
                            options={options}
                        />
                    )}
            </div>
        </div>
    )
}

ArtistsChart.propTypes = {
    _artistChart: PropTypes.func,
    _artistDetails: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    artistAnalyticsChart: PropTypes.instanceOf(Object),
    ArtistsChartForm: PropTypes.object,
    chartLabData: PropTypes.string,
    chartGenData: PropTypes.string,
    chartLanData: PropTypes.string,
    chartModData: PropTypes.string,
    chartRepData: PropTypes.string,
    chartRanData: PropTypes.string,
    chartOrcData: PropTypes.string,
    change: PropTypes.func,
    handleTrackDate: PropTypes.func,
    handleArtistType: PropTypes.func,
};

ArtistsChart.defaultProps = {
    _artistChart: () => { },
    _artistDetails: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",
    artistAnalyticsChart: {},
    chartLabData: "",
    chartGenData: "",
    chartLanData: "",
    chartModData: "",
    chartRepData: "",
    chartRanData: "",
    chartOrcData: "",
    change: () => { },
    handleTrackDate: () => { },
    handleArtistType: () => { },
};

const mapDispatchToProps = {
    _artistChart: artistChart,
    _artistDetails: artistDetails,
};

const mapStateToProps = ({ Common, Home, form }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { countrySelected, artistAnalyticsChart } = Home;
    const { ArtistsChartForm } = form;
    const initialValues = {
        artistType: artistTypes.length > 0 && artistTypes[0].id,
        type: types.length > 0 && types[1].id,
        tracklabels: trackLabels.length > 0 && trackLabels[1].id
    }

    return { initialValues, fromDateDetails, toDateDetails, countrySelected, artistAnalyticsChart, ArtistsChartForm };
};

ArtistsChart = reduxForm({
    form: "ArtistsChartForm",
    enableReinitialize: true
})(ArtistsChart);

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsChart);

