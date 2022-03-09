import { useState } from "react";
import Ripples from "react-ripples";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
// import { CSVLink } from "react-csv";

import { formatDate } from "../../common/getSelectedDate";

import PageBanner from "../../common/PageBanner/PageBanner"
import MenuTab from "../../common/MenuTab/MenuTab"

import { trackTableList, trackChart } from "../../redux/actions/Home";

import FontIcon from "../../common/FontIcon/FontIcon"
import TrackAnalysisChart from "../../common/TrackAnalysisChart/TrackAnalysisChart";
import TrackAnalysisCityChart from "../../common/TrackAnalysisCityChart/TrackAnalysisCityChart"
import PageFilter from "../../common/PageFilter/PageFilter";
import TrackTableList from "../../common/TrackTableList/TrackTableList";
import TableListCard from "../../common/TableListCard/TableListCard"
import Footer from "../../common/Footer/Footer"
import TrackModal from "../../common/PageInfo/TrackModal/TrackModal";

import "./Tracks.scss"

const Tracks = ({ fromDateDetails, toDateDetails, _trackTableList, _trackChart, trackDetails }) => {
    const [data, setData] = useState(true);

    const [chartLabData, setChartLabData] = useState();
    const [chartGenData, setChartGenData] = useState();
    const [chartLanData, setChartLanData] = useState();
    const [chartModData, setChartModData] = useState();
    const [chartRepData, setChartRepData] = useState();
    const [chartRanData, setChartRanData] = useState();
    const [chartOrcData, setChartOrcData] = useState();

    const changeData = () => {
        setData(!data)
    }

    const handleOrchard = (fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, "", orchardcheck)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck);
        setChartOrcData(orchardcheck)
    };
    const handleLabData = (dataLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, dataLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        setChartLabData(dataLab)

    };
    const handleGenData = (dataGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, dataGen, languageData, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard);
        setChartGenData(dataGen)

    };
    const handleLanData = (dataLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, dataLan, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard);
        setChartLanData(dataLan)
    };
    const handleModData = (dataMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, dataMod, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard);
        setChartModData(dataMod)
    };
    const handleRepData = (dataRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, dataRep, genreData, languageData, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, dataRep, rankData, orchard);
        setChartRepData(dataRep)
    };
    const handleRanData = (dataRan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, dataRan, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard);
        setChartRanData(dataRan)
    };
    const handleLabReset = (nullLab, fromDate, toDate, countrySelected, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, nullLab, repertoireData, genreData, languageData, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard);
        setChartLabData(nullLab)

    };
    const handleGenReset = (nullGen, fromDate, toDate, countrySelected, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, nullGen, languageData, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard);
        setChartGenData(nullGen)

    };
    const handleLanReset = (nullLan, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, nullLan, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard);
        setChartLanData(nullLan)
    };
    const handleModReset = (nullMod, fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, nullMod, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard);
        setChartModData(nullMod)

    };
    const handleRepReset = (nullRep, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, nullRep, genreData, languageData, moodData, rankData, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, nullRep, rankData, orchard);
        setChartRepData(nullRep)

    };
    const handleRanReset = (nullRan, fromDate, toDate, countrySelected, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _trackTableList(fromDate, toDate, countrySelected, labelData, repertoireData, genreData, languageData, moodData, nullRan, orchard)
        _trackChart(fromDate, toDate, countrySelected, "All", "tracks", "parent_label", labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard);
        setChartRanData(nullRan)
    };
    //for tab
    const selectedTab = 3;

    const [selectedTrackDate, setSelectedTrackDate] = useState("");
    // const [selectedTrackGroup, setDelectedTrackGroup] = useState("");

    const handleTrackDate = (chartDate) => {
        setSelectedTrackDate(chartDate)
    }

    const handleTrackGroup = (trackGroup) => {
        // setDelectedTrackGroup(trackGroup)
    }

    return (
        <div className="tracks-page">
            <PageBanner />
            <div className="tracks-wrapper">
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
                        <div className="title">Tracks</div>
                        <TrackModal />
                    </div>
                </div>
                <TrackAnalysisChart handleTrackDate={handleTrackDate} handleTrackGroup={handleTrackGroup}
                    chartLabData={chartLabData}
                    chartGenData={chartGenData}
                    chartLanData={chartLanData}
                    chartModData={chartModData}
                    chartRepData={chartRepData}
                    chartRanData={chartRanData}
                    chartOrcData={chartOrcData} />
                {/* <MultiLineAxisChart /> */}
                <div div className="tablelist-header">
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
                            <CSVLink
                                filename={"my-file.csv"}
                                target="_blank"
                                data={trackDetails}
                            >
                                <FontIcon
                                    iconName="download"
                                    size="small"
                                    tooltip="Download"
                                />
                                </CSVLink>
                        </div> */}
                    </div>
                </div>
                <div className="tablelist-content" style={{ display: data ? "block" : "none" }}>
                    <TrackTableList selectedTrackDate={selectedTrackDate} />
                </div>
                <div className="tablelistcard-content" style={{ display: data ? "none" : "block" }} >
                    <TableListCard selectedTrackDate={selectedTrackDate} />
                </div>
                <TrackAnalysisCityChart />
                <Footer />
            </div>
        </div>
    )
}

Tracks.propTypes = {
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    _trackTableList: PropTypes.func,
    _trackChart: PropTypes.func,
    trackDetails: PropTypes.array
};

Tracks.defaultProps = {
    fromDateDetails: "",
    toDateDetails: " ",
    _trackTableList: () => { },
    _trackChart: () => { },
    trackDetails: []
};

const mapDispatchToProps = {
    _trackTableList: trackTableList,
    _trackChart: trackChart,
};

const mapStateToProps = ({ Common, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { trackDetails } = Home;
    return { fromDateDetails, toDateDetails, trackDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
