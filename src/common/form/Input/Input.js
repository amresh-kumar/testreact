import PropTypes from "prop-types";
// Material-UI
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FontIcon from "../../FontIcon/FontIcon";
//CSS
import "./Input.scss";

const Input = ({
    name, type, placeholder, multiline, disabled, required, row, value, onChange, maxLength,
    autoFocus, onBlur, validate, input, meta: { touched, error, warning }, border, isSearch, onClick
}) => {
    const touchedError = touched && error;

    const endAdornment = () => {
        return (
            <span className="end-ador" role="presentation" onClick={onClick}>
                <FontIcon iconName={isSearch} tooltip="search" size="small" color="rgba(0,0,0,0.9)" />
            </span>
        );
    };

    return (
        <div className="Input">
            <TextField
                className="InputField"
                fullWidth
                name={name}
                autoComplete={type === "password" ? "new-password" : "off"}
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                multiline={multiline}
                disabled={disabled}
                rows={row}
                value={value}
                onChange={onChange}
                onWheel={(e) => e.target.blur()}
                onBlur={onBlur}
                validate={validate}
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: `label-root ${touchedError ? "error" : ""}`,
                        focused: "label-focused"
                    }
                }}
                inputProps={{
                    maxLength
                }}
                onInput={(e) => {
                    if (type === "number" && maxLength) {
                        e.target.value = e.target.value.slice(0, maxLength);
                    }
                }}
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        root: `input-root ${required ? "required" : ""} ${touchedError ? "error" : ""} ${border ? "input-border" : ""}`,
                        input: "input-field",
                        focused: "input-focused",
                        disabled: "input-disabled"
                    },
                    endAdornment: isSearch && <InputAdornment className="endAdornment" position="end">{endAdornment()}</InputAdornment>
                }}
                {...input}
            />
            <span className="field-errors">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </span>
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    row: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    input: PropTypes.instanceOf(Object),
    validate: PropTypes.instanceOf(Array),
    meta: PropTypes.instanceOf(Object),
    maxLength: PropTypes.number,
    border: PropTypes.bool,
    onClick: PropTypes.func,
    isSearch: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
};

Input.defaultProps = {
    name: "",
    type: "text",
    placeholder: "",
    multiline: false,
    disabled: false,
    autoFocus: false,
    required: false,
    row: 4,
    value: null,
    onChange: () => { },
    onBlur: () => { },
    input: {},
    validate: [],
    meta: {},
    maxLength: null,
    border: false,
    onClick: () => { },
    isSearch: false,
};

export default Input;
