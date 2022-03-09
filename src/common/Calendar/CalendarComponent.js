
import { useState, useEffect } from "react";
import Ripples from 'react-ripples';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { Calendar } from "react-multi-date-picker"

import { selectedWeek, fromDateSelected, toDateSelected } from "../../redux/actions/Common";
import { formatDate } from "../../common/getSelectedDate";

import FontIcon from "../../common/FontIcon/FontIcon";
import CustomButton from '../../common/form/CustomButton/CustomButton';

import './CalendarComponent.scss';
import moment from "moment";

const CalendarComponent = ({ _selectedWeek, _fromDateSelected, fromDateDetails, _toDateSelected, toDateDetails, totalWeekSelected }) => {

    //for tabs
    const dayCalc = [2, 3, 4, 5, 6, 0, 1];
    const [anchorEl, setAnchorEl] = useState(null);
    const [openel, setOpenel] = useState(false);

    const open = Boolean(anchorEl);

    //For date
    const [week, setWeek] = useState(totalWeekSelected ? totalWeekSelected : 1);
    const [dateValue, setDateValue] = useState();
    const [calcDate, setCalcDate] = useState([]);

    useEffect(() => {
        if (totalWeekSelected) {
            _selectedWeek(week)
        }
    }, [totalWeekSelected]);

    useEffect(() => {
        if (calcDate.length > 0) {
            _fromDateSelected(calcDate[0]);
            _toDateSelected(calcDate[1]);
        }
        else {
            const dates = setCalDate(new Date());
            _fromDateSelected(getDateVal(dates[0]));
            _toDateSelected(getDateVal(dates[1]));
            setDateValue([dates[0], dates[1]]);
        }
    }, [calcDate]);

    const handleFocusedDateChange = (focusedDate) => {
        const selDate = new Date(JSON.parse(JSON.stringify(focusedDate)));
        const dates = setCalDate(selDate);
        setDateValue([dates[0], dates[1]]);
    }

    const setCalDate = (selDate) => {
        const dateOffset1 = (24 * 60 * 60 * 1000) * (dayCalc[selDate.getDay()]);
        const dateOffset2 = (24 * 60 * 60 * 1000) * ((week - 1) * 7);
        const weekDateOffset = (24 * 60 * 60 * 1000) * 6;
        const currWeekOffset = (24 * 60 * 60 * 1000) * ((dayCalc[selDate.getDay()]) + 7);

        const selectedOffset = isCurrentWeek(selDate) ? currWeekOffset : dateOffset1;
        const weekStart = new Date(selDate.getTime() - selectedOffset);
        const fromDate = new Date(weekStart.getTime() - dateOffset2);
        const toDate = new Date(weekStart.getTime() + weekDateOffset);

        return [fromDate, toDate];
    }

    const isCurrentWeek = (selDate) => {
        return moment(selDate).isoWeek() === moment().isoWeek();
    }

    const getDateVal = (value) => {
        const monthCalc = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return value.getFullYear() + '-' + monthCalc[value.getMonth()] + '-' + value.getDate()
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenel(true);
        setDateValue([fromDateDetails, toDateDetails]);
    };

    const handleCloseEl = () => {
        setOpenel(false);
    };

    const handleChange = (event, newValue) => {
        setWeek(newValue);
    };

    const updateDate = () => {
        setOpenel(false);
        return setCalcDate([getDateVal(dateValue[0]), getDateVal(dateValue[1])]);
    }

    return (
        <div className="calendar-component">
            <div className="date-content" onClick={handleClick} open={open} role="presentation">
                <FontIcon iconName="calender" size="small" />
                <div>
                    {formatDate(fromDateDetails)} - {formatDate(toDateDetails)}
                </div>
            </div>
            <Dialog open={openel} onClose={handleCloseEl}>
                <DialogTitle>
                    <div className="calendar-title">
                        <FontIcon iconName="calender" size="medium" /> Date Range
                    </div>
                    <div className="cross-icon">
                        <Ripples>
                            <FontIcon
                                iconName="cross"
                                size="small"
                                onClick={handleCloseEl}
                            />
                        </Ripples>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="week-buttons">
                        <Box>
                            <Tabs
                                value={week}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs"
                            >
                                <Tab value={1} className="tab-summary"
                                    label={
                                        <div className="label">
                                            <span className={'tabLabel'}>1 Week</span>
                                        </div>
                                    } />
                                <Tab value={2} className="tab-comparison"
                                    label={
                                        <div className="label">
                                            <span className={'tabLabel'}>2 Weeks</span>
                                        </div>
                                    } />
                                <Tab value={4} className="tab-performance"
                                    label={
                                        <div className="label">
                                            <span className={'tabLabel'}>4 Weeks</span>
                                        </div>
                                    } />
                                <Tab value={8} className="tab-share"
                                    label={
                                        <div className="label">
                                            <span className={'tabLabel'}>8 Weeks</span>
                                        </div>
                                    } />
                                <Tab value={12} className="tab-tracks"
                                    label={
                                        <div className="label">
                                            <span className={'tabLabel'}>12 Weeks</span>
                                        </div>
                                    } />
                                <Tab value={26} className="tab-artists"
                                    label={
                                        <div className="label">
                                            <span className={'tabLabel'}>26 Weeks</span>
                                        </div>
                                    } />
                                <Tab value={52} className="tab-lang"
                                    label={
                                        <div className="label">
                                            <span className={'tabLabel'}>1 Year</span>
                                        </div>
                                    } />
                            </Tabs>
                        </Box>
                    </div>
                    <div className="calendar-content">
                        <Calendar
                            range
                            weekPicker
                            numberOfMonths={2}
                            value={dateValue}
                            onFocusedDateChange={handleFocusedDateChange}
                            maxDate={new Date()}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <CustomButton type="button" name="Cancel" onClick={() => handleCloseEl()} btnSize="large" outline></CustomButton>
                    <CustomButton
                        type="submit"
                        name="UPDATE"
                        btnSize="large"
                        onClick={() => updateDate()}>
                    </CustomButton>
                </DialogActions>
            </Dialog>

        </div>
    );
}
CalendarComponent.propTypes = {
    name: PropTypes.string,
    _selectedWeek: PropTypes.func,
    _fromDateSelected: PropTypes.func,
    _toDateSelected: PropTypes.func,
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    totalWeekSelected: PropTypes.string
};

CalendarComponent.defaultProps = {
    name: "",
    _selectedWeek: () => { },
    _fromDateSelected: () => { },
    _toDateSelected: () => { },
    fromDateDetails: " ",
    toDateDetails: " ",
    totalWeekSelected: " "
};

const mapDispatchToProps = {
    _selectedWeek: selectedWeek,
    _fromDateSelected: fromDateSelected,
    _toDateSelected: toDateSelected
};

const mapStateToProps = ({ Common }) => {
    const { fromDateDetails, toDateDetails, totalWeekSelected } = Common;
    return { fromDateDetails, toDateDetails, totalWeekSelected }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);