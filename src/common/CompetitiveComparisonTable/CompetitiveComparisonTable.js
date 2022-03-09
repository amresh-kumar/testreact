import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import Switch from '@material-ui/core/Switch';
import { reduxForm, Field } from "redux-form";
import Select from "../../common/form/Select/Select";
import { compCompareTable } from "../../redux/actions/Home";
import NumberFormat from 'react-number-format';

import FontIcon from "../FontIcon/FontIcon";

import "./CompetitiveComparisonTable.scss"

const artistTypes = [
    {
        id: 'All',
        name: 'All Tracks'
    },
    {
        id: 'New',
        name: "New Entries"
    },
    {
        id: 'Debut',
        name: "Debut Artist"
    },
    {
        id: 'Breakthrough',
        name: "Breakthrough Artist"
    },
    {
        id: 'Catalogue',
        name: "Catalogue"
    },
    {
        id: 'Frontline',
        name: "Frontline"
    },
]

const view = [
    {
        id: 'tracks',
        name: "No. of Tracks"
    },
    {
        id: 'artists',
        name: "No. of Artists"
    },
    {
        id: "streams",
        name: "Total Streams"
    },
]

const types = [
    {
        id: "streams",
        name: "Streams Based"
    },
    {
        id: 'tracks',
        name: "Tracks Based"
    },
    {
        id: " artist",
        name: " Artists Based"
    },
]

const genreMoodLanData = [
    {
        id: "genre",
        name: "Genre"
    },
    {
        id: "mood",
        name: "Mood"
    },
    {
        id: "language",
        name: "Language"
    },
    {
        id: "languagemood",
        name: "Language Mood"
    },
    {
        id: "languagegenre",
        name: "Language Genre"
    },
    {
        id: "moodgenre",
        name: "Mood Genre"
    },

]

let CompetitiveComparisonTable = ({ _compCompareTable, compCompareChartList, countrySelected, fromDateDetails, toDateDetails, CompetitiveComparisonTableForm, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData, change }) => {

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected !== "") {
            _compCompareTable(fromDateDetails, toDateDetails, countrySelected, 'All', 'tracks', 'tracks', 'genre');
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            change(`All`, "All Tracks");
            change(`genreChartType`, "genre");
            change(`type`, "tracks");
            change(`genreChartType`, "genre");
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [percentageValue, setPercentageValue] = useState(true);

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

    const handleArtistsChart = (e) => {
        if (e.target.name === "artistType") {
            _compCompareTable(fromDateDetails, toDateDetails, countrySelected, e.target.value, CompetitiveComparisonTableForm?.values?.view, CompetitiveComparisonTableForm?.values?.type, CompetitiveComparisonTableForm?.values?.genreChartType, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);      
        }
        if (e.target.name === "view") {
            _compCompareTable(fromDateDetails, toDateDetails, countrySelected, CompetitiveComparisonTableForm?.values?.artistType, e.target.value, CompetitiveComparisonTableForm?.values?.type, CompetitiveComparisonTableForm?.values?.genreChartType, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "type") {
            _compCompareTable(fromDateDetails, toDateDetails, countrySelected, CompetitiveComparisonTableForm?.values?.artistType, CompetitiveComparisonTableForm?.values?.view, e.target.value, CompetitiveComparisonTableForm?.values?.genreChartType, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
        if (e.target.name === "genreChartType") {
            _compCompareTable(fromDateDetails, toDateDetails, countrySelected, CompetitiveComparisonTableForm?.values?.artistType, CompetitiveComparisonTableForm?.values?.view, CompetitiveComparisonTableForm?.values?.type, e.target.value, chartLabData, chartGenData, chartLanData, chartModData, chartRepData, chartRanData, chartOrcData);
        }
    }

    const percentageConvertor = (total, labels) => {
        return ((labels / total) * 100).toFixed(0)
    }

    return (
        <div className="competitive-table">
            <div className="tablelist-header">
                <div className="top-tablelist-header">
                <div className="tablelist-header-title">
                    Genres, Languages, Mood Analysis
                </div>
                <div className="tablelist-header-contents">
                        <div className="percentage-value">
                            {/* <div className="vertical-border"></div> */}
                            <div className="percentage">Percentage (%)</div>
                            <div className="toggle-switch">
                                <Switch
                                    checked={percentageValue}
                                    onChange={(e) => setPercentageValue(e.target.checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                            <div className="Value">Value</div>
                        </div>
                    </div>
                </div>
                <div className="compcompare-filter">
                    <div className="compcompare-dropdown">
                        <Field
                            component={Select}
                            name="artistType"
                            optionValueKey="id"
                            optionLabelKey="name"
                            optionData={artistTypes}
                            onChange={handleArtistsChart}
                        />
                        <Field
                            component={Select}
                            name="view"
                            optionValueKey="id"
                            optionLabelKey="name"
                            optionData={view}
                            onChange={handleArtistsChart}
                        />
                        <Field
                            component={Select}
                            name="type"
                            optionValueKey="id"
                            optionLabelKey="name"
                            optionData={types}
                            onChange={handleArtistsChart}
                        />
                        <Field
                            component={Select}
                            name="genreChartType"
                            optionValueKey="id"
                            optionLabelKey="name"
                            optionData={genreMoodLanData}
                            onChange={handleArtistsChart}
                        />
                    </div> 
                </div>
            </div>
            <div className="tablelistcard competitivecomparison-table">
                <div className="tablelist-content">
                    <TableContainer >
                        <Table sx={{ minWidth: 650, borderBottom: "none" }} aria-label="simple table">
                            <colgroup>
                                <col style={{ width: '25%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <TableHead >
                                <TableRow >
                                    <TableCell>
                                        <div className="genre-title">
                                            <FontIcon iconName="guitar" size="medium" />
                                            GENRES
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">TOTAL</TableCell>
                                    <TableCell align="center">
                                        <FontIcon iconName="sonymusic" size="medium" tooltip="Sony Music" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <FontIcon iconName="universalmusic" size="medium" tooltip="Universal" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <FontIcon iconName="warnermusic" size="medium" tooltip="Warner" />
                                    </TableCell>
                                    <TableCell align="center">INDIES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {compCompareChartList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.groupby}>
                                            <TableCell><div className="genre-label"><EllipsisToolTip options={options}>{row.groupby}</EllipsisToolTip></div></TableCell>
                                            <TableCell align="center">
                                                <NumberFormat value={Number(parseFloat(row.Totals).toFixed(0))} displayType={'text'} thousandSeparator={true} />
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    percentageValue === false ? <span><NumberFormat value={percentageConvertor(row.Totals, row.SME)} displayType={'text'} thousandSeparator={true} />%</span> : <NumberFormat value={row.SME} displayType={'text'} thousandSeparator={true} />
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    percentageValue === false ? <span><NumberFormat value={percentageConvertor(row.Totals, row.UMG)} displayType={'text'} thousandSeparator={true} />%</span> : <NumberFormat value={row.UMG} displayType={'text'} thousandSeparator={true} />
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    percentageValue === false ? <span><NumberFormat value={percentageConvertor(row.Totals, row.WMG)} displayType={'text'} thousandSeparator={true} />%</span> : <NumberFormat value={row.WMG} displayType={'text'} thousandSeparator={true} />
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    percentageValue === false ? <span><NumberFormat value={percentageConvertor(row.Totals, row.Indie)} displayType={'text'} thousandSeparator={true} />%</span> : <NumberFormat value={row.Indie} displayType={'text'} thousandSeparator={true} />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}

                            </TableBody>
                        </Table>
                        <TablePagination className="table-pagination"
                            rowsPerPageOptions={[10, compCompareChartList.length]}
                            component="div"
                            count={compCompareChartList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage} />
                    </TableContainer>
                </div>
            </div>
        </div>

    )
}

CompetitiveComparisonTable.propTypes = {
    _compCompareTable: PropTypes.func,
    compCompareChartList: PropTypes.instanceOf(Object),
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    change: PropTypes.func,
    chartLabData: PropTypes.string,
    chartGenData: PropTypes.string,
    chartLanData: PropTypes.string,
    chartModData: PropTypes.string,
    chartRepData: PropTypes.string,
    chartRanData: PropTypes.string,
    chartOrcData: PropTypes.string,
    CompetitiveComparisonTableForm: PropTypes.object,
};

CompetitiveComparisonTable.defaultProps = {
    _compCompareTable: () => { },
    compCompareChartList: [],
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",
    change: () => { },
    chartLabData: "",
    chartGenData: "",
    chartLanData: "",
    chartModData: "",
    chartRepData: "",
    chartRanData: "",
    chartOrcData: "",
    CompetitiveComparisonTableForm: {},
};

const mapDispatchToProps = {
    _compCompareTable: compCompareTable
};

const mapStateToProps = ({ Home, Common, form }) => {
    const { compCompareChartList, countrySelected } = Home;
    const { fromDateDetails, toDateDetails } = Common;
    const { CompetitiveComparisonTableForm } = form;
    const initialValues = {
        artistType: artistTypes.length > 0 && artistTypes[0].id,
        view: view.length > 0 && view[0].id,
        type: types.length > 0 && types[1].id,
        genreChartType: genreMoodLanData.length > 0 && genreMoodLanData[0].id
    }
    return { compCompareChartList, countrySelected, fromDateDetails, toDateDetails, CompetitiveComparisonTableForm, initialValues };
};

CompetitiveComparisonTable = reduxForm({
    form: "CompetitiveComparisonTableForm",
    enableReinitialize: true
})(CompetitiveComparisonTable);

export default connect(mapStateToProps, mapDispatchToProps)(CompetitiveComparisonTable);
