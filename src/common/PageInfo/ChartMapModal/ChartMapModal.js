
import { useState } from "react";
import Ripples from 'react-ripples';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TouchRipple from '@material-ui/core/TouchRipple';

import FontIcon from "../../FontIcon/FontIcon";

import '../ChartSummaryModal/ChartSummaryModal.scss';

const ChartMapModal = () => {

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
                            <div>Chart Map</div>
                            <div className="modal-subtext">Regional to city-level insights on label’s chart share.</div>
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
                        <div className="chart-map chart-points">
                            <div className="modal-title">Chart map  Regional to city-level insights on label’s chart share and track positions:</div>
                            <ol className="modal-subtext">
                                <li>Choose a label to view chart share from regional to city levels</li>
                                <li>Search a track to find its track position</li>
                            </ol>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default ChartMapModal;