import React from "react";
const SelectControl = ({ name, value, selectList, onChange }) => {
  return (
    <div>
      <select value={value} onChange={onChange} name={name}>
        {selectList.map((select, index) => {
          return (
            <option key={index} value={select.value}>
              {select.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectControl;
