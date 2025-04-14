import React, { useEffect, useState } from 'react';
import { HuePicker, SketchPicker, SliderPicker, TwitterPicker } from 'react-color';

const ColorPicker = ({ handleChange, defaultColor }) => {
  const [color, setColor] = useState(defaultColor);

  const handleChangeComplete = (newValue) => {
    handleChange(newValue.hex);
    setColor(newValue.hex);
  };

  useEffect(() => {
    handleChange(color);
  }, []);

  return <SketchPicker style={{ width: '100%' }} color={color} onChange={handleChangeComplete} />;
};

export default ColorPicker;
