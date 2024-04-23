// import clsx from 'clsx';
import React, {useState} from "react";

type Option = {
  label: string,
  value: string
};

type SelectProps = {
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ options })=> {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };
  return (
    <div>
      {options.map(option => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            onChange={() => handleCheckboxChange(option.value)}
            checked={selectedOptions.includes(option.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

export default Select;
