
import { useState } from "react";
import Ripples from 'react-ripples';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FontIcon from "../../../common/FontIcon/FontIcon";

import '../ChartSummaryModal/ChartSummaryModal.scss';

const MarketShareModal = () => {

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
        <div className="marketshare-modal-component">
            <div className="date-content" onClick={handleClick} open={open} role="presentation">
                <Ripples >
                    <FontIcon iconName="info_circle" size="medium" color="grey" tooltip="Info" onClick={handleClick} open={open} role="presentation" />
                </Ripples>
            </div>
            <Dialog open={openel} onClose={handleCloseEl} className="model-template marketshare-modal">
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon iconName="info_circle" size="medium" />
                        <div className="chart-title">
                            <div>Market Share – Stream Based</div>
                            <div className="modal-subtext">Stream share compared to overall Spotify platform streams from the market.</div>
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
                            <div className="modal-title">3 view options for your analysis:</div>
                            <ol className="modal-subtext">
                                <li>Labels</li>
                                <li>Local vs. International (categorisation based on ISRCs)</li>
                                <li>Rank categories (track positions categorised in buckets such as 1 to 5, 6 to 10 etc.)</li>
                            </ol>
                        </div>
                        <div className="viewed-levels chart-points">
                            <div className="modal-title">Information can be viewed on 4 levels: </div>
                            <ol className="modal-subtext">
                                <li>All tracks - Stream share based on all tracks from the chosen view</li>
                                <li>Track entries – New tracks on the chart that weren’t charting a week earlier</li>
                                <li>Debut artists - Artists who have never released a song before on Spotify</li>
                                <li>Breakthrough artists – Artists who featured on Top 200 after a year or more</li>
                            </ol>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default MarketShareModal;