import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { useState } from "react";

import PageBanner from "../../common/PageBanner/PageBanner"
import PageFilter from "../../common/PageFilter/PageFilter";
import MenuTab from "../../common/MenuTab/MenuTab";
import CompetitiveComparisonChart from "../../common/CompetitiveComparisonChart/CompetitiveComparisonChart";
import CompetitiveComparisonTable from "../../common/CompetitiveComparisonTable/CompetitiveComparisonTable";
import Footer from "../../common/Footer/Footer"

import { compCompareTable, compCompareChart } from "../../redux/actions/Home";

import "./CompetitiveComparision.scss"
import CompetativeModal from "../../common/PageInfo/CompetativeModal/CompetativeModal";


const CompetitiveComparision = ({ _compCompareTable, _compCompareChart }) => {

    const [chartLabData, setChartLabData] = useState();
    const [chartGenData, setChartGenData] = useState();
    const [chartLanData, setChartLanData] = useState();
    const [chartModData, setChartModData] = useState();
    const [chartRepData, setChartRepData] = useState();
    const [chartRanData, setChartRanData] = useState();
    const [chartOrcData, setChartOrcData] = useState();

    const handleOrchard = (fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck);
        setChartOrcData(orchardcheck)
    };
    const handleLabData = (dataLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', dataLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        setChartLabData(dataLab)
    };
    const handleGenData = (dataGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, dataGen, languageData, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard);
        setChartGenData(dataGen)
    };
    const handleLanData = (dataLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, genreData, dataLan, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard);
        setChartLanData(dataLan)
    };
    const handleModData = (dataMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, genreData, languageData, dataMod, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard);
        setChartModData(dataMod)
    };
    const handleRepData = (dataRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, dataRep, genreData, languageData, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, languageData, moodData, dataRep, rankData, orchard);
        setChartRepData(dataRep)
    };
    const handleRanData = (dataRan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, genreData, languageData, moodData, dataRan, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard);
        setChartRanData(dataRan)
    };
    const handleLabReset = (nullLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', nullLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        setChartLabData(nullLab)
    };
    const handleGenReset = (nullGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, nullGen, languageData, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard);
        setChartGenData(nullGen)
    };
    const handleLanReset = (nullLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, genreData, nullLan, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard);
        setChartLanData(nullLan)
    };
    const handleModReset = (nullMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, genreData, languageData, nullMod, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard);
        setChartModData(nullMod)
    };
    const handleRepReset = (nullRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, nullRep, genreData, languageData, moodData, rankData, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, languageData, moodData, nullRep, rankData, orchard);
        setChartRepData(nullRep)
    };
    const handleRanReset = (nullRan, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _compCompareTable(fromDate, toDate, countrySelected, 'All', 'tracks', 'tracks', 'genre', labelData, repertoireData, genreData, languageData, moodData, nullRan, orchard)
        _compCompareChart(fromDate, toDate, countrySelected, 'streams', 'rank', labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard);
        setChartRanData(nullRan)
    };

    //for tab
    const selectedTab = 6;

    return (
        <div className="CompetitiveComparision-page">

            <PageBanner />

            <div className="CompetitiveComparision-page-wrapper">

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
                    handleRanReset={handleRanReset} />

                <MenuTab selectedTab={selectedTab} />

                <div className="page-header">
                    <div className="title-label">
                        <div className="title">Competitive Comparison</div>
                       <CompetativeModal />
                    </div>
                </div>

                <CompetitiveComparisonChart
                    chartLabData={chartLabData}
                    chartGenData={chartGenData}
                    chartLanData={chartLanData}
                    chartModData={chartModData}
                    chartRepData={chartRepData}
                    chartRanData={chartRanData}
                    chartOrcData={chartOrcData}
                />
                <CompetitiveComparisonTable
                    chartLabData={chartLabData}
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

CompetitiveComparision.propTypes = {
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    _compCompareTable: PropTypes.func,
    _compCompareChart: PropTypes.func,
};

CompetitiveComparision.defaultProps = {
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",
    _compCompareTable: () => { },
    _compCompareChart: () => { },
};

const mapDispatchToProps = {
    _compCompareTable: compCompareTable,
    _compCompareChart: compCompareChart,
};

const mapStateToProps = ({ Common, Home }) => {
    const { fromDateDetails, toDateDetails } = Common
    const { countrySelected } = Home;



    return { fromDateDetails, toDateDetails, countrySelected };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitiveComparision);
