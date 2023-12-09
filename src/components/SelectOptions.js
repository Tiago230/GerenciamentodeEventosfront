// src/components/SelectOptions.js
import React from 'react';

const SelectOptions = ({ options, onSelectChange, selectedValue, name }) => {
  return (
    <select name={name} onChange={onSelectChange} value={selectedValue}>
      <option value="" disabled>
        Select {name}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nome}
        </option>
      ))}
    </select>
  );
};

export default SelectOptions;
