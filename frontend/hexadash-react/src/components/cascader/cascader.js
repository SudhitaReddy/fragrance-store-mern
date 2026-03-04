import React, { useState } from 'react';
import { CascaderStyle } from './style';

function Cascader(props) {
  const { data, defaultValue, trigger, onChange, isShowSearch, loading, placeholder } = props;

  const options = data;
  const [state, setState] = useState({
    options,
  });

  const onChangeEvent = (value) => {
    onChange(value);
  };

  const onChangeLoading = (value, selectedOptions) => {
    onChange(value, selectedOptions);
  };

  const filter = (inputValue, path) => {
    return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      setState({
        options: [...state.options],
      });
    }, 1000);
  };

  return (
    <CascaderStyle
      options={options}
      expandTrigger={trigger}
      defaultValue={defaultValue}
      onChange={loading ? onChangeLoading : onChangeEvent}
      showSearch={isShowSearch && { filter }}
      loadData={loadData}
      placeholder={placeholder}
      changeOnSelect={!!loading}
    />
  );
}



export { Cascader };
