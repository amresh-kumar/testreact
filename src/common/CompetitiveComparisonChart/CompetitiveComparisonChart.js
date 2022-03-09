import { useEffect } from "react";
import PropTypes from 'prop-types';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Bar } from 'react-chartjs-2'

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { compCompareChart } from "../../redux/actions/Home";

import Select from "../form/Select/Select";
import "./CompetitiveComparisonChart.scss"
import { formatDate } from "../getSelectedDate";


Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);
const trackLabels = [
    {
        id: "rank",
        name: "Rank Category"
    },
    {
        id: "repertoire",
        name: "Local vs International"
    },
    {
        id: "debut",
        name: " Debut & Breakthrough Artist"
    }
]

let CompetitiveComparisonChart = ({ _compCompareChart, fromDateDetails, toDateDetails, countrySelected, compCompareChartDetails, CompetitiveComparisonChartForm, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData, change }) => {

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected !== "") {
            _compCompareChart(fromDateDetails, toDateDetails, countrySelected, 'streams', 'rank');
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            change(`tracklabels`, "rank");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    const options = {
        display: false,
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
                }
            },
        }
    }

    const handleCompetitiveComparisonChart = (e) => {
        _compCompareChart(fromDateDetails, toDateDetails, countrySelected, "streams", e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
    }

    return (
        <div className="chart-wrapper compcompare">
            <div className="chart-filter">
                <div className="chart-title">Competitive Comparison {formatDate(fromDateDetails)} - {formatDate(toDateDetails)}</div>
                <div className="filter">
                    <div className="view">Select View</div>
                    <Field
                        component={Select}
                        name="tracklabels"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackLabels}
                        onChange={handleCompetitiveComparisonChart}
                    />
                </div>
            </div>
            <div>
                {
                    compCompareChartDetails && (
                        <Bar height={350}
                            width={600}
                            data={compCompareChartDetails}
                            options={options}
                        />
                    )}
            </div>
        </div>
    )
}

CompetitiveComparisonChart.propTypes = {
    _compCompareChart: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    compCompareChartDetails: PropTypes.instanceOf(Object),
    CompetitiveComparisonChartForm: PropTypes.object,
    chartLabData: PropTypes.string,
    chartGenData: PropTypes.string,
    chartLanData: PropTypes.string,
    chartModData: PropTypes.string,
    chartRepData: PropTypes.string,
    chartRanData: PropTypes.string,
    chartOrcData: PropTypes.string,
    change: PropTypes.func,

};

CompetitiveComparisonChart.defaultProps = {
    _compCompareChart: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",
    compCompareChartDetails: [],
    CompetitiveComparisonChartForm: {},
    chartLabData: "",
    chartGenData: "",
    chartLanData: "",
    chartModData: "",
    chartRepData: "",
    chartRanData: "",
    chartOrcData: "",
    change: () => { },
};

const mapDispatchToProps = {
    _compCompareChart: compCompareChart,
};

const mapStateToProps = ({ Common, Home, form }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { countrySelected, compCompareChartDetails } = Home;
    const { CompetitiveComparisonChartForm } = form;
    const initialValues = {
        tracklabels: trackLabels.length > 0 && trackLabels[0].id
    }

    return { initialValues, fromDateDetails, toDateDetails, countrySelected, compCompareChartDetails, CompetitiveComparisonChartForm };
};

CompetitiveComparisonChart = reduxForm({
    form: "CompetitiveComparisonChartForm",
    enableReinitialize: true
})(CompetitiveComparisonChart);

export default connect(mapStateToProps, mapDispatchToProps)(CompetitiveComparisonChart);

