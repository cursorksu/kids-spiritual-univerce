import {StyledDropdown} from './StyledDropdown';
import {useCallback, useEffect, useState} from 'react';
import {getOption} from '../../utils/getOption';
import {useGetEntityListByIds} from '../../api/entity/useGetEntityListByIds';
import PropTypes from 'prop-types';

export const KsuDropdownDynamic = ({
                                       onChange,
                                       multiple,
                                       placeholder,
                                       entityName,
                                       idsList,
                                       ...dropdownSettings
                                   }) => {
    const {getEntities, entities} = useGetEntityListByIds(entityName);
    const [options, setOptions] = useState([]);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    useEffect(() => {
        getEntities(idsList);
    }, [getEntities]);

    useEffect(() => {
        entities?.length > 0 && setOptions(
                entities?.map((el) =>
                        getOption(el),
                ) || [],
        );
    }, [entities]);

    const handleChange = useCallback(
            (_, data) => {
                setDropdownIsOpen(false);
                onChange(data.value);
            },
            [onChange],
    );

    return (
            <StyledDropdown
                    open={dropdownIsOpen}
                    placeholder={placeholder}
                    multiple={multiple}
                    onClick={() => setDropdownIsOpen(true)}
                    onChange={handleChange}
                    options={options}
                    {...dropdownSettings}
            />
    );
};

KsuDropdownDynamic.propTypes = {
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    entityName: PropTypes.string.isRequired,
    value: PropTypes.any,
    idsList: PropTypes.arrayOf(PropTypes.string).isRequired,
    dropdownSettings: PropTypes.object,
};
