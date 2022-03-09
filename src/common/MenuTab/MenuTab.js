import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import FontIcon from "../../common/FontIcon/FontIcon"

import "./MenuTab.scss"

const MenuTab = ({ selectedTab }) => {
    const history = useHistory();

    const [value, setValue] = useState(selectedTab);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log(event, "e")
    };

    //for chartsummary page
    const chartSummaryPage = () => {
        history.push("/chartsummary");
    };

    
    //for chartComparision page
    const chartComparisonPage = () => {
        history.push("/chartcomparison");
    };
 
    //for marketShare page
    const marketSharePage = () => {
        history.push("/marketshare");
    }

    //for marketShare page
    const tracksPage = () => {
        history.push("/tracks");
    };

    //for benchMark page
    const benchMarkPage = () => {
        history.push("/benchmark");
    }

     //for genre page
    const genrePage = () => {
        history.push("/genre");
    }

      //for artist page
    const artistPage = () => {
        history.push("/artists");
    }

    const competitionPage = () => {
        history.push("/competitivecomparision");
    }

    return (
        <div>
            <div className="menu-tab">
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs"
                    >
                        <Tab className="tab-summary" onClick={chartSummaryPage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="piechart"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>CHARTS SUMMARY</span>
                                </div>
                            } />
                        <Tab className="tab-comparison" onClick={chartComparisonPage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="global"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>CHART COMPARISON</span>
                                </div>
                            } />
                        {/* <Tab className="tab-performance"
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="spotify"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>SPOTIFY PERFORMANCE</span>
                                </div>
                            } /> */}
                        <Tab className="tab-share" onClick={marketSharePage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="marketshare"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>MARKET SHARE</span>
                                </div>
                            } />
                        <Tab className="tab-tracks" onClick={tracksPage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="tracks"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>TRACKS</span>
                                </div>
                            } />
                        <Tab className="tab-artists" onClick={artistPage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="artists"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>ARTISTS</span>
                                </div>
                            } />
                        <Tab className="tab-lang" onClick={genrePage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="guitar"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>GENRES, LANGUAGES & MOODS</span>
                                </div>
                            } />
                        <Tab className="tab-competitive" onClick={competitionPage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="disc"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>COMPETITIVE COMPARISON</span>
                                </div>
                            } />
                        <Tab className="tab-benchmarks" onClick={benchMarkPage}
                            label={
                                <div className="label">
                                    <FontIcon
                                        iconName="benchmarks"
                                        size="medium"
                                        color="inherit"
                                    />
                                    <span className={'tabLabel'}>BENCHMARKS</span>
                                </div>
                            } />
                    </Tabs>
                </Box>
            </div>
        </div>
    )
}

MenuTab.propTypes = {
    selectedTab: PropTypes.number
};

MenuTab.defaultProps = {
    selectedTab: null
};

export default MenuTab

