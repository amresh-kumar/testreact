import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { genreLangMoodAnalytics } from "../../redux/actions/Home";

import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import 'chartjs-adapter-moment';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box'

import Select from "../form/Select/Select";

import "./GenreStyle.scss"
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Title, BarElement);

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
const TabPanel = ({ children, value, index, ...other }) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <span>{children}</span>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

let GenreLangMoodChart = ({ _genreLangMoodAnalytics, fromDateDetails, toDateDetails, countrySelected, languageGenreMoodAnalytics, GenreLangMoodChartForm, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData, change, handleChartValue }) => {
    const [chartByValue, setchartByValue] = useState("genre")

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected !== "") {
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, "All", "streams", "parent_label", "genre");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            change(`tracktype`, "All");
            change(`type`, "streams");
            change(`tracklabels`, "parent_label");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);
   useEffect(() => {
          handleChartValue(chartByValue);
      }, [chartByValue]);

    const trackType = (e) => {
        if (e.target.name === "tracktype") {
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, e.target.value, GenreLangMoodChartForm?.values?.type, GenreLangMoodChartForm?.values?.tracklabels, chartByValue, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "type") {
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, e.target.value, GenreLangMoodChartForm?.values?.tracklabels, chartByValue, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "tracklabels") {
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, GenreLangMoodChartForm?.values?.type, e.target.value, chartByValue, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);

        }
    }

    const options = {
        display: false,
        indexAxis: 'x',
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
                stacked: true,
                grid: {
                    display: false

                },
                ticks: {
                    autoSkip: false
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
                },
                stacked: true
            }
        }
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            setchartByValue("genre")
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, GenreLangMoodChartForm?.values?.type, GenreLangMoodChartForm?.values?.tracklabels, "genre", chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);

        }
        else if (newValue === 1) {
            setchartByValue("mood")
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, GenreLangMoodChartForm?.values?.type, GenreLangMoodChartForm?.values?.tracklabels, "mood", chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);

        }
        else if (newValue === 2) {
            setchartByValue("language")
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, GenreLangMoodChartForm?.values?.type, GenreLangMoodChartForm?.values?.tracklabels, "language", chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        else if (newValue === 3) {
            setchartByValue("languagemood")
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, GenreLangMoodChartForm?.values?.type, GenreLangMoodChartForm?.values?.tracklabels, "languagemood", chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);

        }
        else if (newValue === 4) {
            setchartByValue("languagegenre")
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, GenreLangMoodChartForm?.values?.type, GenreLangMoodChartForm?.values?.tracklabels, "languagegenre", chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);

        }
        else if (newValue === 5) {
            setchartByValue("moodgenre")
            _genreLangMoodAnalytics(fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm?.values?.tracktype, GenreLangMoodChartForm?.values?.type, GenreLangMoodChartForm?.values?.tracklabels, "moodgenre", chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);

        }
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // const callBackMethod = () => {
    //     sendData(value);
    // }

    return (
        <div className="chart-wrapper genre">
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
                        name="tracklabels"
                        optionValueKey="id"
                        optionLabelKey="name"
                        optionData={trackLabels}
                        onChange={trackType}
                    />
                </div>
            </div>
            <Box sx={{ width: '100%' }}
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Genre" {...a11yProps(0)} />
                        <Tab label="Mood" {...a11yProps(1)} />
                        <Tab label="Language" {...a11yProps(2)} />
                        <Tab label="Language Genre" {...a11yProps(3)} />
                        <Tab label="Language Mood" {...a11yProps(4)} />
                        <Tab label="Mood Genre" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div>
                        {
                            languageGenreMoodAnalytics && (
                                <Bar
                                    height={500}
                                    data={languageGenreMoodAnalytics}
                                    options={options}
                                />
                            )
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        {
                            languageGenreMoodAnalytics && (
                                <Bar
                                    height={500}
                                    data={languageGenreMoodAnalytics}
                                    options={options}
                                />
                            )
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        {
                            languageGenreMoodAnalytics && (
                                <Bar
                                    height={500}
                                    data={languageGenreMoodAnalytics}
                                    options={options}
                                />
                            )
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div>
                        {
                            languageGenreMoodAnalytics && (
                                <Bar
                                    height={500}
                                    data={languageGenreMoodAnalytics}
                                    options={options}
                                />
                            )
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <div>
                        {
                            languageGenreMoodAnalytics && (
                                <Bar
                                    height={500}
                                    data={languageGenreMoodAnalytics}
                                    options={options}
                                />
                            )
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <div>
                        {
                            languageGenreMoodAnalytics && (
                                <Bar
                                    height={500}
                                    data={languageGenreMoodAnalytics}
                                    options={options}
                                />
                            )
                        }
                    </div>
                </TabPanel>
            </Box>
        </div>
    )
}

GenreLangMoodChart.propTypes = {
    _genreLangMoodAnalytics: PropTypes.func,
    handleChartValue: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    languageGenreMoodAnalytics: PropTypes.instanceOf(Object),
    GenreLangMoodChartForm: PropTypes.object,
    chartLabData: PropTypes.string,
    chartGenData: PropTypes.string,
    chartLanData: PropTypes.string,
    chartModData: PropTypes.string,
    chartRepData: PropTypes.string,
    chartRanData: PropTypes.string,
    chartOrcData: PropTypes.bool,
    change: PropTypes.func,
};

GenreLangMoodChart.defaultProps = {
    _genreLangMoodAnalytics: () => { },
    handleChartValue: () => { },

    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",
    languageGenreMoodAnalytics: {},
    GenreLangMoodChartForm: {},
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
    _genreLangMoodAnalytics: genreLangMoodAnalytics,


};

const mapStateToProps = ({ Common, Home, form }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { languageGenreMoodAnalytics, countrySelected } = Home;
    const { GenreLangMoodChartForm } = form;

    const initialValues = {
        tracktype: trackTypes.length > 0 && trackTypes[0].id,
        type: types.length > 0 && types[1].id,
        tracklabels: trackLabels.length > 0 && trackLabels[1].id,
    }

    return { languageGenreMoodAnalytics, initialValues, fromDateDetails, toDateDetails, countrySelected, GenreLangMoodChartForm };
};

GenreLangMoodChart = reduxForm({
    form: "GenreLangMoodChartForm",
    enableReinitialize: true
})(GenreLangMoodChart);

export default connect(mapStateToProps, mapDispatchToProps)(GenreLangMoodChart);