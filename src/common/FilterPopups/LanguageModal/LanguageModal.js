import { useEffect } from "react";
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { languageList } from "../../../redux/actions/Filter";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomButton from "../../form/CustomButton/CustomButton"
import FontIcon from "../../FontIcon/FontIcon";
// import Input from '../../form/Input/Input';

let LanguageModal = ({ open, handleClose, handleSubmit, _languageList, languageDetails, fromDateDetails, toDateDetails, sendLanData, resetLanguage, countrySelected }) => {
    // const [searchFilter, setsearchFilter] = useState(false);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _languageList(fromDateDetails, toDateDetails, countrySelected);
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
                            iconName="language"
                        />
                        <div>Language</div>
                    </div>
                    <div className="reset">
                        <CustomButton type="button" onClick={resetLanguage}
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
                            {languageDetails.map((list) => (
                                <li onClick={() => sendLanData(list.value)} key={list.index}>{list.value}</li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

LanguageModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _languageList: PropTypes.func,
    sendLanData: PropTypes.func,
    resetLanguage: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    languageDetails: PropTypes.array,
    handleSubmit: PropTypes.func,
    countrySelected: PropTypes.string,


};

LanguageModal.defaultProps = {
    open: false,
    handleClose: () => { },
    _languageList: () => { },
    languageDetails: [],
    handleSubmit: () => { },
    sendLanData: () => { },
    resetLanguage: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",

};

const mapDispatchToProps = {
    _languageList: languageList,
};

const mapStateToProps = ({ Common, Filter, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { languageDetails } = Filter;
    const { countrySelected } = Home;
    return { languageDetails, countrySelected, fromDateDetails, toDateDetails };
};

LanguageModal = reduxForm({
    form: "LanguageModalForm",
    enableReinitialize: true
})(LanguageModal);

export default connect(mapStateToProps, mapDispatchToProps)(LanguageModal);