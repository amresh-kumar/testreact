import { useEffect } from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { entryList, exitList, topArtist } from "../../redux/actions/Home"
import Dummy_img from '../../assets/images/dummy_img.png';
import "./LabelEntries.scss"
// import FontIcon from "../FontIcon/FontIcon";


const LabelEntries = ({ _entryList, entryDetails, _exitList, exitDetails, _topArtist, topArtistDetails, fromDateDetails, toDateDetails, countrySelected }) => {

    const carouselSettings = {
        arrows: true,
        speed: 500,
        adaptiveHeight: true,
        slidesToShow: 9,
        slidesToScroll: 9,
        infinite: false,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 8,
                }
            },
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7,
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]
    };

    // const fromDate = formatDate(fromDateDetails, "MMM DD YYYY", "YYYY-MM-DD");
    // const toDate = formatDate(toDateDetails, "MMM DD YYYY", "YYYY-MM-DD");

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _entryList(fromDateDetails, toDateDetails, countrySelected);
        }

    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _exitList(fromDateDetails, toDateDetails, countrySelected);
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _topArtist(fromDateDetails, toDateDetails, countrySelected);
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    return (
        <div>
            <div className="chart-entires entry">
                <div className="title">
                    <div className="label">Chart Entries [ {entryDetails.length} ]</div>
                </div>
                <div className="wrapper" >
                    {entryDetails && entryDetails.length > 0 && (
                        <Slider {...carouselSettings}>
                            {entryDetails.map((listel, subIndex) => (
                                <div className="artist-wrapper" key={subIndex}>
                                    <div className="thumbnail-img">
                                        {listel.thumbnail_url ? <img src={listel.thumbnail_url} alt="Thumbnail_Img" />
                                            : <img src={Dummy_img} alt="Dummy image" />
                                        }
                                        <div className="overlay"></div>
                                        <div>
                                            <div className="rank">#{listel.rank}</div>
                                            <div className="label">{listel.parent_label}</div>
                                        </div>
                                    </div>
                                    <div className="chart-desp">
                                        <div className="chart-title">{listel.track_name}</div>
                                        <div className="chart-artist">{listel.track_artist}</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
            <div className="chart-entires exit">
                <div className="title">
                    <div className="label">Exits [ {exitDetails.length} ]</div>
                </div>
                <div className="wrapper">
                    {exitDetails && exitDetails.length > 0 && (
                        <Slider {...carouselSettings}>
                            {exitDetails.map((listel, subIndex) => (
                                <div className="artist-wrapper" key={subIndex}>
                                    <div className="thumbnail-img">
                                        {listel.thumbnail_url ? <img src={listel.thumbnail_url} alt="Thumbnail_Img" />
                                            : <img src={Dummy_img} alt="Dummy image" />
                                        }
                                        <div className="overlay"></div>
                                        <div>
                                            <div className="rank">#{listel.rank}</div>
                                            <div className="label">{listel.parent_label}</div>
                                        </div>
                                    </div>
                                    <div className="chart-desp">
                                        <div className="chart-title">{listel.track_name}</div>
                                        <div className="chart-artist">{listel.track_artist}</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
            <div className="chart-entires top-artist">
                <div className="title">
                    <div className="label">Top Artists [ {topArtistDetails.length} ]</div>
                </div>
                <div className="wrapper" >
                    {topArtistDetails && topArtistDetails.length > 0 && (
                        <Slider {...carouselSettings}>
                            {topArtistDetails.map((list, subIndex) => {
                                return (
                                    <div className="artist-wrapper" key={subIndex}>
                                        <div className="thumbnail-img">
                                            {list.url ? <img src={list.url} alt="Thumbnail_Img" />
                                                : <img src={Dummy_img} alt="Dummy image" />
                                            }
                                            <div className="overlay"></div>
                                        </div>
                                        <div className="chart-desp">
                                            <div className="artist-name">{list.Artist_Name}</div>
                                        </div>
                                        <div className="artist-details">
                                            <div className="track-count"><span className="track-title">TRACKS</span><span className="count">{list.count}</span></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    )}
                </div>
            </div>
        </div>
    )
}

LabelEntries.propTypes = {
    _entryList: PropTypes.func,
    entryDetails: PropTypes.instanceOf(Object),
    _exitList: PropTypes.func,
    exitDetails: PropTypes.instanceOf(Object),
    _topArtist: PropTypes.func,
    topArtistDetails: PropTypes.instanceOf(Object),
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string
};

LabelEntries.defaultProps = {
    _entryList: () => { },
    entryDetails: [],
    _exitList: () => { },
    exitDetails: [],
    _topArtist: () => { },
    topArtistDetails: [],
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: ""
};

const mapDispatchToProps = {
    _entryList: entryList,
    _exitList: exitList,
    _topArtist: topArtist
};

const mapStateToProps = ({ Common, Home }) => {
    const { fromDateDetails, toDateDetails } = Common
    const { entryDetails, exitDetails, topArtistDetails, countrySelected } = Home;
    return { entryDetails, exitDetails, topArtistDetails, fromDateDetails, toDateDetails, countrySelected };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelEntries);
