import { useState, useEffect } from "react";
import Ripples from "react-ripples";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import PropTypes from 'prop-types';

import { reduxForm, Field } from "redux-form";

import NumberFormat from 'react-number-format';

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

import { artistDetailsChart } from "../../redux/actions/Home";

import TableList from "../../common/ArtistDetailsTable/TableList/TableList";
import TableListCard from "../../common/ArtistDetailsTable/TableListCard/TableListCard";
import FontIcon from "../../common/FontIcon/FontIcon";
import Select from "../../common/form/Select/Select";
import Footer from "../../common/Footer/Footer";

import { formatDate } from "../../common/getSelectedDate";
import Dummy_img from '../../assets/images/dummy_img.png';
import ArtistDetailsMap from "../../common/ArtistDetailsMap/ArtistDetailsMap"

import "./../TrackDetails/TrackDetails.scss";
import ArtistDetailsModal from "../../common/PageInfo/ArtistDetailsModal/ArtistDetailsModal";

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



let ArtistDetails = ({ _artistDetailsChart, selectedArtistDetails, fromDateDetails, toDateDetails, countrySelected, ArtistDetailsForm }) => {

    const { name } = useParams();
    const [data, setData] = useState(true);

    const backgroundBanner = selectedArtistDetails.artist_summary && selectedArtistDetails.artist_summary[0].artist_thumbnail_url ? selectedArtistDetails.artist_summary[0].artist_thumbnail_url : Dummy_img;

    useEffect(() => {
        if (toDateDetails && countrySelected && name && ArtistDetailsForm?.values?.stream_Share_type) {
            _artistDetailsChart(toDateDetails, countrySelected, name, ArtistDetailsForm?.values?.stream_Share_type)
        }
    }, [toDateDetails && countrySelected && name && ArtistDetailsForm?.values?.stream_Share_type]);

    const positionoptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
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
            _artistDetailsChart(toDateDetails, countrySelected, name, ArtistDetailsForm?.values?.stream_Share_type)
        }
    }

    // for toggle button
    const changeData = () => {
        setData(!data)
    }

    // const divImage = {
    //     backgroundColor: "#ffffff",
    //     color: "blue"
    //   };

    return (
        <div className="trackDetails artistDetails">
            <div className="banner-wrapper" >
                <div className="track-banner" style={{ backgroundImage: `url(${backgroundBanner})` }}>
                </div>
                <div className="artist-banner-image"><img src={backgroundBanner} /></div>
                <div className="bg-overlay"></div>
            </div>

            <div className="track-information">
                {selectedArtistDetails.artist_summary &&
                    selectedArtistDetails.artist_summary.map((row, subIndex) => (
                        <div className="track-details" key={subIndex}>
                            <div className="track-top-details">
                                <div className="top-details track-name">
                                    <div className="header-text"> <EllipsisToolTip className="title" options={ellipsisOptions}>{row.artist_name}</EllipsisToolTip></div>
                                </div>
                                <div className="top-details track-position">
                                    <div className="header-text "><div># of Tracks</div>{row.track_count}</div>
                                </div>
                                <div className="top-details position-change">
                                    <div className="header-text"><div>Average Streams</div><NumberFormat displayType={'text'} value={row.avg_streams} thousandSeparator={true} /></div>
                                </div>
                                <div className="top-details streams">
                                    <div className="header-text"><div>Streams</div><NumberFormat displayType={'text'} value={row.streams} thousandSeparator={true} /></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="page-header">
                <div className="title-label">
                    <div className="title-detail">Artist Details</div>
                    <ArtistDetailsModal />
                </div>
            </div>
            <div className="landing-wrapper">
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
                                        selectedArtistDetails.track_position && (
                                            <Line height={450}
                                                data={selectedArtistDetails.track_position}
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
                                        selectedArtistDetails.stream_volume && (
                                            <Line height={300}
                                                width={600}
                                                data={selectedArtistDetails.stream_volume}
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
                                        selectedArtistDetails.stream_share && (
                                            <Line height={300}
                                                width={400}
                                                data={selectedArtistDetails.stream_share}
                                                options={options}
                                            />
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tablelist-header">
                    <div className="tablelist-header-title">
                        Track list as of {formatDate(fromDateDetails)} - {formatDate(toDateDetails)}
                    </div>
                    <div className="tablelist-header-contents">
                        <div className="tablelist-header-tablefilter vertical-border">
                            {data ? <Ripples> 
                                <FontIcon
                                iconName="table"
                                size="small"
                                tooltip="Table View "
                                onClick={() => changeData()}
                            /> </Ripples> : <Ripples>  <FontIcon
                                iconName="cardview"
                                size="small"
                                tooltip="Card View"
                                onClick={() => changeData()}
                            /> </Ripples> }
                        </div>
                        {/* <div className="tablelist-header-download vertical-border">
                            <FontIcon
                                iconName="download"
                                size="small"
                                tooltip="Download"
                            />
                        </div> */}
                    </div>
                </div>
                <div className="tablelist-content" style={{ display: data ? "block" : "none" }}>
                    <TableList />
                </div>
                <div className="tablelistcard-content" style={{ display: data ? "none" : "block" }} >
                    <TableListCard />
                </div>
                <ArtistDetailsMap artistName={name} />
                <Footer />
            </div>

        </div>
    )
}

ArtistDetails.propTypes = {
    _artistDetailsChart: PropTypes.func,
    selectedArtistDetails: PropTypes.instanceOf(Object),
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    ArtistDetailsForm: PropTypes.instanceOf(Object),
    data: PropTypes.string
};

ArtistDetails.defaultProps = {
    _artistDetailsChart: () => { },
    selectedArtistDetails: {},
    fromDateDetails: "",
    toDateDetails: " ",
    countrySelected: " ",
    ArtistDetailsForm: {},
    data: " "
};

const mapDispatchToProps = {
    _artistDetailsChart: artistDetailsChart
};

const mapStateToProps = ({ Common, Home, form }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { selectedArtistDetails, countrySelected } = Home;

    const { ArtistDetailsForm } = form;
    const initialValues = {
        stream_Share_type: streamDetails.length > 0 && streamDetails[0].id,
    }
    return { selectedArtistDetails, fromDateDetails, toDateDetails, countrySelected, initialValues, ArtistDetailsForm };
};

ArtistDetails = reduxForm({
    form: "ArtistDetailsForm",
    enableReinitialize: true
})(ArtistDetails);


export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);