/* eslint-disable no-sequences */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import TablePagination from '@material-ui/core/TablePagination';

import { chartCompare } from "../../redux/actions/Home";
import { formatDate } from "../../common/getSelectedDate";
import { flagImages } from "../Flagimages.js";

import FontIcon from '../FontIcon/FontIcon';

import './ChartCompareTable.scss';

const ChartCompareTable = ({ fromDateDetails, toDateDetails, countrySelected, _chartCompare, chartFlagDetails }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const paginationLength = chartFlagDetails.datasets && chartFlagDetails.datasets.length ? chartFlagDetails.datasets.length : 0;

    const history = useHistory();

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _chartCompare(fromDateDetails, toDateDetails, countrySelected)
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    // const countryDisplay = (code, flags, images) => {
    //     switch (code) {
    //         case flags:
    //             return <img src={images} alt="Flags" key={flags}/>
    //         default:
    //             return null
    //     }
    // }

    const options = {
        effect: "solid",
        place: "top"
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="ChartCompareTable">
            <div className="ChartCompare-content">
                <div className="tablelist-header">
                    <div className="tablelist-header-title">
                        <FontIcon
                            iconName="calender"
                            size="medium"
                            tooltip="Calendar"
                        />
                        Global Top 200 Tracks as {formatDate(fromDateDetails)} - {formatDate(toDateDetails)}
                    </div>
                    <div className="tablelist-header-contents">
                        {/* <div className="tablelist-header-tablefilter vertical-border">
                            <FontIcon
                                iconName="download"
                                size="small"
                                tooltip="Download"
                            />
                        </div> */}
                    </div>
                </div>
                <div className="flag-chart">
                    <div className="track-details">
                        <div className="track-header">
                            <div className="track-number">#</div>
                            <div className="track-title">TRACK NAME</div>
                        </div>
                        <div className="track-body">
                            {chartFlagDetails.datasets && 
                                    chartFlagDetails.datasets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <div className="track-data-list" key={row.global_rank}>
                                                <div className="track-number"> {row.global_rank}</div>
                                                <div className="track-image"><div><img src={row.thumbnail} /></div></div>
                                                <div className="track-title"><EllipsisToolTip options={options}>{row.trackname}</EllipsisToolTip></div>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                    <div className="flag-details">
                        <div className="flag-header">
                            {chartFlagDetails.country_list &&
                                    chartFlagDetails.country_list.map((row) => (
                                        <div className="flag-list" key={row.country_name}>
                                            <div className="flag-image" onClick={() => history.push(`/citychartcomparison/${row.country_name}/${row.country_code}`)} role="presentation">
                                                <img src={flagImages[row.country_code]} alt="Flags" key={row.country_code} />
                                            </div>
                                            <div className="flag-name">{row.country_name}</div>
                                        </div>
                                    ))}
                        </div>
                        <div className="flag-body">
                            {chartFlagDetails.datasets && 
                                    chartFlagDetails.datasets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((dataset) => (
                                            <div className="flag-list" key={dataset.global_rank}>
                                                {chartFlagDetails.country_list.map((country) => (
                                                    <div className="flag flag1" key={country.country_code}>
                                                        <div className="flag-background" style={{ backgroundColor: dataset[country.country_code][1] ? dataset[country.country_code][1] : null }}>
                                                            {dataset[country.country_code][0] > 0 ? dataset[country.country_code][0] : null}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                        </div>
                    </div>
                </div>
                <TablePagination className="table-pagination"
                    rowsPerPageOptions={[10, 50, 100, paginationLength]}
                    component="div"
                    count={paginationLength}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </div>
        </div>
    )
}

ChartCompareTable.propTypes = {
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    _chartCompare: PropTypes.func,
    chartFlagDetails: PropTypes.instanceOf(Object),
};

ChartCompareTable.defaultProps = {
    fromDateDetails: " ",
    toDateDetails: " ",
    countrySelected: " ",
    _chartCompare: () => { },
    chartFlagDetails: {},
};

const mapDispatchToProps = {
    _chartCompare: chartCompare
};

const mapStateToProps = ({ Common, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { countrySelected, chartFlagDetails } = Home;
    console.log(chartFlagDetails)
    return { fromDateDetails, toDateDetails, countrySelected, chartFlagDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartCompareTable);
