import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { useState } from "react";

import MenuTab from "../../common/MenuTab/MenuTab"

import { marketShareChart, marketTrackChart } from "../../redux/actions/Home"

import PageBanner from "../../common/PageBanner/PageBanner"
import Footer from "../../common/Footer/Footer"
import PageFilter from "../../common/PageFilter/PageFilter"

import PieChart from "../../common/PieChart/PieChart";
import MarketShareModal from "../../common/PageInfo/MarketShareModal/MarketShareModal";
import "./MarketShare.scss"

const MarketShare = ({ _selectedWeek, _marketTrackChart, _marketShareChart, fromDateDetails, toDateDetails, }) => {

    const [chartLabData, setChartLabData] = useState();
    const [chartGenData, setChartGenData] = useState();
    const [chartLanData, setChartLanData] = useState();
    const [chartModData, setChartModData] = useState();
    const [chartRepData, setChartRepData] = useState();
    const [chartRanData, setChartRanData] = useState();
    const [chartOrcData, setChartOrcData] = useState();

    const handleOrchard = (fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
        setChartOrcData(orchardcheck)
    };
    const handleLabData = (dataLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        setChartLabData(dataLab)

    };
    const handleGenData = (dataGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
        setChartGenData(dataGen)

    };
    const handleLanData = (dataLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
        setChartLanData(dataLan)

    };
    const handleModData = (dataMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
        setChartModData(dataMod)

    };
    const handleRepData = (dataRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
        setChartRepData(dataRep)

    };
    const handleRanData = (dataRan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
        setChartRanData(dataRan)

    };
    const handleLabReset = (nullLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        setChartLabData(nullLab)

    };
    const handleGenReset = (nullGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
        setChartGenData(nullGen)

    };
    const handleLanReset = (nullLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
        setChartLanData(nullLan)

    };
    const handleModReset = (nullMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
        setChartModData(nullMod)

    };
    const handleRepReset = (nullRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
        setChartRepData(nullRep)

    };
    const handleRanReset = (nullRan, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _marketShareChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
        _marketTrackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
        setChartRanData(nullRan)

    };

    const selectedTab = 2;
    return (
        <div className="market-share">
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
                        <div className="title">Market Share - Stream Based</div>
                        <MarketShareModal />
                    </div>
                </div>
                <PieChart chartLabData={chartLabData}
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

MarketShare.propTypes = {
    _selectedWeek: PropTypes.func,
    totalWeekSelected: PropTypes.string,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    _marketShareChart: PropTypes.func,
    _marketTrackChart: PropTypes.func,
};

MarketShare.defaultProps = {
    _selectedWeek: () => { },
    totalWeekSelected: "",
    fromDateDetails: "",
    toDateDetails: " ",
    _marketShareChart: () => { },
    _marketTrackChart: () => { },
};

const mapDispatchToProps = {
    _marketShareChart: marketShareChart,
    _marketTrackChart: marketTrackChart,
    // _selectedWeek: selectedWeek
};

const mapStateToProps = ({ Common }) => {
    const { totalWeekSelected, fromDateDetails, toDateDetails } = Common
    return { totalWeekSelected, fromDateDetails, toDateDetails };
};


export default connect(mapStateToProps, mapDispatchToProps)(MarketShare);