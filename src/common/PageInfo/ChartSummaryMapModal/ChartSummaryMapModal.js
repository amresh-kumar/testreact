
import { useState } from "react";
import Ripples from 'react-ripples';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FontIcon from "../../FontIcon/FontIcon";

import '../ChartSummaryModal/ChartSummaryModal.scss';

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
                            <div>Chart Map</div>
                            <div className="modal-subtext">Obtain city-level insights</div>
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
                        <div className="city-level chart-points">
                            <div className="modal-title">Use the Chart Map to zoom in and obtain city-level insights for:</div>
                            <ol className="modal-subtext">
                                <li>Labels’ chart share</li>
                                <li>Track’s chart position</li>
                            </ol>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ChartSummaryModal;