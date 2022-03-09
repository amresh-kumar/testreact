/* eslint-disable semi-spacing */
import { useEffect } from "react";
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
import { Bar, Line } from 'react-chartjs-2'

// import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { reduxForm, Field } from "redux-form";
import { formatDate } from "../../common/getSelectedDate";
import { marketShareChart, marketTrackChart } from "../../redux/actions/Home";

import FontIcon from "../../common/FontIcon/FontIcon"
import Select from "../form/Select/Select";
import "./PieChart.scss"

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
        name: "Track Exit"
    },
    {
        id: 'Debut',
        name: "Debut Artist"
    },
    {
        id: 'Breakthrough',
        name: "Breakthrough Artist"
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
const trackLabels = [
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

let PieChart = ({ _marketShareChart, _marketTrackChart, fromDateDetails, toDateDetails, countrySelected, PieChartForm, pieChartSummary, marketChartSummary, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData, change }) => {


    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _marketShareChart(fromDateDetails, toDateDetails, countrySelected, "All", "streams", "parent_label",)
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _marketTrackChart(fromDateDetails, toDateDetails, countrySelected, "All", "streams", "parent_label",);
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            change(`tracktype`, "All");
            change(`tracklabels`, "parent_label");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);


    //for pie chart
    // const pieData = [
    //     ['Labels', 'Hours per Day'],
    //     ['Sony Music', 25],
    //     ['Universal', 15],
    //     ['Warner Music', 10],
    //     ['Indies', 40]
    //   ]

    //   const Areadata = [
    //     ['Week-on-week trend', 'Sony Music', 'Universal', 'Warner Music', 'Indies'],
    //     ['2013',  1000,      400, 600, 800],
    //     ['2014',  1170,      460, 900, 700],
    //     ['2015',  660,       1120, 200, 100],
    //     ['2016',  1030,      540, 800, 400]
    //   ]

    // const pieOptions = {
    //     pieHole: 0.5,
    //     colors: ['#CFCFD0', '#F76161', '#FBBC67', '#4FB4FE'],
    //     legend: { 'position': 'none', 'alignment': 'center' },
    //     chartArea: {
    //         left: 0,
    //         bottom: 50,
    //         width: "100%",
    //         height: "80%",
    //         position: 'center'
    //     }
    // }

    // const AreadataOptions = {
    //     hAxis: { title: 'Week-on-week trend', titleTextStyle: { color: '#333' } },
    //     colors: ['#CFCFD0', '#F76161', '#FBBC67', '#4FB4FE'],
    //     legend: { position: 'none' },
    //     vAxis: { minValue: 0 },
    //     chartArea: {
    //         left: 50,
    //         bottom: 50,
    //         width: "85%",
    //         height: "80%",
    //         position: 'center'
    //     }
    // };

    const handleMarketChart = (e) => {
        if (e.target.name === "tracktype") {
            _marketShareChart(fromDateDetails, toDateDetails, countrySelected, e.target.value, "streams", PieChartForm?.values?.tracklabels, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData)
            _marketTrackChart(fromDateDetails, toDateDetails, countrySelected, e.target.value, "streams", PieChartForm?.values?.tracklabels, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "tracklabels") {
            _marketShareChart(fromDateDetails, toDateDetails, countrySelected, PieChartForm?.values?.tracktype, "streams", e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData)
            _marketTrackChart(fromDateDetails, toDateDetails, countrySelected, PieChartForm?.values?.tracktype, "streams", e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
    }

    const options = {
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
                        else if (value >= 100 && value < 900) {
                            return value.toFixed(0);
                        }
                        else if (value < 100) {
                            return value.toFixed(0) + "%";
                        }
                        return value;
                    },
                }
            }
        },
    }

    const stackoptions = {
        display: false,
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
            legend: {
                usePointStyle: true,
                position: 'bottom',
                align: 'end',
                display: false
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                }
            },
            y: {
                stacked: true,
            }
        }
    }

    //   const data = {
    //     maintainAspectRatio: pieChartSummary,
    //     responsive: false,
    //     labels: pieChartSummary.labels,
    //     backgroundColor: pieChartSummary.backgroundColor, 
    //     datasets: [
    //       {
    //         data: pieChartSummary.data,
    //       }
    //     ]
    //   };

    return (
        <div className="pie-chart-wrapper">
            <div className="chart-filter">
                <div className="chart-title"> <FontIcon iconName="calender" size="medium" />
                    <div>
                        Market Share as {formatDate(fromDateDetails)} - {formatDate(toDateDetails)}
                    </div>
                </div>
                <div className="filter">
                    <div className="view">Select View</div>
                    <Field
                        component={Select}
                        name="tracktype"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackTypes}
                        onChange={handleMarketChart}
                    />
                    <Field
                        component={Select}
                        name="tracklabels"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackLabels}
                        onChange={handleMarketChart}
                    />
                </div>
            </div>
            <div className="pie-line-chart">
                <div className="pie-chart">
                    {
                        pieChartSummary && (
                            <Bar
                                height={350}
                                width={600}
                                data={pieChartSummary}
                                options={stackoptions}
                            />
                        )
                    }
                </div>
                <div className="line-chart">
                    {
                        marketChartSummary && (
                            <Line height={350}
                                width={600}
                                data={marketChartSummary}
                                options={options}
                            />
                        )}
                </div>
            </div>
            {/* <div className="pie-chart-label">
                <div className="sme-label chart-label">
                    <div></div> Sony Music
                </div>
                <div className="umg-label chart-label">
                    <div></div> Universal Music
                </div>
                <div className="wmg-label chart-label">
                    <div></div> Warner Music
                </div>
                <div className="indie-label chart-label">
                    <div></div> Indie
                </div>
            </div> */}
        </div>
    );
}

PieChart.propTypes = {
    _marketShareChart: PropTypes.func,
    _marketTrackChart: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    PieChartForm: PropTypes.instanceOf(Object),
    pieChartSummary: PropTypes.instanceOf(Object),
    marketChartSummary: PropTypes.instanceOf(Object),
    countrySelected: PropTypes.string,
    chartLabData: PropTypes.string,
    chartGenData: PropTypes.string,
    chartLanData: PropTypes.string,
    chartModData: PropTypes.string,
    chartRepData: PropTypes.string,
    chartRanData: PropTypes.string,
    chartOrcData: PropTypes.bool,
    change: PropTypes.func,
};

PieChart.defaultProps = {
    _marketShareChart: () => { },
    _marketTrackChart: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    PieChartForm: {},
    pieChartSummary: {},
    marketChartSummary: {},
    countrySelected: " ",
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
    _marketShareChart: marketShareChart,
    _marketTrackChart: marketTrackChart
};

const mapStateToProps = ({ Home, Common, form }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { pieChartSummary, marketChartSummary, countrySelected } = Home;
    const { PieChartForm } = form;
    const initialValues = {
        tracktype: trackTypes.length > 0 && trackTypes[0].id,
        tracklabels: trackLabels.length > 0 && trackLabels[0].id
    }
    return { fromDateDetails, toDateDetails, pieChartSummary, marketChartSummary, countrySelected, initialValues, PieChartForm };
};

PieChart = reduxForm({
    form: "PieChartForm",
    enableReinitialize: true
})(PieChart);

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);