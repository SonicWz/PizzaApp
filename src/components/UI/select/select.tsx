import React from 'react';

interface ISortOptionsType {
  title: string,
  value: string
}

interface ISelectType {
  options: ISortOptionsType[],
  defaultValue: string,
  onChange: (value: string) => void;
  value: string
}

const Select = ({ options, defaultValue, onChange }: ISelectType) => {
  return (
    <select
      className=""
      id="sort"
      value={defaultValue}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      <option disabled={true} value={defaultValue}>Сортировка по:</option>
      {options.map((elem) => {
        return <option key={elem.value} value={elem.value}>{elem.title}</option>
      })
      }
    </select>
  );
};

export default Select;