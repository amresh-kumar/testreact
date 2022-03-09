
import { useState } from "react";
import Ripples from 'react-ripples';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TouchRipple from '@material-ui/core/TouchRipple';

import FontIcon from "../../FontIcon/FontIcon";

import '../ChartSummaryModal/ChartSummaryModal.scss';

const CompetativeModal = () => {

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
                            <div>Competitive Comparison</div>
                            <div className="modal-subtext">Majors & indies across multiple categories, including genre, mood & language combinations.</div>
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
                            <div className="modal-title">Analyse label performance across 3 categories:</div>
                            <ol className="modal-subtext">
                                <li>Rank categories (track positions categorised in buckets such as 1 to 5, 6 to 10 etc.)</li>
                                <li>Local vs. International</li>
                                <li>Debut and Breakthrough artists</li>
                            </ol>
                        </div>
                        <div className="label-performance chart-points">
                            <div className="modal-title">View analysis by stream volume or number of tracks charting.</div>
                        </div>
                        <div className="modal-subtext">Compare label performance across genre, language and mood space. </div>
                        <div className="modal-subtext">View analysis by volume of streams, number of tracks charting or number of unique artists on the chart.</div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default CompetativeModal;