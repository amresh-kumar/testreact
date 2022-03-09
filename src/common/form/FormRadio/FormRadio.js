import React from "react";
import PropTypes from "prop-types";
// material-ui
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// css
import './FormRadio.scss';

const FormRadio = ({
  legend,
  name,
  input,
  optionData,
  optionValueKey,
  optionLabelKey,
}) => (
  <FormControl component="fieldset" className="FormRadio">
    {legend && <div className="label">{legend}</div>}
    <RadioGroup
      aria-label={name}
      className="RadioGroup"
      name={name}
      onChange={input.onChange}
      {...input}
    >
      {optionData &&
        optionData.length > 0 &&
        optionData.map((item, i) => (
          <FormControlLabel
            key={i}
            value={item[optionValueKey]}
            control={
              <Radio
                disableRipple
                color="default"
                classes={{
                  root: "radio-root",
                  checked: "checked",
                  disabled: "disabled",
                  colorPrimary: "color-primary",
                }}
                checkedIcon={<span className="icon checked-icon" />}
                icon={<span className="icon" />}
              />
            }
            label={item[optionLabelKey]}
          />))}
    </RadioGroup>
  </FormControl>
);

FormRadio.propTypes = {
	name: PropTypes.string,
	legend: PropTypes.string,
	children: PropTypes.instanceOf(Object),
	input: PropTypes.instanceOf(Object),
	optionData: PropTypes.instanceOf(Array),
	optionValueKey: PropTypes.string,
	optionLabelKey: PropTypes.string,
};

FormRadio.defaultProps = {
	name: "",
	legend: "",
	children: {},
	input: {},
	optionData: [],
	optionValueKey: "",
	optionLabelKey: "",
};

export default FormRadio;
