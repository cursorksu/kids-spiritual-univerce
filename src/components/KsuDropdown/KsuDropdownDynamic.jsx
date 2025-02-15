import {Dropdown} from 'semantic-ui-react';
import {StyledDropdown} from './StyledDropdown';
import {useCallback, useEffect, useState} from 'react';
import {getOption} from '../../utils/getOption';
import {useGetAllEntities} from '../../api/entity/useGetAllEntities';
import {useGetEntityListByIds} from '../../api/entity/useGetEntityListByIds';

export const KsuDropdownDynamic = ({
                                       onChange,
                                       multiple,
                                       placeholder,
                                       entityName,
                                       value,
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
                console.log({data});
                onChange(data.value);
            },
            [onChange],
    );

    return (
            <StyledDropdown>
                <Dropdown
                        open={dropdownIsOpen}
                        placeholder={placeholder}
                        multiple={multiple}
                        onClick={() => setDropdownIsOpen(true)}
                        onChange={handleChange}
                        options={options}
                        {...dropdownSettings}
                />
            </StyledDropdown>
    );
};
