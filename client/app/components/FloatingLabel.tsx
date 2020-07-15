import React, { useState, useEffect } from 'react';

interface IProps {
  label: String;
  inputValue: any;
  inputRef: any;
}

const FloatingLabel: React.FC<IProps> = ({ label, inputValue, inputRef }) => {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const handleOnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <>
      <div
        onClick={handleOnClick}
        className={`floating_label isFixed_${value.length > 0}`}
      >
        {label}
      </div>
    </>
  );
};

export default FloatingLabel;
