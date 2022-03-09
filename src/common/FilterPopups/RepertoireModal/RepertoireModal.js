import { useEffect } from "react";
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { repertoireList } from "../../../redux/actions/Filter";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomButton from "../../form/CustomButton/CustomButton"
import FontIcon from "../../FontIcon/FontIcon";
// import Input from '../../form/Input/Input';

let RepertoireModal = ({ open, handleClose, handleSubmit, _repertoireList, repertoireDetails, fromDateDetails, toDateDetails, sendRepData, resetRepertoire, countrySelected }) => {
    // const [searchFilter, setsearchFilter] = useState(false);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _repertoireList(fromDateDetails, toDateDetails, countrySelected);
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}
                className="modal-filter small xsmall"
            >
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon
                            iconName="city"
                        />
                        <div>Repertoire</div>
                    </div>
                    <div className="reset">
                        <CustomButton type="button" onClick={resetRepertoire}
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
                            {repertoireDetails.map((list) => (
                                <li onClick={() => sendRepData(list.value)} key={list.index}>{list.value}</li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

RepertoireModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _repertoireList: PropTypes.func,
    sendRepData: PropTypes.func,
    resetRepertoire: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    repertoireDetails: PropTypes.array,
    handleSubmit: PropTypes.func,
    countrySelected: PropTypes.string,

};

RepertoireModal.defaultProps = {
    open: false,
    handleClose: () => { },
    _repertoireList: () => { },
    repertoireDetails: [],
    handleSubmit: () => { },
    sendRepData: () => { },
    resetRepertoire: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",

};

const mapDispatchToProps = {
    _repertoireList: repertoireList,
};

const mapStateToProps = ({ Common, Filter, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { repertoireDetails } = Filter;
    const { countrySelected } = Home;
    return { repertoireDetails, countrySelected, fromDateDetails, toDateDetails };
};

RepertoireModal = reduxForm({
    form: "RepertoireModalForm",
    enableReinitialize: true
})(RepertoireModal);

export default connect(mapStateToProps, mapDispatchToProps)(RepertoireModal);