import { StyledDropdown } from './StyledDropdown';
import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';

import PropTypes from 'prop-types';
import { TagRender } from './TagRender.jsx';
import { OptionTeacherRender } from './OptionTeacherRender.jsx';

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
    const { getEntities: getTeachers, entities: localTeachers } =
                  useGetEntityListByIds('users');

    useEffect(() => {
        setOptions(
                localTeachers?.map((el) => (
                        {
                            id: el.id,
                            label: el.fullName || `${el.firstName} ${el.lastName}`,
                            value: el.id,
                            imgUrl: el.avatar,
                            email: el.email,
                        }
                )),
        );
    }, [
        optionsIds,
        localTeachers,
    ]);

    useEffect(() => {
        if (optionsIds) {
            getTeachers(optionsIds);
        } else {
            setOptions(
                    teachers?.map((el) => (
                            {
                                id: el.id,
                                label: el.fullName || `${el.firstName} ${el.lastName}`,
                                value: el.id,
                                imgUrl: el.avatar,
                                email: el.email,
                            }
                    )),
            );
        }
    }, [
        teachers,
        optionsIds,
        value,
        getTeachers,
    ]);

    const handleRemove = useCallback(
            (removedItem) => {
                value.length && onChange(value.filter(el => el !== removedItem));
            },
            [onChange],
    );

    return (
            <StyledDropdown
                    placeholder={placeholder}
                    mode={multiple ? 'multiple' : 'default'}
                    tagRender={(props) => (
                            <TagRender
                                    label={props.label}
                                    value={props.value}
                                    onClose={handleRemove}
                                    key={props.value}
                            />
                    )}
                    optionRender={(props) => (
                            <OptionTeacherRender
                                    {...props}
                                    imgUrl={options.find(el => el.value === props.value)?.imgUrl}
                                    email={options.find(el => el.value === props.value)?.email}
                            />
                    )}
                    onChange={onChange}
                    options={options}
                    value={value}
                    {...dropdownSettings}
            />
    );
};

KsuTeachersDropdown.propTypes = {
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    optionsIds: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
    ]),
    dropdownSettings: PropTypes.object,
    label: PropTypes.string, // Validate the 'label' prop
};