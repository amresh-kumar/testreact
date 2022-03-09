/* eslint-disable no-sequences */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import TablePagination from '@material-ui/core/TablePagination';

import { cityChartCompare, countrySelected } from "../../redux/actions/Home";
import { formatDate } from "../getSelectedDate";

import FontIcon from '../FontIcon/FontIcon';

import '../ChartCompareTable/ChartCompareTable.scss';

const CityChartCompareTable = ({ fromDateDetails, toDateDetails, _countrySelected, _cityChartCompare, selectedFlagDetails }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const paginationLength = selectedFlagDetails.datasets && selectedFlagDetails.datasets.length ? selectedFlagDetails.datasets.length : 0;
    const selectedCountryId = useParams().id;

    useEffect(() => {
        if (fromDateDetails && toDateDetails && selectedCountryId) {
            _cityChartCompare(fromDateDetails, toDateDetails, selectedCountryId)
        }
    }, [fromDateDetails, toDateDetails, selectedCountryId]);

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
        <div className="ChartCompareTable city-chart-compare">
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
                            {selectedFlagDetails.datasets &&
                                    selectedFlagDetails.datasets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <div className="track-data-list" key={row.global_rank}>
                                                <div className="track-number"> {row.global_rank}</div>
                                                <div className="track-image" ><div><img src={row.thumbnail} /></div></div>
                                                <div className="track-title"><EllipsisToolTip options={options}>{row.trackname}</EllipsisToolTip></div>
                                            </div>
                                        ))}
                        </div>
                    </div>
                    <div className={selectedFlagDetails?.city_list?.length <= 7 ? "single-flag-details" : "flag-details"}>
                         <div className="flag-header">
                            {selectedFlagDetails.city_list && 
                                    selectedFlagDetails.city_list.map((row) => (
                                        <div className="flag-list" key={row.country_name}>
                                            <div className="flag-name">{row.country_name}</div>
                                        </div>
                                    ))}
                        </div>
                        <div className="flag-body">  
                        { selectedFlagDetails.datasets  &&                                     
                                selectedFlagDetails.datasets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((dataset) =>  (
                                <div className="flag-list" key={dataset.global_rank}>
                                      { selectedFlagDetails.city_list && selectedFlagDetails.city_list.map((country) => (
                                    <div className="flag flag1" key={country.city_code}>
                                        <div className="flag-background" style={{ backgroundColor: dataset[country.country_name] ? dataset[country.country_name][1] : null}}>
                                            {dataset[country.country_name] &&  dataset[country.country_name][0] > 0 ? dataset[country.country_name][0] : null }
                                        </div>
                                        </div>                               
                                      ))}
                                </div>
                                ))
                         }
                        </div> 
                    </div>
                </div> 
                { paginationLength > 10 ? <TablePagination className="table-pagination"
                    rowsPerPageOptions={[10, 50, 100, paginationLength]}
                    component="div"
                    count={paginationLength}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} /> : null }
            </div>
        </div>
    )
}

CityChartCompareTable.propTypes = {
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string, 
    _cityChartCompare: PropTypes.func,
    _countrySelected: PropTypes.func,
    selectedFlagDetails: PropTypes.instanceOf(Object),
};

CityChartCompareTable.defaultProps = {
    fromDateDetails: " ",
    toDateDetails: " ",
    _cityChartCompare: () => { },
    _countrySelected: () => { },
    selectedFlagDetails: {},
};

const mapDispatchToProps = {
    _cityChartCompare: cityChartCompare,
    _countrySelected: countrySelected
};

const mapStateToProps = ({ Common, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { selectedFlagDetails } = Home;
    return { fromDateDetails, toDateDetails, selectedFlagDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityChartCompareTable);
