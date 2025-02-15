import React from 'react';

export const getOption = (el, selectedItemIdsList) =>
  el
    ? {
      key: el.id,
      value: el.id,
      disabled: selectedItemIdsList?.some((item) => item?.id === el.id),
      text: el.firstName
? (
        <div className="ksu-option">
          <div>{`${el.firstName} ${el.lastName}`}</div>
          <div className="description">{el.email}</div>
        </div>
      ) : (
          <div className="">{el.title}</div>
        ),
      }
    : {
      key: 1,
      value: null,
        disabled: true,
        text: '',
    };
