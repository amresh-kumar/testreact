import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import NumberFormat from 'react-number-format';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import { artistDetails } from "../../redux/actions/Home";

import "./ArtistsTable.scss"

const ArtistsTable = ({ _artistDetails, toDateDetails, countrySelected, artistDetailsList }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const history = useHistory();

    // console.log(artistType)

    useEffect(() => {
        if (toDateDetails && countrySelected) {
            _artistDetails(toDateDetails, countrySelected, "all");
        }
    }, [toDateDetails, countrySelected]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="tablelistcard artist-table">
            <div className="tablelist-content">
                <TableContainer >
                    <Table sx={{ minWidth: 650, borderBottom: "none" }} aria-label="simple table">
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                        <TableHead >
                            <TableRow >
                                <TableCell>#</TableCell>
                                <TableCell>ARTIST </TableCell>
                                <TableCell align="center">NO OF TRACKS</TableCell>
                                <TableCell align="center">PEAK</TableCell>
                                <TableCell align="center">STREAMS</TableCell>
                                <TableCell align="center">AVERAGE STREAMS <br />PER CHARTING TRACK</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {artistDetailsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((artist) => (
                                    <TableRow key={artist.index} >
                                <TableCell><div className="track-number">{artist.index}</div></TableCell>
                                <TableCell>
                                    <div className="artist-info">
                                        <div className="artist-img"><img src={artist.artist_thumbnail_url} alt="artist-image" /></div>
                                        <div className="artist-name" onClick = {() => history.push(`/artistdetails/${artist.artist_name}`) }role="presentation" >{artist.artist_name}</div>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{artist.track_count}</TableCell>
                                <TableCell align="center">{artist.peak_rank}</TableCell>
                                <TableCell align="center"><div className="stream-value">
                                <NumberFormat
                                    value={artist.streams}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                /></div></TableCell>
                                <TableCell align="center"><div className="stream-value">
                                <NumberFormat
                                    value={artist.avg_streams}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                /></div></TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination className="table-pagination"
                        rowsPerPageOptions={[10, 50, 100, artistDetailsList.length]}
                        component="div"
                        count={artistDetailsList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </TableContainer>
            </div>
        </div>
    )
}

ArtistsTable.propTypes = {
    _artistDetails: PropTypes.func,
	toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    artistDetailsList: PropTypes.array
};

ArtistsTable.defaultProps = {
    _artistDetails: () => {},
	toDateDetails: "",
    countrySelected: "",
    ArtistsChartForm: {},
    artistDetailsList: []
};

const mapDispatchToProps = {
    _artistDetails: artistDetails
};

const mapStateToProps = ({ Common, Home }) => {
    const {  toDateDetails } = Common;
    const { countrySelected, artistDetailsList } = Home;
    return { toDateDetails, countrySelected, artistDetailsList };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsTable);
