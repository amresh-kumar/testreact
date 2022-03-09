
import { useState } from "react";
import Ripples from 'react-ripples';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TouchRipple from '@material-ui/core/TouchRipple';

import FontIcon from "../../FontIcon/FontIcon";

import '../ChartSummaryModal/ChartSummaryModal.scss';

const ArtistDetailsModal = () => {

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
        <div className="artistdetails-modal-component">
            <div className="date-content" onClick={handleClick} open={open} role="presentation" >
                <Ripples >
                    <FontIcon iconName="info_circle" size="medium" color="grey" tooltip="Info" onClick={handleClick} open={open} role="presentation" />
                </Ripples>
            </div>
            <Dialog open={openel} onClose={handleCloseEl} className="model-template artistdetails-modal">
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon iconName="info_circle" size="medium" />
                        <div className="chart-title">
                            <div>Artist Details</div>
                            <div className="modal-subtext"><b>Artist Details</b></div>
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
                        <div className="chart-points chart-performance">
                            <div className="modal-title">Explore chart performance of the artist through 3 views:</div>
                            <ol className="modal-subtext">
                                <li>Charting tracks’ position</li>
                                <li>Artist’s overall streaming volume from the chart</li>
                                <li>Stream share of Top 200 and overall platform</li>
                            </ol>
                        </div>
                        <div className="chart-points chart-performance">
                            <div className="modal-title">Quick view of latest week’s charting track list.</div>
                            <div className="modal-title">A Chart Map showing country to city-level views of charting tracks for the artist</div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default ArtistDetailsModal;