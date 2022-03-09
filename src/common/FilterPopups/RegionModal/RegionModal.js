import { useEffect } from "react";
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { countryList } from "../../../redux/actions/Home";
import { flagImages } from "../../Flagimages.js";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FontIcon from "../../FontIcon/FontIcon";
// import Input from '../../form/Input/Input';

let RegionModal = ({ open, handleClose, handleSubmit, _countryList, countryDetails, sendRegData }) => {
    // const [searchFilter, setsearchFilter] = useState(false);

    useEffect(() => {
        _countryList();
    }, []);

    // const countryDisplay = (country, name, images) => {
    //     switch (country) {
    //         case name:
    //             return <div className="country-flags" key={name}><img src={images} alt="Flags" /><span>{name}</span></div>
    //         default:
    //             return null
    //     }
    // }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}
                className="modal-filter region-filter"
            >
                <DialogTitle>
                    <div className="modal-title">
                        <FontIcon
                            iconName="globe"
                        />
                        <div>Global</div>
                    </div>
                    <Ripples>
                        <FontIcon
                            iconName="cross"
                            size="small" 
                            onClick={handleClose}/>        
                    </Ripples>
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
                            {countryDetails.map((list) => (
                                <li 
                                onClick={() => sendRegData(list.country_code, list.country_name)} 
                                key={list.country_code}>
                                   <div className="country-flags"><img src={flagImages[list.country_code]} alt="Flags" key={list.country_code}/><span>{list.country_name}</span></div>
                                    </li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

RegionModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _countryList: PropTypes.func,
    sendRegData: PropTypes.func,
    countryDetails: PropTypes.array,
    handleSubmit: PropTypes.func,

};

RegionModal.defaultProps = {
    open: false,
    handleClose: () => { },
    _countryList: () => { },
    countryDetails: [],
    handleSubmit: () => { },
    sendRegData: () => { },

};

const mapDispatchToProps = {
    _countryList: countryList,
};

const mapStateToProps = ({ Home }) => {
    const { countryDetails } = Home;
    return { countryDetails };
};

RegionModal = reduxForm({
    form: "RegionModalForm",
    enableReinitialize: true
})(RegionModal);

export default connect(mapStateToProps, mapDispatchToProps)(RegionModal);