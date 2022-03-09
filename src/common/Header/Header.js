import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { reduxForm } from "redux-form";
import { useHistory } from "react-router-dom";

import { countryList, countrySelected } from "../../redux/actions/Home";
// import Select from "../../common/form/Select/Select";
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import FontIcon from "../../common/FontIcon/FontIcon";

import Calendar from "../Calendar/CalendarComponent";
 import RegionModal from "../FilterPopups/RegionModal/RegionModal";
import CustomButton from '../../common/form/CustomButton/CustomButton';
import SonyLogo from "../../assets/images/svg/SonyMusic_Logo.svg";
import "./Header.scss"


let Header = ({ _countryList, _countrySelected, }) => {
   
    const history = useHistory();

    const [open, setOpen] = useState(false)
    const [header, setHeader] = useState("header");
    const [countryvalue, setCountryValue] = useState("in");
    // const pathName = history.location.pathname;
    const [countryName, setCountryName] = useState("India");
    const [showBack, setShowBack] = useState(false);
    
    useEffect(() => {
        const pathName = history.location.pathname;
        if (pathName.includes("trackdetails") || pathName.includes("artistdetails")) {
            setShowBack(true)
        }
        else {
            setShowBack(false)
        }
    }, [history.location.pathname]);

    useEffect(() => {
        changeBackground();
        window.addEventListener("scroll", changeBackground);
    }, []);

    useEffect(() => {
        _countryList();
        if (countryvalue) {
            _countrySelected(countryvalue);
        }
    }, [countryvalue]);


    const changeBackground = () => {
        if (window.scrollY >= 100) {
            setHeader(true)
        }
        else {
            setHeader(false)
        }
    }

    const homePage = () => {
        history.push("/home");
    };

    const goBackPage = () => {
		history.goBack();
        setShowBack(false)
	}

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const sendRegData = (code, name) => {
        setCountryValue(code);
        setCountryName(name)
        setOpen(false);
    };

    const options = {
        effect: "solid",
        place: "top"
    }

    return (
        <div>
            <div className={header ? "header active" : "header"}>
                <div className="header-wrapper">
                    <div className="app-logo" onClick={homePage} role={"presentation"}>
                        <img src={SonyLogo} alt="Sony_logo" />
                    </div>
                    <div className="header-action">
                     < div className={ showBack ? 'display-calendar' : 'display-calendar-active' }>
                        <div className="date-sort">
                            <Calendar />
                        </div>
                        <div className="filter-dropdown" onClick={openDialog} role="presentation">
                            <div className="location">
                                <FontIcon
                                    iconName="globe"
                                    size="small"
                                />
                                <EllipsisToolTip className="title" options={options}>{countryName ? countryName : "India"}</EllipsisToolTip>
                            </div>
                            <div>
                                <FontIcon
                                    iconName="down_arrow"
                                />
                            </div>
                        </div>
                        <RegionModal open={open === true} handleClose={closeDialog} sendRegData={sendRegData} />
                        </div>         
                        {
                            showBack ? <>
                                <div className="country-display">
                                    <FontIcon 
                                      iconName="globe"
                                      size="medium"
                                      />
                                    {countryName}
                                </div>
                                <CustomButton 
                                    type="submit" 
                                    name="Back" 
                                    iconName="arrow" 
                                    btnSize="large" 
                                    btnColor="grey"
                                    size="medium"
                                    onClick={goBackPage}>
                                </CustomButton>
                            </> : null }  
                        {/* <div className="filter-dropdown" onClick={openDialog} role="presentation">
                            <div className="title">{regionData ? regionData : "India"}</div>
                            <FontIcon
                                iconName="down_arrow"
                                color="white"
                            />
                        </div>
                        <RegionModal open={open} handleClose={closeDialog} sendDataToParent={sendDataToParent} /> */}

                        {/* <div className="location-dropdown">
                            <div className="location">
                                <FontIcon
                                    iconName="globe"
                                    size="small"
                                />
                                <div className="title">India</div>
                            </div>
                            <FontIcon
                                iconName="down_arrow"
                                size="small"
                                color="white"
                            />
                        </div> */}
                        {/* <div className="user">
                            <div className="user-name">KN</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    _countryList: PropTypes.func,
    _countrySelected: PropTypes.func,
};

Header.defaultProps = {
    _countryList: () => { },
    _countrySelected: () => { },

};
const mapDispatchToProps = {
    _countryList: countryList,
    _countrySelected: countrySelected
};

const mapStateToProps = () => {
    return { };
};

Header = reduxForm({
    form: "checkheader",
    enableReinitialize: true
})(Header);

export default connect(mapStateToProps, mapDispatchToProps)(Header);

