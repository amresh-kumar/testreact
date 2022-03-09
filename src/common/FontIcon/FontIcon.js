import PropTypes from "prop-types";
// material-ui
import Tooltip from "@material-ui/core/Tooltip";
// css
import "./FontIcon.scss";

const FontIcon = ({
	tooltip, place, iconName, size, color, styleInfo, onClick
}) => {
	return (
		<Tooltip title={tooltip} placement={place} >
			<span className={`FontIcon icon-${iconName} ${size}`} style={{ color, ...styleInfo }} onClick={onClick} color={color} role="presentation" />
		</Tooltip>
	);
};

FontIcon.propTypes = {
	tooltip: PropTypes.string,
	place: PropTypes.string,
	size: PropTypes.string,
	color: PropTypes.string,
	iconName: PropTypes.string,
	styleInfo: PropTypes.instanceOf(Object),
	onClick: PropTypes.func,
};

FontIcon.defaultProps = {
	tooltip: "",
	place: "bottom",
	size: "default",
	color: "",
	iconName: "",
	styleInfo: {},
	onClick: () => { },
};

export default FontIcon;