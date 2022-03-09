import PropTypes from "prop-types";
// material-ui
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FontIcon from "../../FontIcon/FontIcon";
// css
import "./CustomButton.scss"

const CustomButton = ({
    name, type, disabled, plain, outline, rounded, onClick,
    iconOnly, iconName, size, color, place, btnSize, btnColor, iconBtn
}) => {
    let btnClass = "";
    const tempArray = [];
    if (disabled) {
        tempArray.push("disabled-btn");
    }
    if (plain) {
        tempArray.push("trs-btn");
    }
    if (outline) {
        tempArray.push("outline-btn");
    }
    if (rounded) {
        tempArray.push("rounded-btn");
    }
    if (iconBtn) {
        tempArray.push("iconBtn");
    }
    if (btnSize !== "") {
        tempArray.push(btnSize);
    }
    if (btnColor !== "") {
        tempArray.push(btnColor);
    }
    if (tempArray.length > 0) {
        btnClass = tempArray.join(" ");
    }

    if (iconOnly) {
        return (
            <IconButton
                type={type}
                className={`Button icon-btn ${btnClass}`}
                disabled={disabled}
                onClick={onClick}
            >
                <FontIcon
                    iconName={iconName}
                    size={size}
                    color={color}
                    place={place}
                    tooltip={name}
                />
            </IconButton>
        );
    }
    return (
        <Button
            type={type}
            className={`Button normal-btn ${btnClass}`}
            disabled={disabled}
            onClick={onClick}
        >
            {iconName && iconName !== "" && (
                <FontIcon iconName={iconName} size={size} />
            )}
            <span className="btn-text">{name}</span>
        </Button>
    );
};

CustomButton.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    plain: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    onClick: PropTypes.func,
    iconName: PropTypes.string,
    iconOnly: PropTypes.bool,
    size: PropTypes.string,
    color: PropTypes.string,
    btnSize: PropTypes.string,
    place: PropTypes.string,
    btnColor: PropTypes.string,
    iconBtn: PropTypes.bool
};

CustomButton.defaultProps = {
    name: "",
    type: null,
    disabled: false,
    plain: false,
    outline: false,
    rounded: false,
    onClick: () => { },
    iconName: "",
    iconOnly: false,
    size: "default",
    color: "",
    btnSize: "",
    place: "bottom",
    btnColor: "",
    iconBtn: false
};

export default CustomButton;
