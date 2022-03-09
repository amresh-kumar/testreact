import { useEffect } from "react";
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { moodList } from "../../../redux/actions/Filter";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomButton from "../../form/CustomButton/CustomButton"
import FontIcon from "../../FontIcon/FontIcon";
// import Input from '../../form/Input/Input';

let MoodModal = ({ open, handleClose, handleSubmit, _moodList, moodDetails, fromDateDetails, toDateDetails, sendModData, resetMood, countrySelected }) => {
    // const [searchFilter, setsearchFilter] = useState(false);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _moodList(fromDateDetails, toDateDetails, countrySelected);
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}
                className="modal-filter"
            >
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon
                            iconName="star"
                        />
                        <div>Mood</div>
                    </div>
                    <div className="reset">
                        <CustomButton type="button" onClick={resetMood}
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
                            {moodDetails.map((list) => (
                                <li onClick={() => sendModData(list.value)} key={list.index}>{list.value}</li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

MoodModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _moodList: PropTypes.func,
    sendModData: PropTypes.func,
    resetMood: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    moodDetails: PropTypes.array,
    handleSubmit: PropTypes.func,
    countrySelected: PropTypes.string,

};

MoodModal.defaultProps = {
    open: false,
    handleClose: () => { },
    _moodList: () => { },
    moodDetails: [],
    handleSubmit: () => { },
    sendModData: () => { },
    resetMood: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",

};

const mapDispatchToProps = {
    _moodList: moodList,
};

const mapStateToProps = ({ Common, Filter, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { moodDetails } = Filter;
    const { countrySelected } = Home;
    return { moodDetails, countrySelected, fromDateDetails, toDateDetails };
};

MoodModal = reduxForm({
    form: "MoodModalForm",
    enableReinitialize: true
})(MoodModal);

export default connect(mapStateToProps, mapDispatchToProps)(MoodModal);