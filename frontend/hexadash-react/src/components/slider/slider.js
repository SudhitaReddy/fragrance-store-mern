 
import { FrownOutlined } from '@ant-design/icons';
import { Col, InputNumber, Row } from 'antd';
import React, { useState, useCallback } from 'react';
import { IconWrapper, SliderStyle } from './style';

function Slider({
  defaultValue,
  range = false,
  min = 0,
  max = 100,
  step = 1,
  input = false,
  icon = false,
  marks,
  vertical = false,
  defaultValues,
  onAfterChange,
  onChange
}) {

  // Handle both single value and range values
  const getInitialValue = () => {
    if (range && defaultValues) {
      return defaultValues;
    }
    return defaultValue || defaultValues || min;
  };

  const [state, setState] = useState({
    inputValue: getInitialValue(),
    currentValue: getInitialValue(),
  });

  // Memoized change handler to prevent unnecessary re-renders
  const handleInputChange = useCallback((value) => {
    if (value === null || isNaN(value) || value < min || value > max) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      inputValue: value,
      currentValue: value,
    }));
    
    if (onChange) {
      onChange(value);
    }
  }, [min, max, onChange]);

  const handleSliderChange = useCallback((value) => {
    setState(prevState => ({
      ...prevState,
      inputValue: value,
      currentValue: value,
    }));
    
    if (onChange) {
      onChange(value);
    }
  }, [onChange]);

  const handleAfterChange = useCallback((values) => {
    if (onAfterChange) {
      onAfterChange(values);
    }
  }, [onAfterChange]);

  const { inputValue, currentValue } = state;
  const mid = ((max - min) / 2).toFixed(5);
  const preColor = currentValue >= mid ? '' : 'rgba(0, 0, 0, .45)';
  const nextColor = currentValue >= mid ? 'rgba(0, 0, 0, .45)' : '';

  return input ? (
    <Row>
      <Col xl={20} xs={24}>
        <SliderStyle
          min={min}
          max={max}
          onChange={handleSliderChange}
          value={typeof inputValue === 'number' ? inputValue : min}
          step={step}
          tooltip={{ open: false }}
        />
      </Col>
      <Col xl={4} xs={24}>
        <InputNumber 
          min={min} 
          max={max} 
          value={inputValue} 
          onChange={handleInputChange} 
          step={step}
          style={{ width: '100%' }}
        />
      </Col>
    </Row>
  ) : icon ? (
    <IconWrapper>
      <FrownOutlined style={{ color: preColor }} />
      <SliderStyle 
        min={min} 
        max={max} 
        onChange={handleSliderChange} 
        value={currentValue}
        step={step}
        tooltip={{ open: false }}
      />
      <FrownOutlined style={{ color: nextColor }} />
    </IconWrapper>
  ) : (
    <SliderStyle
      marks={marks}
      defaultValue={range ? defaultValues : (defaultValue || defaultValues || min)}
      range={range}
      step={step}
      vertical={vertical}
      onAfterChange={handleAfterChange}
      onChange={handleSliderChange}
      max={max}
      min={min}
      tooltip={{ open: false }}
    />
  );
}

export { Slider };

