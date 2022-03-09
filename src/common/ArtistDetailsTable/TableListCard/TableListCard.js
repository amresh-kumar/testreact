import { useState } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import EllipsisToolTip from "ellipsis-tooltip-react-chan";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import FontIcon from './../../../common/FontIcon/FontIcon';
import Dummy_img from '../../../assets/images/dummy_img.png';
 import '../../TableListCard/TableListCard.scss';

const TableListCard = ({ trackDetails, selectedArtistDetails, toDateDetails }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const history = useHistory();

    const paginationLength = selectedArtistDetails.track_details && selectedArtistDetails.track_details.length ? selectedArtistDetails.track_details.length : 0;

    const options = {
        effect: "solid",
        place: "top"
      }

    const trackTrends = (prev_week_rank, rank) => {
        switch (true) {
            case prev_week_rank < rank:
                return <div className="track-trend-update"> <span className="trendarrow downarrow">
                    <FontIcon iconName="uparrow" size="small" tooltip="Position Down" />
                </span> {prev_week_rank - rank}
                </div>
            case prev_week_rank > rank:
                return <div className="track-trend-update"> <span className="trendarrow uparrow">
                    <FontIcon iconName="uparrow" size="small" tooltip="Position Up" />
                </span> {prev_week_rank - rank} </div>
            case prev_week_rank === rank:
                return <div className="track-trend-update"><span className="trendarrow equal" >
                    <FontIcon iconName="minus" size="small" tooltip="Same Position" />
                </span> {prev_week_rank - rank} </div>
            default:
                return null
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="tablelistcard">
            <TableContainer >
                <Table sx={{ minWidth: 650, borderBottom: "none" }} aria-label="simple table">
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '28%' }} />
                        <col style={{ width: '17%' }} />
                        <col style={{ width: '18%' }} />
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                    </colgroup>
                    <TableHead >
                        <TableRow >
                            <TableCell>#</TableCell>
                            <TableCell>TRACK </TableCell>
                            <TableCell>ARTIST</TableCell>
                            <TableCell>LABEL</TableCell>
                            <TableCell align="center">PEAK</TableCell>
                            <TableCell align="center">PREVIOUS</TableCell>
                            <TableCell align="center">TREND</TableCell>
                            <TableCell align="right">STREAMS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { selectedArtistDetails.track_details && selectedArtistDetails.track_details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id} >
                                    <TableCell><div className="track-number">{row.rank}</div></TableCell>
                                    <TableCell>
                                        <div className="track-name-artist">
                                            <div className="track-image">
                                                {row.thumbnail_url ? <img src={row.thumbnail_url} alt="TrackImage1" />
                                                    : <img src={Dummy_img} alt="Dummy image" />
                                                }
                                            </div>
                                            <div className="track-name" onClick = {() => history.push(`/trackdetails/${row.rank}/${toDateDetails}`) } role="presentation" >
                                                <EllipsisToolTip options={options}>{row.track_name}</EllipsisToolTip>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell> <EllipsisToolTip options={options}>{row.track_artist}</EllipsisToolTip></TableCell>
                                    <TableCell><EllipsisToolTip options={options}>{row.label_name}</EllipsisToolTip></TableCell>
                                    <TableCell align="center" ><div>{row.highest_rank}</div></TableCell>
                                    <TableCell align="center"><div >{row.prev_week_rank < 0 ? null : row.prev_week_rank}</div></TableCell>
                                    <TableCell align="center">
                                        {
                                            row.prev_week_rank ? <div className="track-trend">
                                                {trackTrends(row.prev_week_rank, row.rank)}
                                            </div> : <div className="track-trend"> <span className="newupdate">new</span>
                                            </div>}
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="track-streams">
                                            <NumberFormat
                                                value={row.streams}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                { paginationLength > 10 ? <TablePagination className="table-pagination"
					rowsPerPageOptions={[10, 50, 100, paginationLength]}
					component="div"
					count={paginationLength}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage} /> : null
				}
            </TableContainer>
        </div>
    )
}

TableListCard.propTypes = {
    trackDetails: PropTypes.instanceOf(Object),
    selectedArtistDetails: PropTypes.instanceOf(Object),
    toDateDetails: PropTypes.string
};

TableListCard.defaultProps = {
    trackDetails: [],
    selectedArtistDetails: {},
    toDateDetails: ""
};

const mapDispatchToProps = {

};

const mapStateToProps = ({ Home, Common }) => {
    const { selectedArtistDetails } = Home;
    const { toDateDetails } = Common;
    return { selectedArtistDetails, toDateDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableListCard);
