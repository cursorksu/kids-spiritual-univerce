import { Select } from 'antd';
import { StyledDropdown } from './StyledDropdown';
import { useCallback, useEffect, useState } from 'react';
import { getOption } from '../../utils/getOption';
import { useSelector } from 'react-redux';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';

import PropTypes from 'prop-types';

export const KsuTeachersDropdown = ({
  onChange,
  multiple,
  placeholder,
  optionsIds,
  value,
  ...dropdownSettings
}) => {
  const { teachers } = useSelector((state) => state.lessonData);
  const [options, setOptions] = useState([]);
  const [searchedOptions, setSearchedOptions] = useState(options);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { getEntities: getTeachers, entities: localTeachers } =
      useGetEntityListByIds('users');

  useEffect(() => {
    setOptions(
        localTeachers?.map((el) =>
            getOption(
                el,
                value?.map((el) => el?.id)
            )
        )
    );
    setSearchedOptions(
        localTeachers?.map((el) =>
            getOption(
                el,
                value?.map((el) => el?.id)
            )
        )
    );
  }, [optionsIds, localTeachers])

  useEffect(() => {
    if (optionsIds) {
      getTeachers(optionsIds);
    } else {
      setOptions(
        teachers?.map((el) =>
          getOption(
            el,
            value?.map((el) => el?.id)
          )
        )
      );
      setSearchedOptions(
        teachers?.map((el) =>
          getOption(
            el,
            value?.map((el) => el?.id)
          )
        )
      );
    }
  }, [teachers, optionsIds, value]);

  const handleChange = useCallback(
    (_, data) => {
      setDropdownIsOpen(false);
      onChange(data);
    },
    [onChange]
  );

  return (
    <StyledDropdown>
      <Select
        open={dropdownIsOpen}
        placeholder={placeholder}
        multiple={multiple}
        onClick={() => setDropdownIsOpen(true)}
        onChange={handleChange}
        options={searchedOptions}
        value={value}
        {...dropdownSettings}
      />
    </StyledDropdown>
  );
KsuTeachersDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  optionsIds: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  dropdownSettings: PropTypes.object,
};
}
