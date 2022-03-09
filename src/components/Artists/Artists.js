import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import PageBanner from "../../common/PageBanner/PageBanner"
import PageFilter from "../../common/PageFilter/PageFilter";
import MenuTab from "../../common/MenuTab/MenuTab";

import { formatDate } from "../../common/getSelectedDate";
import { artistChart, artistDetails } from "../../redux/actions/Home";

import ArtistsChart from "../../common/ArtistsChart/ArtistsChart";
import ArtistsTable from "../../common/ArtistsTable/ArtistsTable";
import Footer from "../../common/Footer/Footer";



import FontIcon from "../../common/FontIcon/FontIcon"

import "./Artists.scss"
import ArtistAnalysisModal from "../../common/PageInfo/ArtistAnalysisModal/ArtistAnalysisModal";

const Artists = ({ _artistChart, _artistDetails, fromDateDetails, toDateDetails }) => {

    const [selectedTrackDate, setSelectedTrackDate] = useState("");
    const [artistType, setArtistType] = useState("");

    const handleTrackDate = (chartDate) => {
        setSelectedTrackDate(chartDate)
    }

    const handleArtistType = (artistTypeValue) => {
        setArtistType(artistTypeValue)
    }

    const [chartLabData, setChartLabData] = useState();
    const [chartGenData, setChartGenData] = useState();
    const [chartLanData, setChartLanData] = useState();
    const [chartModData, setChartModData] = useState();
    const [chartRepData, setChartRepData] = useState();
    const [chartRanData, setChartRanData] = useState();
    const [chartOrcData, setChartOrcData] = useState();

    const handleOrchard = (fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
        setChartOrcData(orchardcheck)
    };
    const handleLabData = (dataLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        setChartLabData(dataLab)

    };
    const handleGenData = (dataGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
        setChartGenData(dataGen)

    };
    const handleLanData = (dataLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
        setChartLanData(dataLan)

    };
    const handleModData = (dataMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
        setChartModData(dataMod)

    };
    const handleRepData = (dataRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
        setChartRepData(dataRep)

    };
    const handleRanData = (dataRan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
        setChartRanData(dataRan)

    };
    const handleLabReset = (nullLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
        setChartLabData(nullLab)

    };
    const handleGenReset = (nullGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
        setChartGenData(nullGen)

    };
    const handleLanReset = (nullLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
        setChartLanData(nullLan)

    };
    const handleModReset = (nullMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
        setChartModData(nullMod)

    };
    const handleRepReset = (nullRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
        setChartRepData(nullRep)

    };
    const handleRanReset = (nullRan, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _artistChart(fromDate, toDate, countrySelected, "artist", "streams", "parent_label", labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
        _artistDetails(toDate, countrySelected, artistType, labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
        setChartRanData(nullRan)

    };

    //for tab
    const selectedTab = 4;

    return (
        <div className="artists-page">

            <PageBanner />

            <div className="artists-page-wrapper">

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
                        <div className="title">Artists</div>
                       <ArtistAnalysisModal/>
                    </div>
                </div>
                <ArtistsChart handleTrackDate={handleTrackDate}
                    chartLabData={chartLabData}
                    chartGenData={chartGenData}
                    chartLanData={chartLanData}
                    chartModData={chartModData}
                    chartRepData={chartRepData}
                    chartRanData={chartRanData}
                    chartOrcData={chartOrcData}
                    handleArtistType={handleArtistType}
                />
                <div className="tablelist-header">
                    <div className="tablelist-header-title">
                        <FontIcon
                            iconName="calender"
                            size="medium"
                            tooltip="calender"
                        />Artist list as of  &nbsp;{
                            selectedTrackDate.length > 0 ? <div>{formatDate(selectedTrackDate)}</div> : <div>{formatDate(fromDateDetails)} - {formatDate(toDateDetails)}</div>
                        }
                    </div>
                    <div className="tablelist-header-contents">
                        {/* <div className="tablelist-header-download vertical-border">
                            <FontIcon
                                iconName="download"
                                size="small"
                                tooltip="Download"
                            />
                        </div> */}
                    </div>
                </div>
                <ArtistsTable/>
                <Footer />
            </div>
        </div>
    )
}

Artists.propTypes = {
    _artistChart: PropTypes.func,
    _artistDetails: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
};

Artists.defaultProps = {
    _artistChart: () => { },
    _artistDetails: () => { },
    fromDateDetails: "",
    toDateDetails: ""
};

const mapDispatchToProps = {
    _artistChart: artistChart,
    _artistDetails: artistDetails
};

const mapStateToProps = ({ Common, Home }) => {
    const { fromDateDetails, toDateDetails } = Common
    const { countrySelected } = Home
    return { fromDateDetails, toDateDetails, countrySelected };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
