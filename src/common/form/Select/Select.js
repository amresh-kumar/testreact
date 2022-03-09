import PropTypes from "prop-types";
// Material-UI
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
//Css
import "./Select.scss";

const Select = ({
    disabled, onBlur, required, onChange,
    input, meta: { touched, error, warning }, optionData,
    optionValueKey, optionLabelKey, placeholder, value
}) => {
    return (
        <div className="Select">
            <TextField
                select
                className="FormSelect"
                disabled={disabled}
                value={input.value || value}
                onChange={onChange}
                onBlur={onBlur}
                inputProps={{
                    name: input.name
                }}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: `label-root ${touched && error ? "error" : ""}`,
                        focused: "label-focused"
                    }
                }}
                SelectProps={{
                    disableUnderline: true,
                    classes: {
                        root: `select-root ${input.value === "select" ? "label-color" : ""} ${required ? "required" : ""} ${touched && error ? "error" : ""}`,
                        select: "selected",
                        disabled: "select-disabled"
                    },
                    MenuProps: {
                        className: "select-menu-item",
                        getContentAnchorEl: null,
                        anchorOrigin: { vertical: "top", horizontal: "left" },
                        transformOrigin: { vertical: "top", horizontal: "left" }
                    }
                }}
                {...input}
            >
                <MenuItem value="select" disabled>{placeholder}</MenuItem>
                {optionData && optionData.length > 0 && optionData.map((item, i) => {
                    return (
                        <MenuItem key={i} value={item[optionValueKey]}>{item[optionLabelKey]}</MenuItem>
                    );
                })}
            </TextField>
            <span className="field-errors">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </span>
        </div>
    )
}

Select.propTypes = {
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    input: PropTypes.instanceOf(Object),
    children: PropTypes.instanceOf(Object),
    meta: PropTypes.instanceOf(Object),
    required: PropTypes.bool,
    prefixValue: PropTypes.string,
    onChange: PropTypes.func,
    optionData: PropTypes.instanceOf(Array),
    optionValueKey: PropTypes.string,
    optionLabelKey: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ])
};

Select.defaultProps = {
    disabled: false,
    onBlur: () => { },
    name: "",
    input: {},
    children: {},
    meta: {},
    required: false,
    onChange: () => { },
    optionData: [],
    optionValueKey: "",
    optionLabelKey: "",
    prefixValue: "",
    placeholder: "Select",
    value: null,
};

export default Select;
