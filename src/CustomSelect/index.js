import React from "react";
import Select from "react-select";
import { ClearIndicator, DropdownIndicator } from "./components";
const noop = {};

const CustomSelect = (props) => {
  const {
    disabled: isDisabled,
    onSelectChange,
    options,
    components: childComponents,
    ...restProps
  } = props;

  const selectProps = {
    isDisabled,
    classNamePrefix: "custom-select",
    components: {
      DropdownIndicator,
      ClearIndicator,
      ...childComponents,
    },
    options,
    onChange: onSelectChange,
    ...restProps,
  };

  return <Select {...selectProps} />;
};

CustomSelect.defaultProps = {
  components: {},
  options: [], // [{label: '', value: ''}]
  onSelectChange: noop,
  placeholder: "",
  noOptionsMessage: () => "No results found",
  isClearable: false,
};

export default CustomSelect;
