import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { DatePickerStyled } from './style';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '../../assets/CalendarIcon.jsx';
import {getDateToDatePicker} from "../../utils/getDateLocalString";

export const KsuDatePicker = ({ selected, onChange, placeholder }) => {
    const [ksuSelected, setKsuSelected] = useState(new Date());

    useEffect(() => {
        if (!selected) return;

        if (getDateToDatePicker(selected)) {
            setKsuSelected(getDateToDatePicker(selected));
        } else if (selected instanceof Date) {
            setKsuSelected(selected);
        } else if (typeof selected === 'string') {
            setKsuSelected(getDateToDatePicker(JSON.parse(selected)));
        } else {
            return <p>Invalid data format</p>
        }

    }, [selected]);

  return (
    <DatePickerStyled>
      <span className="icon">
        <CalendarIcon />
      </span>
      <DatePicker
        placeholderText={placeholder}
        dateFormat="dd.MM.yyy"
        onChange={onChange}
        selected={ksuSelected}
        showMonthDropdown
        showYearDropdown
      />
    </DatePickerStyled>
  );
};
