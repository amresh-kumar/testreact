
import { useState } from "react";
import Ripples from 'react-ripples';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FontIcon from "../../../common/FontIcon/FontIcon";

import './ChartSummaryModal.scss';

const ChartSummaryModal = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [openel, setOpenel] = useState(false);

    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenel(true);
    };

    const handleCloseEl = () => {
        setOpenel(false);
    };

    return (
        <div className="summary-modal-component">
            <div className="date-content" onClick={handleClick} open={open} role="presentation">
                <Ripples >
                    <FontIcon iconName="info_circle" size="medium" color="grey" tooltip="Info" onClick={handleClick} open={open} role="presentation" />
                </Ripples>
            </div>
            <Dialog open={openel} onClose={handleCloseEl} className="model-template summary-modal">
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon iconName="info_circle" size="medium" />
                        <div className="chart-title">
                            <div>Chart Summary</div>
                            <div className="modal-subtext">One-page summary of Spotify Top 200 charts</div>
                        </div>
                    </div>
                    <div className="cross-icon">
                        <Ripples >
                            <FontIcon
                                iconName="cross"
                                size="small"
                                onClick={handleCloseEl}
                            />
                        </Ripples>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="chart-modal-content">
                        <div className="points-view chart-points">
                            <div className="modal-title">Summarised stats from 3 point-of-views:</div>
                            <ol className="modal-subtext">
                                <li>Track-based analysis: Number of tracks featuring on the top 200 </li>
                                <li>Stream-based analysis: Stream volume for tracks appearing on the top 200 </li>
                                <li>Artist-based analysis: Number of artists appearing on the chart</li>
                            </ol>
                        </div>
                        <div className="multiple-ways chart-points">
                            <div className="modal-title">Multiple ways to view insights from the summary table:</div>
                            <ol className="modal-subtext">
                                <li>Label comparisons</li>
                                <li>Toggle between absolute values and percent share</li>
                                <li>View by totals or average weekly numbers</li>
                            </ol>
                        </div>
                        <div className="identify-chart chart-points">
                            <div className="modal-title">Identify chart movers. Discover:</div>
                            <ol className="modal-subtext">
                                <li>Chart entries (new tracks on the chart that weren’t charting a week earlier)</li>
                                <li>Exits (tracks charted a week earlier but not charting in the latest or selected week) </li>
                                <li>Top artists (based on number of charting tracks)</li>
                            </ol>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ChartSummaryModal;