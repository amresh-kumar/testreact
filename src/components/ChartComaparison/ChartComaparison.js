
// import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import MenuTab from "../../common/MenuTab/MenuTab";

import PageBanner from "../../common/PageBanner/PageBanner"

import PageFilter from "../../common/PageFilter/PageFilter";
import Footer from "../../common/Footer/Footer"

import ChartCompareTable from "../../common/ChartCompareTable/ChartCompareTable";

import { chartCompare } from "../../redux/actions/Home"

import WorldWide from "../../assets/images/flags/worldwideglobe.svg";

import "./ChartComaparison.scss"
import ChartComparisonModal from "../../common/PageInfo/ChartComparisonModal/ChartComparisonModal";

const ChartComaparison = ({ _chartCompare }) => {

 
    const handleOrchard = (fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
    };

    const handleLabData = (dataLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleGenData = (dataGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleLanData = (dataLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
    };

    const handleModData = (dataMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
    };

    const handleRepData = (dataRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
    };

    const handleRanData = (dataRan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
    };
    const handleLabReset = (nullLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleGenReset = (nullGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleLanReset = (nullLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
    };

    const handleModReset = (nullMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
    };

    const handleRepReset = (nullRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
    };

    const handleRanReset = (nullRan, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _chartCompare(fromDate, toDate, countrySelected, "All", "tracks", labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
    };

       //for tab
   const selectedTab = 1;

    return (
        <div className="chart-comparision-page">
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
                <MenuTab selectedTab={selectedTab}/>
                <div className="page-header">
                    <div className="worldwide-flag">
                        <img src={WorldWide} alt="worldwideflag"/>
                    </div>
                    <div className="title-label">
                        <div className="title">Global Top 200: Asia Chart Positions</div>
                       <ChartComparisonModal />
                    </div>
                </div>
                {/* <MultiLineAxisChart /> */}
                <ChartCompareTable/>
                <Footer />
            </div>
        </div>
    )
}

ChartComaparison.propTypes = {
    _chartCompare: PropTypes.func
};

ChartComaparison.defaultProps = {
    _chartCompare: () => {}
};

const mapDispatchToProps = {
    _chartCompare: chartCompare
};

const mapStateToProps = ({ Common }) => {
    const { fromDateDetails, toDateDetails } = Common

    return { fromDateDetails, toDateDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartComaparison);
