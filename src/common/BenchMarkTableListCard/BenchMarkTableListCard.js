import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import Tooltip from "@material-ui/core/Tooltip";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import Dummy_img from '../../assets/images/dummy_img.png';
import './BenchMarkTableListCard.scss';

const BenchMarkTableListCard = ({ benchmarkTrackDetails, toDateDetails }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const paginationLength = benchmarkTrackDetails.datasets && benchmarkTrackDetails.datasets.length ? benchmarkTrackDetails.datasets.length : 0;

    const history = useHistory();

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

    const avgValue = (streamValue, value) => {
        const returnValue = ""
        if (value > 0) {
            return value - streamValue
        }
        return returnValue
    }

    return (
        <div className="tablelistcard benchmark">
            <TableContainer className="benchmark-table">
                <Table sx={{ minWidth: 650, borderBottom: "none" }} aria-label="simple table">
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '13%' }} />
                    </colgroup>
                    <TableHead >
                        <TableRow >
                            <TableCell>#</TableCell>
                            <TableCell>TRACK </TableCell>
                            <TableCell>ARTIST</TableCell>
                            <TableCell>LABEL</TableCell>
                            <TableCell align="center">PEAK</TableCell>
                            <TableCell align="center">PREVIOUS</TableCell>
                            <TableCell align="center">STREAMS</TableCell>
                            <TableCell align="center" ><div className="track-category">STREAMS REQUIRED FOR NEXT RANK CATEGORY</div></TableCell>
                            <TableCell align="center">POSITION<br />AVERAGE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {benchmarkTrackDetails.datasets && benchmarkTrackDetails.datasets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.rank} >
                                    <TableCell><div className="track-number">{row.rank}</div></TableCell>
                                    <TableCell>
                                        <div className="track-name-artist">
                                            <div className="track-image">
                                                {row.thumbnail_url ? <img src={row.thumbnail_url} alt="TrackImage1" />
                                                    : <img src={Dummy_img} alt="Dummy image" />
                                                }
                                            </div>
                                            <div className="track-name" onClick={() => history.push(`/trackdetails/${row.rank}/${toDateDetails}`)} role="presentation" >
                                                <EllipsisToolTip options={options}>{row.track_name}</EllipsisToolTip>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell> <EllipsisToolTip options={options}>{row.track_artist}</EllipsisToolTip></TableCell>
                                    <TableCell><EllipsisToolTip options={options}>{row.label_name}</EllipsisToolTip></TableCell>
                                    <TableCell align="center" ><div>{row.highest_rank}</div></TableCell>
                                    <TableCell align="center"><div className="track-previous">{row.prev_week_rank < 0 ? null : row.prev_week_rank}</div></TableCell>
                                    <TableCell align="center">
                                        <div className="track-streams">
                                            <NumberFormat
                                                value={row.streams}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell align="center"><Tooltip title={row.streams_required_str} placement="bottom-start" role="presentation"><NumberFormat value={avgValue(row.streams, row.streams_next_cat)} displayType={'text'} thousandSeparator={true} /></Tooltip></TableCell>
                                    <TableCell align="center" className="position-avg"><NumberFormat value={Number(parseFloat(row.avg_streams).toFixed(0))} displayType={'text'} thousandSeparator={true} /></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination className="table-pagination"
                rowsPerPageOptions={[10, 50, 100, paginationLength]}
                component="div"
                count={paginationLength}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} />
        </div>
    )
}

BenchMarkTableListCard.propTypes = {
    benchmarkTrackDetails: PropTypes.instanceOf(Object),
    toDateDetails: PropTypes.string,
};

BenchMarkTableListCard.defaultProps = {
    benchmarkTrackDetails: [],
    toDateDetails: "",
};

const mapDispatchToProps = {

};

const mapStateToProps = ({ Home, Common }) => {
    const { benchmarkTrackDetails } = Home;
    const { toDateDetails } = Common;
    return { benchmarkTrackDetails, toDateDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(BenchMarkTableListCard);
