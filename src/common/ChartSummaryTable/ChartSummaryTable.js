import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import EllipsisToolTip from "ellipsis-tooltip-react-chan";

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { trackChartSummary } from "../../redux/actions/Home";
import { formatDate } from "../../common/getSelectedDate";

import FontIcon from "../../common/FontIcon/FontIcon";


import './ChartSummaryTable.scss';
import ArtistModal from "../PageInfo/ArtistModal/ArtistModal";

const ChartSummaryTable = ({ _trackChartSummary, chartSummaryDetails, fromDateDetails, toDateDetails, countrySelected}) => {

    const [avgWeek, setAvgWeek] = useState(false);
    const [percentageValue, setPercentageValue] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line no-sequences
        if (avgWeek, countrySelected !== "" && fromDateDetails && toDateDetails) {
            _trackChartSummary(avgWeek, countrySelected, fromDateDetails, toDateDetails);
        }
    }, [avgWeek, countrySelected, fromDateDetails, toDateDetails]);

    const options = {
        effect: "solid",
        place: "top"
      }

    const handleChange = () => {
        setAvgWeek(!avgWeek);
        setPercentageValue(true);
    }
    
       //decimal convertor
    const toDecimalConvertor = (value) => {
        const returnValues = typeof (value) === "number" ? parseFloat(value).toFixed(0) : value;
        return returnValues
    }

    //percentage convertor
    const percentageConvertor = (value1, value2, metrics) => {
        switch (metrics) {
            case "Market Share":
                return value1 + "%"
            case "Contribution to global Share":
                return value1 + "%";
            default:
                return typeof (value2) === "number" ? parseFloat((value1 / value2) * 100).toFixed(2) + "%" : value1;
        }
        // if (metrics === "Total Streams" && typeof (value2) === "string") {
        //     console.log(value1)
        //     returnValues = Number(parseFloat((value1 / value2) * 100).toFixed(2));
        // }
        // if (metrics === "Market Share" || metrics === "Contribution to global Share") {
         
        //     returnValues = value1
        // }
        // return returnValues
    }

    const numberFormat = (value, metrics) => {
        switch (metrics) {
            case "Market Share":
                return value + "%"
            case "Contribution to global Share":
                return value + "%";
            case "Catalogue":
                return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
            case "Frontline":
                return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
            case "Total Streams":
                return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
            default:
                return value
        }
    }

    return (
        <div className="chart-summary-table">
            <div className="tablelist-header">
                    <div className="tablelist-header-title">
                        <FontIcon iconName="calender" size="medium" tooltip="Table View " />Summary ( {formatDate(fromDateDetails)} - {formatDate(toDateDetails)})
                    </div>
                    <div className="tablelist-header-contents">
                    <div className="total-avg vertical-border">
                        <div className="total">Totals</div>
                        <div className="toggle-switch">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={avgWeek}
                                        onChange={(e) => handleChange()}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                            />
                        </div>
                        <div className="avg">Avg Weekly #</div>
                    </div>
                    <div className="percentage-value  vertical-border">
                        <div className="percentage">Percentage (%)</div>
                        <div className="toggle-switch">
                            {avgWeek ? <FormControlLabel
                                control={
                                    <Switch
                                        checked={percentageValue}
                                        disabled
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                            />
                                : <FormControlLabel
                                    control={
                                        <Switch
                                            checked={percentageValue}
                                            onChange={(e) => {
                                                setPercentageValue(e.target.checked)
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                />
                            }
                        </div>
                        <div className="Value">Value</div>
                    </div>
                    {/* <div className="tablelist-header-tablefilter vertical-border">
                            <FontIcon
                                iconName="filter"
                                size="small"
                                tooltip="Label Filter"
                            />
                        </div>
                        <div className="tablelist-header-download vertical-border">
                            <FontIcon
                                iconName="download"
                                size="small"
                                tooltip="Download"
                            />
                        </div> */}
                </div>
            </div>
            <div className="summary-table track-based">
                <div className="chart-title chart-content">
                    <div className="chart-label chart-metrics"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>Tracks based</EllipsisToolTip></div></div>
                    <div className="chart-label chart-totals"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>TOP 200 TOTAL</EllipsisToolTip></div></div>
                    <div className="chart-label chart-label1"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="sonymusic" size="medium" tooltip="Sony Music" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label2"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="universalmusic" size="medium" tooltip="universal" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label3"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="warnermusic" size="medium" tooltip="Warner" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label4"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>INDIES</EllipsisToolTip></div></div>
                </div>
                {chartSummaryDetails.track_based && chartSummaryDetails.track_based.map((item) => (
                    <div className="chart-content" key={item.metrics}>
                        <div className="chart-label chart-metrics"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{item.metrics}</EllipsisToolTip></div></div>
                        <div className="chart-label chart-totals"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{toDecimalConvertor(item.Totals)}</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label1"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0 ?   percentageConvertor(toDecimalConvertor(item.SME), item.Totals, item.metrics) : toDecimalConvertor(item.SME) }</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label2"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?   percentageConvertor(toDecimalConvertor(item.UMG), item.Totals, item.metrics) : toDecimalConvertor(item.UMG) }</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label3"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?   percentageConvertor(toDecimalConvertor(item.WMG), item.Totals, item.metrics) : toDecimalConvertor(item.WMG)}</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label4"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?   percentageConvertor(toDecimalConvertor(item.Indie), item.Totals, item.metrics) : toDecimalConvertor(item.Indie) }</EllipsisToolTip></div></div>
                    </div>
                ))}
            </div>
            <div className="summary-table stream-based">
                <div className="chart-title chart-content">
                    <div className="chart-label chart-metrics"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>Stream based</EllipsisToolTip></div></div>
                    <div className="chart-label chart-totals"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>TOP 200 TOTAL</EllipsisToolTip></div></div>
                    <div className="chart-label chart-label1"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="sonymusic" size="medium" tooltip="Sony Music" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label2"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="universalmusic" size="medium" tooltip="universal" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label3"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="warnermusic" size="medium" tooltip="Warner" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label4"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>INDIES</EllipsisToolTip></div></div>
                </div>
                {chartSummaryDetails.stream_based && chartSummaryDetails.stream_based.map((item) => (
                    <div className="chart-content" key={item.metrics}>
                        <div className="chart-label chart-metrics"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{item.metrics}</EllipsisToolTip></div></div>
                        <div className="chart-label chart-totals"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{numberFormat(toDecimalConvertor(item.Totals), item.metrics)}</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label1"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?  percentageConvertor(toDecimalConvertor(item.SME), item.Totals, item.metrics) : numberFormat(toDecimalConvertor(item.SME), item.metrics) }</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label2"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?  percentageConvertor(toDecimalConvertor(item.UMG), item.Totals, item.metrics) : numberFormat(toDecimalConvertor(item.UMG), item.metrics) }</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label3"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?  percentageConvertor(toDecimalConvertor(item.WMG), item.Totals, item.metrics) : numberFormat(toDecimalConvertor(item.WMG), item.metrics) }</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label4"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?  percentageConvertor(toDecimalConvertor(item.Indie), item.Totals, item.metrics) : numberFormat(toDecimalConvertor(item.Indie), item.metrics) }</EllipsisToolTip></div></div>
                    </div>
                ))}
            </div>
            <div className="summary-table artist-based">
                <div className="chart-title chart-content">
                    <div className="chart-label chart-metrics"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>Artist based</EllipsisToolTip><ArtistModal/></div></div>
                    <div className="chart-label chart-totals"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>TOP 200 TOTAL</EllipsisToolTip></div></div>
                    <div className="chart-label chart-label1"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="sonymusic" size="medium" tooltip="Sony Music" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label2"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="universalmusic" size="medium" tooltip="universal" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label3"><div style={{ width: "100%"}}><EllipsisToolTip options={options}><FontIcon iconName="warnermusic" size="medium" tooltip="Warner" /></EllipsisToolTip></div></div>
                    <div className="chart-label chart-label4"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>INDIES</EllipsisToolTip></div></div>
                </div>
                { chartSummaryDetails.artist_based && chartSummaryDetails.artist_based.map((item) => (
                      <div className="chart-content" key={item.metrics}>
                      <div className="chart-label chart-metrics"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{item.metrics}</EllipsisToolTip></div></div>
                      <div className="chart-label chart-totals"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{toDecimalConvertor(item.Totals)}</EllipsisToolTip></div></div>
                      <div className="chart-label chart-label1"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0 ?   percentageConvertor(toDecimalConvertor(item.SME), item.Totals, item.metrics) : toDecimalConvertor(item.SME) }</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label2"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?   percentageConvertor(toDecimalConvertor(item.UMG), item.Totals, item.metrics) : toDecimalConvertor(item.UMG) }</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label3"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?   percentageConvertor(toDecimalConvertor(item.WMG), item.Totals, item.metrics) : toDecimalConvertor(item.WMG)}</EllipsisToolTip></div></div>
                        <div className="chart-label chart-label4"><div style={{ width: "100%"}}><EllipsisToolTip options={options}>{ percentageValue === false && item.Totals > 0  ?   percentageConvertor(toDecimalConvertor(item.Indie), item.Totals, item.metrics) : toDecimalConvertor(item.Indie) }</EllipsisToolTip></div></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

ChartSummaryTable.propTypes = {
    _trackChartSummary: PropTypes.func,
    chartSummaryDetails: PropTypes.instanceOf(Object),
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
};

ChartSummaryTable.defaultProps = {
    _trackChartSummary: PropTypes.func,
    chartSummaryDetails: PropTypes.instanceOf(Object),
    fromDateDetails: "",
	toDateDetails: "",
    countrySelected: "",
};

const mapDispatchToProps = {
    _trackChartSummary: trackChartSummary
};

const mapStateToProps = ({ Home, Common }) => {
    const { chartSummaryDetails, countrySelected } = Home;
    const { fromDateDetails, toDateDetails } = Common;
    return { chartSummaryDetails, countrySelected, fromDateDetails, toDateDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartSummaryTable);

