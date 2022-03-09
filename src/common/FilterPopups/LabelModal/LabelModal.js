import { useEffect } from "react";
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { labelList } from "../../../redux/actions/Filter";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomButton from "../../form/CustomButton/CustomButton"
import FontIcon from "../../FontIcon/FontIcon";

import Sme from "../../../assets/images/svg/sme_logo.svg";
import Umg from "../../../assets/images/svg/umg_logo.svg";
import Wmg from "../../../assets/images/svg/wmg_logo.svg";

// import Input from '../../form/Input/Input';
import "./LabelModal.scss"

let LabelModal = ({ open, handleClose, handleSubmit, _labelList, labelDetails, fromDateDetails, toDateDetails, sendLabData, resetLabel, resetall, countrySelected }) => {
    // const [searchFilter, setsearchFilter] = useState(false);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _labelList(fromDateDetails, toDateDetails, countrySelected);
            resetall();
        }

    }, [fromDateDetails, toDateDetails, countrySelected]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}
                className="modal-filter label-modal"
            >
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon
                            iconName="music"
                        />
                        <div>Label</div>
                    </div>
                    <div className="reset">
                        <CustomButton type="button" onClick={resetLabel}
                            name="RESET" outline></CustomButton>
                            <Ripples>
                                <FontIcon
                                    iconName="cross"
                                    onClick={handleClose}
                                    size="small"
                                />
                        </Ripples>
                    </div>
                </DialogTitle>
                <DialogContent>
                <div className="top-labels">
                            <div className="sme-label labels" onClick={() => sendLabData("SME")}>
                                <div><img src={Sme} alt="Sony Music" /></div>
                            </div>
                            <div className="umg-label labels" onClick={() => sendLabData("UMG")}>
                                <div><img src={Umg} alt="universal Music" /></div>
                            </div>
                            <div className="wmg-label labels" onClick={() => sendLabData("WMG")}>
                                <div><img src={Wmg} alt="Warner Music" /></div>
                            </div>
                            <div className="indie-label labels" onClick={() => sendLabData("Indie")}>
                                Indies
                            </div>
                        </div>
                    <div className="modal-wrapper">
                        {/* <form onSubmit={handleSubmit(onSubmit)}>
                            <Field
                                component={Input}
                                fullWidth
                                placeholder="Search by Genres"
                                type="text"
                                name="search"
                                isSearch={searchFilter ? "cross" : "search"}
                            />
                        </form> */}
                        <ul>
                            {labelDetails.map((list) => (
                                <li onClick={() => sendLabData(list.label_name)} key={list.index}>{list.label_name}</li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

LabelModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _labelList: PropTypes.func,
    sendLabData: PropTypes.func,
    resetLabel: PropTypes.func,
    resetall: PropTypes.func,
    labelDetails: PropTypes.array,
    handleSubmit: PropTypes.func,
    countrySelected: PropTypes.string,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,


};

LabelModal.defaultProps = {
    open: false,
    handleClose: () => { },
    _labelList: () => { },
    labelDetails: [],
    handleSubmit: () => { },
    sendLabData: () => { },
    resetLabel: () => { },
    resetall: () => { },
    countrySelected: "",
    fromDateDetails: "",
    toDateDetails: "",


};

const mapDispatchToProps = {
    _labelList: labelList,
};

const mapStateToProps = ({  Common, Filter, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { labelDetails } = Filter;
    const { countrySelected } = Home;
    return { labelDetails, countrySelected, fromDateDetails, toDateDetails };
};

LabelModal = reduxForm({
    form: "labelModalForm",
    enableReinitialize: true
})(LabelModal);

export default connect(mapStateToProps, mapDispatchToProps)(LabelModal);