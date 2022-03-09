
import { useState, useEffect } from "react";
import Ripples from "react-ripples";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import MenuTab from "../../common/MenuTab/MenuTab";

import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/core/styles";
import { benchMarkTrackList } from "../../redux/actions/Home"

import PageBanner from "../../common/PageBanner/PageBanner"

import FontIcon from "../../common/FontIcon/FontIcon"
import PageFilter from "../../common/PageFilter/PageFilter";
import TableList from "../../common/BenchMarkTableList/BenchMarkTableList";
import TableListCard from "../../common/BenchMarkTableListCard/BenchMarkTableListCard"
import Footer from "../../common/Footer/Footer"

import "./BenchMark.scss"
import BenchMarkModal from "../../common/PageInfo/BenchMarkModal/BenchMarkModal";

const BenchMark = ({ _benchMarkTrackList, fromDateDetails, toDateDetails, countrySelected, benchmarkTrackDetails }) => {
    const [data, setData] = useState(true);

    const changeData = () => {
        setData(!data)
    }


    //Minimum and Maximum range value
    const minVal = parseInt(JSON.stringify(benchmarkTrackDetails?.minmax?.min[0]), 10);
    const maxVal = parseInt(JSON.stringify(benchmarkTrackDetails?.minmax?.max[0]), 10);

    const [minMax, setMinMax] = useState([0, 0]);
    const [minMaxRangeValue, setMinMaxRangeValue] = useState([0, 0]);

    //week range value
    const [value, setValue] = useState(2);
    const [rangeValue, setRangeValue] = useState(2);

    useEffect(() => {
		if (fromDateDetails && toDateDetails && countrySelected && rangeValue && minMaxRangeValue) {
			_benchMarkTrackList(fromDateDetails, toDateDetails, countrySelected, rangeValue, minMaxRangeValue[0], minMaxRangeValue[1]);
		}
	}, [fromDateDetails, toDateDetails, countrySelected, rangeValue]);


    useEffect(() => {
        if (minVal || maxVal) {
            setMinMax([minVal, maxVal]);
            setMinMaxRangeValue([minVal, maxVal]);
            _benchMarkTrackList(fromDateDetails, toDateDetails, countrySelected, rangeValue, minVal, maxVal);
        }
    }, [minVal, maxVal]);

    useEffect(() => {
        setValue(2);
        setRangeValue(2);
    }, [countrySelected]);

    //onchange event for week range
    // const selectedWeekRange = (selectedRange) => {
    //     rangeValue(selectedRange);
    //     setRangeValue(selectedRange);
    //     _benchMarkTrackList(fromDateDetails, toDateDetails, countrySelected, selectedRange, minMax[0], minMax[1]);
    // }

      //onchange event for minmax range
    const minMaxSelectedRange = (selectedRange) => {
        setMinMax([selectedRange[0], selectedRange[1]]);
        setMinMaxRangeValue([selectedRange[0], selectedRange[1]]);
        _benchMarkTrackList(fromDateDetails, toDateDetails, countrySelected, rangeValue, selectedRange[0], selectedRange[1]);
    }

    const handleOrchard = (fromDate, toDate, country, labelData, repertoireData, genreData, languageData, moodData, rankData, orchardcheck) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, languageData, moodData, repertoireData, rankData, orchardcheck)
    };
    const handleLabData = (dataLab, fromDate, toDate, country, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], dataLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
    };

    const handleGenData = (dataGen, fromDate, toDate, country, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, dataGen, languageData, moodData, repertoireData, rankData, orchard)
    };
    const handleLanData = (dataLan, fromDate, toDate, country, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, dataLan, moodData, repertoireData, rankData, orchard)
    };
    const handleModData = (dataMod, fromDate, toDate, country, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, languageData, dataMod, repertoireData, rankData, orchard)
    };
    const handleRepData = (dataRep, fromDate, toDate, country, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, languageData, moodData, dataRep, rankData, orchard)
    };
    const handleRanData = (dataRan, fromDate, toDate, country, labelData, repertoireData, genreData, languageData, moodData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, languageData, moodData, repertoireData, dataRan, orchard)
    };
    const handleLabReset = (nullLab, fromDate, toDate, country, repertoireData, genreData, languageData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], nullLab, genreData, languageData, moodData, repertoireData, rankData, orchard)
    };
    const handleGenReset = (nullGen, fromDate, toDate, country, labelData, repertoireData, languageData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, nullGen, languageData, moodData, repertoireData, rankData, orchard)
    };
    const handleLanReset = (nullLan, fromDate, toDate, country, labelData, repertoireData, genreData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, nullLan, moodData, repertoireData, rankData, orchard)
    };
    const handleModReset = (nullMod, fromDate, toDate, country, labelData, repertoireData, genreData, languageData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, languageData, nullMod, repertoireData, rankData, orchard)
    };
    const handleRepReset = (nullRep, fromDate, toDate, country, labelData, genreData, languageData, moodData, rankData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, languageData, moodData, nullRep, rankData, orchard)
    };
    const handleRanReset = (nullRan, fromDate, toDate, country, labelData, genreData, languageData, moodData, repertoireData, orchard) => {
        _benchMarkTrackList(fromDate, toDate, country, value, minMax[0], minMax[1], labelData, genreData, languageData, moodData, repertoireData, nullRan, orchard)
    };

    const useStyles = makeStyles(theme => ({
        valueLabel: {
          "&>*": {
            background: "red"
          }
        }
      }));
      
      const classes = useStyles();

       //for tab
   const selectedTab = 7;

   function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    else if (num > 1000000) {
        return (num / 1000000).toFixed(0) + 'M'; 
    } 
    else if (num < 900) {
        return num.toFixed(0);
    }
    return num.toFixed(0)
}

    return (
        <div className="benchmark-page">
            <PageBanner />
            <div className="benchmark-wrapper">
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
                    <div className="title-label">
                        <div className="title">Track Performance Benchmark</div>
                       <BenchMarkModal />
                    </div>
                </div>
                {/* <MultiLineAxisChart /> */}
                <div className="tablelist-header">
                    <div className="tablelist-header-title">
                        Track List
                    </div>
                    <div className="tablelist-header-contents">
                    <div className="tablelist-header-positionavg">
                    <div className="positionavg-title">
                                Min / Max
                            </div>
                        <div className="positionavg-range">
                                <Slider
                                classes={{
                                    valueLabel: classes.valueLabel,
                                  }}
                                    getAriaLabel={() => 'Minimum distance'}
                                    onChange={(_, v) => setMinMax(v)}
                                    onChangeCommitted={(_, v) => minMaxSelectedRange(v)}
                                    value={minMax}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={value1 => <div>{numFormatter(value1)}</div>}
                                    min={benchmarkTrackDetails?.minmax?.min[0]}
                                    max={benchmarkTrackDetails?.minmax?.max[0]}
                                    aria-labelledby="input-slider"
                                />
                            </div>
                        </div>
                        <div className="tablelist-header-positionavg vertical-border">
                            <div className="positionavg-title">
                                # of weeks in Position Average
                            </div>
                            <div className="positionavg-range">
                                <Slider
                                    onChange={(_, v) => setValue(v)}
                                    onChangeCommitted={(_, v) => setRangeValue(v)}
                                    value={value}
                                    min={2}
                                    max={52}
                                    aria-labelledby="input-slider"
                                />
                            </div>
                            <div className="positionavg-value">
                                {value}
                            </div>
                        </div>
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
                <Footer />
            </div>
        </div>
    )
}

BenchMark.propTypes = {
    _benchMarkTrackList: PropTypes.func,
    benchmarkTrackDetails: PropTypes.instanceOf(Object),
    fromDateDetails: PropTypes.string,
	toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
};

BenchMark.defaultProps = {
    _benchMarkTrackList: () => { },
    benchmarkTrackDetails: {},
    fromDateDetails: "",
	toDateDetails: "",
    countrySelected: "",
};

const mapDispatchToProps = {
    _benchMarkTrackList: benchMarkTrackList
};

const mapStateToProps = ({ Common, Home }) => {
    const { fromDateDetails, toDateDetails } = Common
    const { benchmarkTrackDetails, countrySelected } = Home;
    // console.log(benchmarkTrackDetails)
    return { fromDateDetails, toDateDetails, benchmarkTrackDetails, countrySelected};
};

export default connect(mapStateToProps, mapDispatchToProps)(BenchMark);
