
import { useState } from "react";
import Ripples from 'react-ripples';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TouchRipple from '@material-ui/core/TouchRipple';

import FontIcon from "../../FontIcon/FontIcon";

import '../ChartSummaryModal/ChartSummaryModal.scss';

const GenreMoodModal = () => {

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
        <div className="track-modal-component">
            <div className="date-content" onClick={handleClick} open={open} role="presentation" >
                <Ripples >
                    <FontIcon iconName="info_circle" size="medium" color="grey" tooltip="Info" onClick={handleClick} open={open} role="presentation" />
                </Ripples>
            </div>
            <Dialog open={openel} onClose={handleCloseEl} className="model-template track-modal">
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon iconName="info_circle" size="medium" />
                        <div className="chart-title">
                            <div>Genre, Language, and Mood</div>
                            <div className="modal-subtext">Analyse the charts by genre, language or mood (or combination of those).</div>
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
                        <div className="label-performance chart-points">
                            <div className="modal-title">Analyse track’s genre, language, and mood combinations through 4 options:</div>
                            <ol className="modal-subtext">
                                <li>Chart total (Overall top 200 performance)</li>
                                <li>Labels</li>
                                <li>Local vs. International</li>
                                <li>Rank categories (track positions categorised in buckets such as 1 to 5, 6 to 10 etc.)</li>
                            </ol>
                        </div>
                        <div className="label-performance chart-points">
                            <div className="modal-title">Information can be viewed through 3 lenses:</div>
                            <ol className="modal-subtext">
                                <li>All tracks – Stream share based on all tracks from the chosen view</li>
                                <li>Track entries – New tracks on the chart that weren’t charting a week earlier</li>
                                <li>Track exits – Tracks that charted a week earlier but not charting in the latest or selected week</li>
                            </ol>
                        </div>
                        <div className="label-performance chart-points">
                            <div className="modal-title">View analysis by volume of streams or number of tracks charting.</div>
                        </div>
                        <div className="modal-subtext">Trend analysis for top 10 genre, language and mood combinations.</div>
                        <div className="modal-subtext">Identify the tracks in your selected genre, language and mood views. Select a data point on the trend line to show track list based on your selection in the table below.</div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default GenreMoodModal;