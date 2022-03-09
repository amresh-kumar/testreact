
import { useState } from "react";
import Ripples from "react-ripples";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import MenuTab from "../../common/MenuTab/MenuTab";

import { formatDate } from "../../common/getSelectedDate";

import PageBanner from "../../common/PageBanner/PageBanner"
import PageFilter from "../../common/PageFilter/PageFilter";
import GenreLangMoodChart from "../../common/GenreLangMoodChart/GenreLangMoodChart";
import TopGenreLangMoodChart from "../../common/GenreLangMoodChart/TopGenreLangMoodChart";
import TableList from "../../common/TableList/TableList";
import TableListCard from "../../common/TableListCard/TableListCard"
import Footer from "../../common/Footer/Footer"
import { trackTableList, topGenreLangMoodChart, genreLangMoodAnalytics } from "../../redux/actions/Home";

import FontIcon from "../../common/FontIcon/FontIcon"

import "./Genre.scss"
import GenreMoodModal from "../../common/PageInfo/GenreMoodModal/GenreMoodModal";

const Genre = ({ fromDateDetails, toDateDetails, _trackTableList, _topGenreLangMoodChart, _genreLangMoodAnalytics }) => {
    const [data, setData] = useState(true);

    const [chartLabData, setChartLabData] = useState();
    const [chartGenData, setChartGenData] = useState();
    const [chartLanData, setChartLanData] = useState();
    const [chartModData, setChartModData] = useState();
    const [chartRepData, setChartRepData] = useState();
    const [chartRanData, setChartRanData] = useState();
    const [chartOrcData, setChartOrcData] = useState();

    const [chartValue, setChartValue] = useState();

    const changeData = () => {
        setData(!data)
    }

    const handleChartValue = (value) => {
        setChartValue(value)
    }
    //for tab
    const selectedTab = 5;

    const handleOrchard = (fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, "", orchardcheck)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck);
        setChartOrcData(orchardcheck)

    };
    const handleLabData = (dataLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, dataLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        setChartLabData(dataLab)

    };
    const handleGenData = (dataGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, dataGen, languageData, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard);
        setChartGenData(dataGen)

    };
    const handleLanData = (dataLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, dataLan, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard);
        setChartLanData(dataLan)

    };
    const handleModData = (dataMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, dataMod, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard);
        setChartModData(dataMod)

    };
    const handleRepData = (dataRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, dataRep, genreData, languageData, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, languageData, moodData, dataRep, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, languageData, moodData, dataRep, rankData, orchard);
        setChartRepData(dataRep)

    };
    const handleRanData = (dataRan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, dataRan, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard);
        setChartRanData(dataRan)

    };
    const handleLabReset = (nullLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, nullLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        setChartLabData(nullLab)

    };
    const handleGenReset = (nullGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, nullGen, languageData, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard);
        setChartGenData(nullGen)

    };
    const handleLanReset = (nullLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, nullLan, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard);
        setChartLanData(nullLan)

    };
    const handleModReset = (nullMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, nullMod, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard);
        setChartModData(nullMod)

    };
    const handleRepReset = (nullRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, nullRep, genreData, languageData, moodData, rankData, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, languageData, moodData, nullRep, rankData, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, languageData, moodData, nullRep, rankData, orchard);
        setChartRepData(nullRep)

    };
    const handleRanReset = (nullRan, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, nullRan, orchard)
        _topGenreLangMoodChart(fromDate, toDate, countrySelected, "All", "streams", "genre", labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard);
        _genreLangMoodAnalytics(fromDate, toDate, countrySelected, "All", "streams", "parent_label", chartValue, labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard);
        setChartRanData(nullRan)
    };

    const [selectedTrackDate, setSelectedTrackDate] = useState("");
    // const [selectedTrackGroup, setDelectedTrackGroup] = useState("");

    const handleTrackDate = (chartDate) => {
        setSelectedTrackDate(chartDate)
    }

    const handleTrackGroup = (trackGroup) => {
        // setDelectedTrackGroup(trackGroup)
    }
    return (
        <div className="genre-page">
            <PageBanner />
            <div className="genre-wrapper">
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
                        <div className="title">Genres, Languages and Moods</div>
                        <GenreMoodModal />
                    </div>
                </div>
                <GenreLangMoodChart
                    chartLabData={chartLabData}
                    chartGenData={chartGenData}
                    chartLanData={chartLanData}
                    chartModData={chartModData}
                    chartRepData={chartRepData}
                    chartRanData={chartRanData}
                    chartOrcData={chartOrcData}
                    handleChartValue={handleChartValue}
                />
                <TopGenreLangMoodChart handleTrackDate={handleTrackDate} handleTrackGroup={handleTrackGroup}
                    chartLabData={chartLabData}
                    chartGenData={chartGenData}
                    chartLanData={chartLanData}
                    chartModData={chartModData}
                    chartRepData={chartRepData}
                    chartRanData={chartRanData}
                    chartOrcData={chartOrcData} />
                <div className="tablelist-header">
                    <div className="tablelist-header-title">
                        {/* <FontIcon
                            iconName="calender"
                            size="medium"
                        /> */}
                        Track list as of &nbsp;
                        {
                            selectedTrackDate.length > 0 ? <div>{formatDate(selectedTrackDate)}</div> : <div>{formatDate(fromDateDetails)} - {formatDate(toDateDetails)}</div>
                        }
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
                    <TableList selectedTrackDate={selectedTrackDate} />
                </div>
                <div className="tablelistcard-content" style={{ display: data ? "none" : "block" }} >
                    <TableListCard selectedTrackDate={selectedTrackDate} />
                </div>
                <Footer />
            </div>
        </div>
    )
}
Genre.propTypes = {
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    _trackTableList: PropTypes.func,
    _topGenreLangMoodChart: PropTypes.func,
    _genreLangMoodAnalytics: PropTypes.func,


};

Genre.defaultProps = {
    fromDateDetails: "",
    toDateDetails: " ",
    _trackTableList: () => { },
    _topGenreLangMoodChart: () => { },
    _genreLangMoodAnalytics: () => { },

};

const mapDispatchToProps = {
    _trackTableList: trackTableList,
    _topGenreLangMoodChart: topGenreLangMoodChart,
    _genreLangMoodAnalytics: genreLangMoodAnalytics,

};

const mapStateToProps = ({ Common }) => {
    const { fromDateDetails, toDateDetails } = Common;
    return { fromDateDetails, toDateDetails };
};
export default connect(mapStateToProps, mapDispatchToProps)(Genre);