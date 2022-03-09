/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */

// import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { useHistory, useParams } from "react-router-dom";

import { cityChartCompare } from "../../redux/actions/Home"

import CityChartCompareTable from "../../common/CityChartCompareTable/CityChartCompareTable";
import PageFilter from "../../common/PageFilter/PageFilter";
import PageBanner from "../../common/PageBanner/PageBanner";
import MenuTab from "../../common/MenuTab/MenuTab";
import Footer from "../../common/Footer/Footer";

import WorldWide from "../../assets/images/flags/worldwideglobe.svg";

import "../ChartComaparison/ChartComaparison.scss"
import { flagImages } from "../../common/Flagimages";



const CityChartComparison = ({ _cityChartCompare }) => {

    const history = useHistory();
    const selectedCountry = useParams().country;
    const CountryId = useParams().id;
    
    const handleOrchard = (fromDate, toDate, selectedCountryId, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
    };

    const handleLabData = (dataLab, fromDate, toDate, selectedCountryId, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleGenData = (dataGen, fromDate, toDate, selectedCountryId, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleLanData = (dataLan, fromDate, toDate, selectedCountryId, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
    };

    const handleModData = (dataMod, fromDate, toDate, selectedCountryId, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
    };

    const handleRepData = (dataRep, fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
    };

    const handleRanData = (dataRan, fromDate, toDate, selectedCountryId, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
    };
    const handleLabReset = (nullLab, fromDate, toDate, selectedCountryId, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleGenReset = (nullGen, fromDate, toDate, selectedCountryId, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleLanReset = (nullLan, fromDate, toDate, selectedCountryId, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
    };

    const handleModReset = (nullMod, fromDate, toDate, selectedCountryId, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
    };

    const handleRepReset = (nullRep, fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
    };

    const handleRanReset = (nullRan, fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _cityChartCompare(fromDate, toDate, selectedCountryId, labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
    };

       //for tab
   const selectedTab = 1;


    return (
        <div className="chart-comparision-page city-chart-cmparision">
            <PageBanner />
            <div className="chart-comparision-wrapper">
            <PageFilter
                    handleLabData={handleLabData}
                    handleOrchard={handleOrchard}
                    handleGenData={handleGenData}
                    handleLanData={handleLanData}
                    handleModData={handleModData}
                    handleRepData={handleRepData}
                    handleRanData={handleRanData}
                    handleLabReset={handleLabReset}
                    handleGenReset={handleGenReset}
                    handleLanReset={handleLanReset}
                    handleModReset={handleModReset}
                    handleRepReset={handleRepReset}
                    handleRanReset={handleRanReset}
                />
                <MenuTab selectedTab={selectedTab} />
                <div className="page-header">
                    <div className="page-header-wrapper">
                    <div className="country-flag">
                        <img src={flagImages[CountryId]} alt="country-flag"/>
                    </div>
                    <div className="title-label">
                        <div className="title">{selectedCountry} Top 200 Chart Positions</div>
                    </div>
                    </div>

                    <div className="title-label">
                    <div className="worldwide-flag">
                        <img src={WorldWide} alt="worldwideflag"/>
                    </div>
                        <div className="title"  onClick={() => history.push('/chartcomparison')} role="presentation">Global Top 200</div>
                    </div>
                </div>
                {/* <MultiLineAxisChart /> */}
                <CityChartCompareTable/>
                <Footer />
            </div>
        </div>
    )
}

CityChartComparison.propTypes = {
    _cityChartCompare: PropTypes.func
};

CityChartComparison.defaultProps = {
    _cityChartCompare: () => {}
};

const mapDispatchToProps = {
    _cityChartCompare: cityChartCompare
};

const mapStateToProps = ({ Common }) => {
    const { fromDateDetails, toDateDetails } = Common

    return { fromDateDetails, toDateDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityChartComparison);
