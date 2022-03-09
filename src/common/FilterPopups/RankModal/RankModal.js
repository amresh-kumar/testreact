import { useEffect } from "react";
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { rankList } from "../../../redux/actions/Filter";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomButton from "../../form/CustomButton/CustomButton"
import FontIcon from "../../FontIcon/FontIcon";
// import Input from '../../form/Input/Input';

let RankModal = ({ open, handleClose, handleSubmit, _rankList, rankDetails, fromDateDetails, toDateDetails, sendRanData, resetRank, countrySelected }) => {
    // const [searchFilter, setsearchFilter] = useState(false);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _rankList(fromDateDetails, toDateDetails, countrySelected);
        }
    }, [fromDateDetails, toDateDetails, countrySelected]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}
                className="modal-filter small "
            >
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon
                            iconName="award"
                        />
                        <div>Rank</div>
                    </div>
                    <div className="reset">
                        <CustomButton type="button" onClick={resetRank}
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
                            {rankDetails.map((list) => (
                                <li onClick={() => sendRanData(list.value)} key={list.index}>{list.value}</li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

RankModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _rankList: PropTypes.func,
    sendRanData: PropTypes.func,
    resetRank: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    rankDetails: PropTypes.array,
    handleSubmit: PropTypes.func,
    countrySelected: PropTypes.string,

};

RankModal.defaultProps = {
    open: false,
    handleClose: () => { },
    _rankList: () => { },
    rankDetails: [],
    handleSubmit: () => { },
    sendRanData: () => { },
    resetRank: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",

};

const mapDispatchToProps = {
    _rankList: rankList,
};

const mapStateToProps = ({ Common, Filter, Home }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { rankDetails } = Filter;
    const {  countrySelected } = Home;
    return { rankDetails, countrySelected, fromDateDetails, toDateDetails };
};

RankModal = reduxForm({
    form: "RankModalForm",
    enableReinitialize: true
})(RankModal);

export default connect(mapStateToProps, mapDispatchToProps)(RankModal);