import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./ProgressBar.scss";

const ProgressBar = ({ showLoader }) => {
	if (showLoader) {
		return (
			<div className="pageloader">
				<div>
					<CircularProgress classes={{ root: "pb-root" }} />
				</div>
			</div>
		);
	}
	return null;
};


ProgressBar.propTypes = {
	showLoader: PropTypes.bool
};

ProgressBar.defaultProps = {
	showLoader: false
};

const mapStateToProps = ({ Common }) => {
	const { showLoader } = Common;
	return {
		showLoader
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
