import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useGetStudentsInGroup } from '../../api/student/useGetStudentsInGroup';
import { Table, Switch, Typography, Image } from 'antd';
import { Emoji } from 'emoji-picker-react';

const { Text } = Typography;

export const StudentsTable = ({
    selectedRow,
    shouldUpdate,
    columns,
    onSwitch,
}) => {
    const { groupId } = useParams();
    const { t } = useTranslation('tr');
    const { getGetStudentsInGroup, studentList } = useGetStudentsInGroup();
    const [preparedStudents, setPreparedStudents] = useState([]);

    useEffect(() => {
        if (studentList) {
            setPreparedStudents(
                    studentList.map((el) => ({
                        ...el,
                    }))
            );
        }
    }, [studentList]);

    const getTotalScore = useCallback(
            () =>
                    preparedStudents?.reduce((acc, el) => acc + (el.estimation || 0), 0),
            [preparedStudents]
    );

    useEffect(() => {
        getGetStudentsInGroup(groupId);
    }, [shouldUpdate, groupId]);

    const tableColumns = [
        {
            title: t('students.labels.active'),
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive, record) => (
                    <Switch
                            checked={isActive}
                            onChange={() => onSwitch(record)}
                    />
            ),
        },
        ...columns.map((item) => ({
            title: t(`students.labels.${item.name}`),
            dataIndex: item.name,
            key: item.name,
            render: (value, record) => {
                switch (item.name) {
                    case 'avatar':
                        return <Emoji size={28} unified={record['avatar']} />;
                    case 'photo':
                        return <Image width={50} src={value} alt="student photo" />;
                    case 'firstName':
                        return (
                                <Text>
                                    {record.secondName} {value}
                                </Text>
                        );
                    case 'action':
                    case 'estimation':
                    case 'years':
                        return item.render ? item.render(record) : value;
                    default:
                        return value;
                }
            },

            shouldDisplay: item.displayInTable || item.name === 'avatar',
        })),
    ].filter((col) => col.shouldDisplay);

    return (
            <div>
                <Table
                        rowKey="id"
                        columns={tableColumns}
                        dataSource={preparedStudents}
                        rowClassName={(record) =>
                                selectedRow === record.id ? 'selected-row' : ''
                        }
                        pagination={false}
                        footer={() => (
                                <div>
                                    <Text>
                                        {t('students.footer.totalStudents')}: {preparedStudents?.length}
                                    </Text>
                                    <br />
                                    <Text>
                                        {t('students.footer.totalScores')}: {getTotalScore()}
                                    </Text>
                                </div>
                        )}
                />
            </div>
    );
};

StudentsTable.propTypes = {
    selectedRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shouldUpdate: PropTypes.bool,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            render: PropTypes.func,
            displayInTable: PropTypes.bool,
        })
    ).isRequired,
    onSwitch: PropTypes.func.isRequired,
};