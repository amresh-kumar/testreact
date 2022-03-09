import { useState } from "react";
import Ripples from "react-ripples";
import PropTypes from 'prop-types';
import HomeBanner from "../../common/HomeBanner/HomeBanner"
import TableList from "../../common/TableList/TableList"
import TableListCard from "../../common/TableListCard/TableListCard"
import MenuTab from "../../common/MenuTab/MenuTab"
import Footer from "../../common/Footer/Footer"
import FontIcon from "../../common/FontIcon/FontIcon"


import Spotify from "../../assets/images/svg/Spotify_Logo.svg";

import { connect } from "react-redux";
import  { formatDate }  from "../../common/getSelectedDate";

import "./Home.scss"

const Home = ({ fromDateDetails, toDateDetails }) => {

    const [data, setData] = useState(true);

    // console.log(SelectedDate, "home")
    const changeData = () => {
        setData(!data)
    }


    return (
        <div className="landing-page">
            <div className="banner-carousel">
                <HomeBanner />
                <div className="sort-date">
                    <div className="dsp">
                        <span>DSP</span>
                        <div className="spotify-logo">
                            <img src={Spotify} alt="Spotify_logo" />
                        </div>
                        <FontIcon
                            iconName="down_arrow"
                            color="white"
                        />
                    </div>
                    {/* <div className="date-sort">
                        <CalendarComponent name="14 Jan 2022 - 20 Jan 2022" />
                    </div> */}
                </div>
            </div>
            <div className="landing-wrapper">
                <div className="landing-header">
                 <div className="title">Top 200 Tracks ( {formatDate(fromDateDetails)} - {formatDate(toDateDetails)} )</div>
                </div>
                <div className="tablelist-header">
                    <div className="tablelist-header-title">
                        Top 200 Tracks
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
                <MenuTab />
                <Footer />
            </div>
        </div>
    )
}

Home.propTypes = {
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string
};

Home.defaultProps = {
    fromDateDetails: " ",
    toDateDetails: " "
};

const mapDispatchToProps = {
};

const mapStateToProps = ({ Common }) => {
    const { fromDateDetails, toDateDetails } = Common;
    return { fromDateDetails, toDateDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

