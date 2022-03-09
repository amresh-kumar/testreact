import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import PropTypes from 'prop-types';

import { reduxForm, Field } from "redux-form";

import NumberFormat from 'react-number-format';
import TrackDetailsMap from "../../common/TrackDetailsMap/TrackDetailsMap"


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
import { Line } from 'react-chartjs-2'

import { trackDetailsChart } from "../../redux/actions/Home";
import { formatDate }  from "../../common/getSelectedDate";

import FontIcon from '../../common/FontIcon/FontIcon';
import Select from "../../common/form/Select/Select";
import Footer from "../../common/Footer/Footer";

import "./TrackDetails.scss"
import TrackDetailsModal from "../../common/PageInfo/TrackDetailsModal/TrackDetailsModal";

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

const streamDetails = [
    {
        id: 'top200',
        name: "Stream Share of Top 200"
    },
    {
        id: 'overall',
        name: "Stream Share of Spotify Overall"
    }
]

let TrackDetails = ({ _trackDetailsChart, selectedTrackDetails, countrySelected, TrackDetailsForm}) => {

    const { id } = useParams();
    const { date } = useParams();

    const backgroundBanner = selectedTrackDetails.track_details &&  selectedTrackDetails.track_details[0].thumbnail_url;

    useEffect(() => {
        if (date && countrySelected &&  id && TrackDetailsForm?.values?.stream_Share_type) {
            _trackDetailsChart(date, countrySelected, id, TrackDetailsForm?.values?.stream_Share_type)
        }
    }, [date && countrySelected &&  id && TrackDetailsForm?.values?.stream_Share_type]);


    const positionoptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                usePointStyle: true,
                position: 'bottom',
                align: 'center',
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
                reverse: true,
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
                        return value.toFixed(0);
                    },
                    reverse: true
                },
            }
        },
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
               
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
                    reverse: true
                },
            }       
        },
    }

    const ellipsisOptions = {
        effect: "solid",
        place: "top"
    }


    const changeEvent = (e) => {
        if (e.target.name === "stream_Share_type") {
            _trackDetailsChart(date, countrySelected, TrackDetailsForm?.values?.stream_Share_type)
        }
    }

    const trackTrends = (prev_week_rank, rank) => {
        switch (true) {
            case prev_week_rank < rank:
                return <div className="track-trend-update"> <span className="trendarrow downarrow">
                    <FontIcon iconName="uparrow" size="large" tooltip="Position Down" />
                </span> {prev_week_rank - rank}
                </div>
            case prev_week_rank > rank:
                return <div className="track-trend-update"> <span className="trendarrow uparrow">
                    <FontIcon iconName="uparrow" size="large" tooltip="Position Up" />
                </span> {prev_week_rank - rank} </div>
            case prev_week_rank === rank:
                return <div className="track-trend-update"><span className="trendarrow equal" >
                    <FontIcon iconName="minus" size="large" tooltip="Same Position" />
                </span> {prev_week_rank - rank} </div>
            default:
                return null
        }
    }

    return (
        <div className="trackDetails">
          <div className="banner-wrapper" >
                <div className="track-banner" style={{ backgroundImage: `url(${backgroundBanner})` }}>
                </div>
                <div className="artist-banner-image"><img src={backgroundBanner} /></div>
                <div className="bg-overlay"></div>
            </div>
            <div className="track-information">
                { selectedTrackDetails.track_details && (
                    selectedTrackDetails.track_details.map((row) => (
                    <div className="track-details" key={row.rank}>
                         <div className="track-top-details">
                            <div className="top-details track-name">
                                    <div className="header-text"> <EllipsisToolTip className="title" options={ellipsisOptions}>{row.track_name}</EllipsisToolTip></div>
                                    <div className="subheader-text"> {row.track_artist}</div>
                            </div>
                                <div className="top-details track-position">
                                    <div className="header-text "><div>Track Position</div>{row.rank}
                                    </div>
                                </div>
                                <div className="top-details position-change">
                                    <div className="header-text"><div>Position Change</div>{
                                        row.prev_week_rank ? <div className="track-trend">
                                            {trackTrends(row.prev_week_rank, row.rank)}
                                        </div> : <div className="track-trend"> <span className="newupdate">new</span>
                                        </div>
                                    }</div>
                                </div>
                                <div className="top-details streams">
                                    <div className="header-text"><div>Streams</div><NumberFormat  displayType={'text'} value={row.streams} thousandSeparator={true}/></div>
                                </div>
                        </div>
                        <div className="track-center-details">
                            <div>
                                <div className="bottom-details release-details">
                                    <div className="header-text">Repertoire</div>
                                    <div className="subheader-text"> {row.repertoire}</div>
                                </div>
                                <div className="bottom-details first-entry-details">
                                    <div className="header-text">Language</div>
                                    <div className="subheader-text"> {row.language}</div>
                                </div>
                                <div className="bottom-details first-entry-position">
                                    <div className="header-text">Genre</div>
                                    <div className="subheader-text"> {row.genre}</div>
                                </div>
                                <div className="bottom-details total-weeks">
                                    <div className="header-text">Mood</div>
                                    <div className="subheader-text"> {row.mood}</div>
                                </div>
                                <div className="bottom-details track-label">
                                    <div className="header-text">Parent Label</div>
                                    <div className="subheader-text"> {row.parent_label}</div>
                                </div>
                            </div>
                        </div>
                        <div className="track-center-details track-bottom-details">
                            <div>
                                <div className="bottom-details release-details">
                                    <div className="header-text">Release date</div>
                                    <div className="subheader-text"> {formatDate(row.release_date)}</div>
                                </div>
                                <div className="bottom-details first-entry-details">
                                    <div className="header-text">First entry date</div>
                                    <div className="subheader-text"> {row.first_week ? formatDate(row.first_week) : null}</div>
                                </div>
                                <div className="bottom-details first-entry-position">
                                    <div className="header-text">First entry position</div>
                                    <div className="subheader-text"> {row.first_entry_position}</div>
                                </div>
                                <div className="bottom-details total-weeks">
                                    <div className="header-text">Total weeks on chart</div>
                                    <div className="subheader-text"> {row.weeks_on_chart ? row.weeks_on_chart : 0} Weeks</div>
                                </div>
                                <div className="bottom-details track-label">
                                    <div className="header-text">Label</div>
                                    <div className="subheader-text"> <EllipsisToolTip className="title" options={ellipsisOptions}>{row.label_name}</EllipsisToolTip></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>
            <div className="landing-wrapper">
            <div className="page-header">
                    <div className="title-label">
                        <div className="title">Track Details</div>
                        <TrackDetailsModal/>
                    </div>
                </div>
            <div className="chart-wrapper">
                <div className="chart-header">
                    <div className="chart-title">Position & Trend Chart</div>
                </div>
                <div className="track-chartwrapper">
                    <div className="position-stream-chartwrapper">
                        <div className="position-chart position-trend">
                            <div className="chart-header">
                                <div className="chart-title">Track Position Trend</div>
                            </div> 
                            <div>
                            {
                                selectedTrackDetails.track_position && ( 
                                        <Line height={300}
                                            data={selectedTrackDetails.track_position}
                                            options={positionoptions}
                                        />
                                )
                            }
                            </div>   
                        </div> 
                    </div>
                    <div className="stream-share-chartwrapper">
                    <div className="position-chart stream-trend">
                            <div className="chart-header">
                                <div className="chart-title">Streaming Volume Trend</div>
                            </div>
                            <div>
                            {
                                selectedTrackDetails.stream_volume && (
                                    <Line height={300}
                                        width={600}
                                        data={selectedTrackDetails.stream_volume}
                                        options={options}
                                    />
                            )}
                            </div>
                        </div>
                        <div className="position-chart stream-share-trend">
                            <div className="chart-filter">
                                <div className="chart-title">
                                    <div>
                                    Stream Share
                                    </div>
                                </div>
                                <div className="filter">
                                        <Field
                                            component={Select}
                                            name="stream_Share_type"
                                            optionValueKey="id"
                                            optionLabelKey="name"
                                            optionData={streamDetails}
                                            onChange={changeEvent}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {
                                        selectedTrackDetails.stream_share && (
                                            <Line height={300}
                                                width={400}
                                                data={selectedTrackDetails.stream_share}
                                                options={options}
                                            />
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TrackDetailsMap rank={id} />
                <Footer />
            </div>

        </div>
    )
}

TrackDetails.propTypes = {
    _trackDetailsChart: PropTypes.func,
    selectedTrackDetails: PropTypes.instanceOf(Object),
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    TrackDetailsForm: PropTypes.instanceOf(Object),
    data: PropTypes.string
};

TrackDetails.defaultProps = {
    _trackDetailsChart: () => {},
    selectedTrackDetails: {},
    fromDateDetails: "",
    toDateDetails: " ",
    countrySelected: " ",
    TrackDetailsForm: {},
    data: " "
};

const mapDispatchToProps = {
    _trackDetailsChart: trackDetailsChart
};

const mapStateToProps = ({ Common, Home, form }) => {
    const {fromDateDetails, toDateDetails} = Common;
    const {selectedTrackDetails, countrySelected} = Home;

    const { TrackDetailsForm } = form;
    const initialValues = {
        stream_Share_type: streamDetails.length > 0 && streamDetails[0].id,
    }
    return {selectedTrackDetails, fromDateDetails, toDateDetails, countrySelected, initialValues, TrackDetailsForm};
};

TrackDetails = reduxForm({
    form: "TrackDetailsForm",
    enableReinitialize: true
})(TrackDetails);


export default connect(mapStateToProps, mapDispatchToProps)(TrackDetails);