import {Select} from 'antd';
import {StyledDropdown} from './StyledDropdown';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useLessonToGroup} from '../../api/lesson/useLessonToGroup';
import {useParams} from 'react-router';

import PropTypes from 'prop-types';

export const KsuDropdownUserGroups = ({forceUpdate}) => {
    const {t} = useTranslation('tr');
    const {user} = useSelector((state) => state.auth);
    const {lesson} = useSelector((state) => state.lessonData);
    const [options, setOptions] = useState([]);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [value, setValue] = useState([]);
    const {lessonId} = useParams();
    const {bindLessonToGroup, unbindLessonFromGroup} = useLessonToGroup();

    useEffect(() => {
        setOptions(
                user?.groups?.map((el) => el.id && ({
                            id: el.id,
                            key: el.id,
                            value: el.id,
                            text: el.title,
                        }),
                ) || [],
        );
    }, []);

    useEffect(() => {
        if (lesson?.usage?.length > 0 && user?.groups?.length > 0) {
            const userGroupIds = user?.groups?.map(group => group.id);
            const filteredUsage = lesson?.usage?.filter(usageId => userGroupIds.includes(usageId));
            setValue(filteredUsage);
        }
    }, [user, lesson]);

    const handleChange = useCallback(
            async (_, data) => {
                if (Array.isArray(data.value)) {
                    setValue(prev => {
                        if (prev.length >= data.value.length) {
                            unbindLessonFromGroup(lessonId, data.value[data.value.length - 1]);
                        } else {
                            bindLessonToGroup(lessonId, prev.find(el => data.value === el)).then(() => forceUpdate());
                        }

                        return data.value;
                    });
                } else {
                    setValue(prev => ([...prev, data.value]));
                }

                if (value.length > 0)
                setDropdownIsOpen(false);
            },
            [value],
    );

    return (
            <StyledDropdown>
                <Select
                        fluid
                        placeholder={t('group.addToGroupPlaceholder')}
                        value={value}
                        open={dropdownIsOpen}
                        multiple={true}
                        onClick={() => setDropdownIsOpen(true)}
                        onChange={handleChange}
                        options={options.length > 0 ? options : []}
                />
            </StyledDropdown>
    );
};

KsuDropdownUserGroups.propTypes = {
    forceUpdate: PropTypes.func.isRequired,
};
