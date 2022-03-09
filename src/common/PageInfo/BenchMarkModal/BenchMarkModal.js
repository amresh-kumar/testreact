
import { useState } from "react";
import Ripples from 'react-ripples'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FontIcon from "../../../common/FontIcon/FontIcon";

import '../ChartSummaryModal/ChartSummaryModal.scss';

const BenchMarkModal = () => {

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
        <div className="benchmark-modal-component">
            <div className="date-content">
                <Ripples >
                    <FontIcon iconName="info_circle" size="medium" color="grey" tooltip="Info" onClick={handleClick} open={open} role="presentation" />
                </Ripples>
            </div>
            <Dialog open={openel} onClose={handleCloseEl} className="model-template benchmark-modal">
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon iconName="info_circle" size="medium" />
                        <div className="chart-title">
                            <div>Benchmark</div>
                            <div className="modal-subtext"><b>Track Performance Benchmark</b></div>
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
                        <div className="modal-subtext">Find out how many streams are required for a track to reach the next rank category and how its streaming performance compares against the average streams in that position. You have the option to select a time range which will show an average stream number based on your selection. </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default BenchMarkModal;