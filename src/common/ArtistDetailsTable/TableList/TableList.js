import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import  { formatDate }  from "../../../common/getSelectedDate";

import FontIcon from '../../FontIcon/FontIcon';
import Dummy_img from '../../../assets/images/dummy_img.png';
import '../../TableList/TableList.scss';

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


function Row({ row, toDateDetails }) {
	const [open, setOpen] = useState(false);

	const history = useHistory();

	return (
		<>
			<TableRow key={row.id} style={{ borderBottom: open ? "none" : "1px solid #ebedf0" }}>
				<TableCell><div className="track-number">{row.rank}</div></TableCell>
				<TableCell align="right">
					<div className="track-name-artist">
						<div className="track-image">
							{ row.thumbnail_url ? <img src={row.thumbnail_url} alt="TrackImage1" />
							: <img src={Dummy_img} alt="Dummy image" />
							}
						</div>
						<div className="track-details">
							<div className="track-name artist-details-tablelist" onClick = {() => history.push(`/trackdetails/${row.rank}/${toDateDetails}`) }role="presentation" >{row.track_name}</div>
							<div className="track-country">{row.label_name}</div>
						</div>
					</div>
				</TableCell>
				<TableCell align="center"><div className="track-peak">{row.highest_rank}</div></TableCell>
				<TableCell align="center"><div className="track-previous">{row.prev_week_rank < 0 ? null : row.prev_week_rank}</div></TableCell>
				<TableCell align="center">
					{row.prev_week_rank ? <div className="track-trend"> {trackTrends(row.prev_week_rank, row.rank)} </div>
						: <div className="track-trend"> <span className="newupdate">new</span> </div>}
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

				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <div className="up-arrow">
							<FontIcon iconName="down_arrow" size="small" tooltip="Collapse" /> </div> : <div className="down-arrow"> <FontIcon iconName="down_arrow" size="small" tooltip="Expand" /> </div>}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow className="hidden-content">
				<TableCell style={{ padding: 0 }} colSpan={10}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Table size="small" aria-label="purchases">
								<TableBody>
									<TableCell className="track-empty-div"></TableCell>
									<TableCell>
										<div className="track-data">
											<div className="track-subheader">Release date</div>
											<div className="track-header">{formatDate(row.first_week)}</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="track-data">
											<div className="track-subheader">First entry date</div>
											<div className="track-header">{formatDate(row.week_date)}</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="track-data">
											<div className="track-subheader">First entry position</div>
											<div className="track-header">{row.highest_rank}</div>
										</div>
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell className="track-empty-div"></TableCell>
									<TableCell>
										<div className="track-data">
											<div className="track-subheader">Genre</div>
											<div className="track-header">{row.genre}</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="track-data">
											<div className="track-subheader">Total weeks on chart</div>
											<div className="track-header">{row.weeks_on_chart}</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="track-data">
											<div className="track-subheader">Label</div>
											<div className="track-header">{row.label_name}</div>
										</div>
									</TableCell>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
Row.propTypes = {
	row: PropTypes.shape({
		id: PropTypes.number,
		track_name: PropTypes.string,
		track_artist: PropTypes.string,
		label_name: PropTypes.string,
		highest_rank: PropTypes.number,
		prev_week_rank: PropTypes.number,
		rank: PropTypes.number,
		streams: PropTypes.number,
		thumbnail_url: PropTypes.any,
		first_week: PropTypes.string,
		week_date: PropTypes.string,
		weeks_on_chart: PropTypes.number,
		genre: PropTypes.string,
		primary_artist: PropTypes.string,
	}),
	toDateDetails: PropTypes.string,
	selectedTrackDate: PropTypes.string
};

const CollapsibleTable = ({ trackDetails, selectedArtistDetails, toDateDetails}) => {

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const paginationLength = selectedArtistDetails.track_details && selectedArtistDetails.track_details.length ? selectedArtistDetails.track_details.length : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div className="tablelist">
			<TableContainer >
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell align="left">TRACK & ARTIST</TableCell>
							<TableCell align="center">PEAK</TableCell>
							<TableCell align="center">PREVIOUS<br />POSITION</TableCell>
							<TableCell align="center">POSITION<br />TREND</TableCell>
							<TableCell align="right">STREAMS</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ selectedArtistDetails.track_details && selectedArtistDetails.track_details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<Row key={row.id} row={row} toDateDetails={toDateDetails}/>
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
	);
}


CollapsibleTable.propTypes = {
	trackDetails: PropTypes.instanceOf(Object),
	countrySelected: PropTypes.string,
	fromDateDetails: PropTypes.string,
	toDateDetails: PropTypes.string,
	selectedArtistDetails: PropTypes.instanceOf(Object),
};

CollapsibleTable.defaultProps = {
	trackDetails: [],
	countrySelected: "",
	fromDateDetails: " ",
	toDateDetails: " ",
	selectedArtistDetails: {}
};

const mapDispatchToProps = {
};

const mapStateToProps = ({ Home, Common }) => {
	const { fromDateDetails, toDateDetails } = Common;
	const { trackDetails, countrySelected, selectedArtistDetails } = Home;
	return { trackDetails, countrySelected, selectedArtistDetails, fromDateDetails, toDateDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTable);
