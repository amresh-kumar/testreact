import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import MenuTab from "../../common/MenuTab/MenuTab";

import { trackChartSummary, getTracksSpotMap } from "../../redux/actions/Home"

import ChartSummaryTable from "../../common/ChartSummaryTable/ChartSummaryTable"
import PageBanner from "../../common/PageBanner/PageBanner"
import LabelEntries from "../../common/LabelEntries/LabelEntries"
import Footer from "../../common/Footer/Footer"
import PageFilter from "../../common/PageFilter/PageFilter"
import ChartSummaryMap from "../../common/ChartSummaryMap/ChartSummaryMap";

import ChartSummaryModal from "../../common/PageInfo/ChartSummaryModal/ChartSummaryModal";
import "./ChartSummary.scss"


const ChartSummary = ({ _trackChartSummary, _getTracksSpotMap }) => {
    const [chartLabData, setChartLabData] = useState();
    const [chartGenData, setChartGenData] = useState();
    const [chartLanData, setChartLanData] = useState();
    const [chartModData, setChartModData] = useState();
    const [chartRepData, setChartRepData] = useState();
    const [chartRanData, setChartRanData] = useState();
    const [chartOrcData, setChartOrcData] = useState();

    const handleOrchard = (fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
        setChartOrcData(orchardcheck)
    };
    const handleLabData = (dataLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, dataLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        setChartLabData(dataLab)
    };

    const handleGenData = (dataGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, dataGen, languageData, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
        setChartGenData(dataGen)
    };
    const handleLanData = (dataLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, genreData, dataLan, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
        setChartLanData(dataLan)
    };
    const handleModData = (dataMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, genreData, languageData, dataMod, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
        setChartModData(dataMod)
    };
    const handleRepData = (dataRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, dataRep, genreData, languageData, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
        setChartRepData(dataRep)
    };
    const handleRanData = (dataRan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, genreData, languageData, moodData, dataRan, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
        setChartRanData(dataRan)
    };
    const handleLabReset = (nullLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, nullLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        setChartLabData(nullLab)
    };
    const handleGenReset = (nullGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, nullGen, languageData, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
        setChartGenData(nullGen)
    };
    const handleLanReset = (nullLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, genreData, nullLan, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
        setChartLanData(nullLan)
    };
    const handleModReset = (nullMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, genreData, languageData, nullMod, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
        setChartModData(nullMod)
    };
    const handleRepReset = (nullRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, nullRep, genreData, languageData, moodData, rankData, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
        setChartRepData(nullRep)
    };
    const handleRanReset = (nullRan, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _trackChartSummary("", countrySelected, fromDate, toDate, labelData, repertoireData, genreData, languageData, moodData, nullRan, orchard)
        _getTracksSpotMap(fromDate, toDate, countrySelected, "summary", "SME", labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
        setChartRanData(nullRan)
    };

    //for tab
    const selectedTab = 0;

    return (
        <div className="chart-summary">
            <PageBanner />
            <div className="landing-wrapper">
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
                    <div className="title-label">
                        <div className="title">Charts Summary</div>
                        <ChartSummaryModal />
                    </div>
                </div>

                <ChartSummaryTable />
                <LabelEntries />
                <ChartSummaryMap chartLabData={chartLabData}
                    chartGenData={chartGenData}
                    chartLanData={chartLanData}
                    chartModData={chartModData}
                    chartRepData={chartRepData}
                    chartRanData={chartRanData}
                    chartOrcData={chartOrcData} />
                <Footer />
            </div>

        </div>
    )
}

ChartSummary.propTypes = {
    _trackChartSummary: PropTypes.func,
    _getTracksSpotMap: PropTypes.func,
};

ChartSummary.defaultProps = {
    _trackChartSummary: () => { },
    _getTracksSpotMap: () => { },
};

const mapDispatchToProps = {
    _trackChartSummary: trackChartSummary,
    _getTracksSpotMap: getTracksSpotMap,

};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartSummary);