import { useEffect } from "react";
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { genreList } from "../../../redux/actions/Filter";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomButton from "../../form/CustomButton/CustomButton"
import FontIcon from "../../FontIcon/FontIcon";
// import Input from '../../form/Input/Input';

let GenreModal = ({ open, handleClose, handleSubmit, _genreList, genreDetails, fromDateDetails, toDateDetails, sendGenData, resetGenre, countrySelected }) => {
    // const [searchFilter, setsearchFilter] = useState(false);

    useEffect(() => {
        if (fromDateDetails && toDateDetails && countrySelected) {
            _genreList(fromDateDetails, toDateDetails, countrySelected);
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
                            iconName="guitar"
                        />
                        <div>Genres</div>
                    </div>
                    <div className="reset">
                        <CustomButton type="button" onClick={resetGenre}
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
                            {genreDetails.map((list) => (
                                <li onClick={() => sendGenData(list.value)} key={list.index}>{list.value}</li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

GenreModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _genreList: PropTypes.func,
    sendGenData: PropTypes.func,
    resetGenre: PropTypes.func,
    genreDetails: PropTypes.array,
    handleSubmit: PropTypes.func,
    countrySelected: PropTypes.string,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,

};

GenreModal.defaultProps = {
    open: false,
    handleClose: () => { },
    _genreList: () => { },
    genreDetails: [],
    handleSubmit: () => { },
    sendGenData: () => { },
    fromDateDetails: "",
    toDateDetails: "",
    resetGenre: () => { },
    countrySelected: "",

};

const mapDispatchToProps = {
    _genreList: genreList,
};

const mapStateToProps = ({ Common, Filter, Home  }) => {
    const { fromDateDetails, toDateDetails } = Common;
    const { genreDetails } = Filter;
    const { countrySelected } = Home;
    return { genreDetails, countrySelected, fromDateDetails, toDateDetails };
};

GenreModal = reduxForm({
    form: "genreModalForm",
    enableReinitialize: true
})(GenreModal);

export default connect(mapStateToProps, mapDispatchToProps)(GenreModal);