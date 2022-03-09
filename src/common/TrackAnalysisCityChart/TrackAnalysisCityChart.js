/* eslint-disable semi-spacing */
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { trackCityChart, cityList } from "../../redux/actions/Home";

import { reduxForm, Field } from "redux-form";
import Select from "../form/Select/Select";
import "./TrackAnalysisCityChart.scss"

import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-moment';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Title);

const labelList = [
    {
        id: 'SME',
        name: "Sony Music"
    },
    {
        id: 'UMG',
        name: "Universal Music"
    },
    {
        id: 'WMG',
        name: "Warner Music"
    },
    {
        id: 'Indie',
        name: "Indie"
    }
]

const options = {
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
            reversed: true,
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

        }
    }
}

let TrackAnalysisCityChart = ({ _trackCityChart, fromDateDetails, toDateDetails, trackCityAnalytics, countrySelected, _cityList, cityDetails, TrackAnalysisCityChartForm }) => {


    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected !== "") {
            _trackCityChart(fromDateDetails, toDateDetails, countrySelected, "SME");
            // _cityList(fromDateDetails, toDateDetails, countrySelected, "");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    const trackType = (e) => {
        if (e.target.name === "cityName") {
            _trackCityChart(fromDateDetails, toDateDetails, countrySelected, e.target.value);
        }
        if (e.target.name === "b") {
            _cityList(fromDateDetails, toDateDetails, countrySelected, e.target.value);
        }
    }

    const selectedCity = (city, definedValue) => {
        const selected = city?.values?.cityName
        switch (selected) {
            case "SME":
                return definedValue[0].name
            case "UMG":
                return definedValue[1].name
            case "WMG":
                return definedValue[2].name
            case "Indie":
                return definedValue[3].name
            default:
                return null
        }
    }
    return (
        <div className="chart-wrapper city-chart-wrapper">
            <div className="chart-filter">
                <div className="chart-title">Cities chart share: {selectedCity(TrackAnalysisCityChartForm, labelList)}</div>
                <div className="filter">
                    <Field
                        component={Select}
                        name="cityName"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={labelList}
                        onChange={trackType}
                    />
                    {/* <Field
                        component={Select}
                        name="b"
                        optionValueKey="city_id"
                        optionLabelKey="city_name"
                        optionData={cityDetails}
                        onChange={trackType}
                    /> */}
                </div>
            </div>
            <div>
                {
                    trackCityAnalytics && (
                        <Line
                            height={350}
                            width={600}
                            data={trackCityAnalytics}
                            options={options}
                        />
                    )
                }
            </div>
        </div>
    );
}

TrackAnalysisCityChart.propTypes = {
    _trackCityChart: PropTypes.func,
    trackCityAnalytics: PropTypes.instanceOf(Object),
    countrySelected: PropTypes.string,
    TrackAnalysisCityChartForm: PropTypes.object,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    _cityList: PropTypes.func,
    cityDetails: PropTypes.array,


};

TrackAnalysisCityChart.defaultProps = {
    _trackCityChart: () => { },
    trackCityAnalytics: {},
    countrySelected: "",
    TrackAnalysisCityChartForm: {},
    fromDateDetails: "",
    toDateDetails: "",
    _cityList: () => { },
    cityDetails: [],

};

const mapDispatchToProps = {
    _trackCityChart: trackCityChart,
    _cityList: cityList,
};

const mapStateToProps = ({ Home, form, Common }) => {
    const { fromDateDetails, toDateDetails } = Common;

    const { trackCityAnalytics, countrySelected, cityDetails } = Home;
    const { TrackAnalysisCityChartForm } = form;

    const initialValues = {
        cityName: labelList.length > 0 && labelList[0].id,
        // b: cityDetails.length > 0 && cityDetails[1].city_id,
    }

    return { trackCityAnalytics, initialValues, fromDateDetails, toDateDetails, countrySelected, cityDetails, TrackAnalysisCityChartForm };
};

TrackAnalysisCityChart = reduxForm({
    form: "TrackAnalysisCityChartForm",
    enableReinitialize: true
})(TrackAnalysisCityChart);

export default connect(mapStateToProps, mapDispatchToProps)(TrackAnalysisCityChart);
