
import  {useCallback, useEffect, useState} from 'react';
import {TableStyled} from './TableStyled';
import {Emoji} from 'emoji-picker-react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {useGetStudentsInGroup} from '../../api/student/useGetStudentsInGroup';
import clsx from 'clsx';
// import {getAge} from '../../utils/getAge';

export const StudentsTable = ({
                                  selectedRow,
                                  shouldUpdate,
                                  columns,
                                  onSwitch,
                              }) => {
    const {groupId} = useParams();
    const {t} = useTranslation('tr');
    const {getGetStudentsInGroup, studentList} = useGetStudentsInGroup();
    const [preparedStudents, setPreparedStudents] = useState(studentList);

    useEffect(() => {
        studentList && setPreparedStudents(studentList.map(el => ({
            ...el,
            // years: getAge(el.birthday)
        })));
    }, [studentList]);

    const getTotalScore = useCallback(
            () => preparedStudents?.reduce((acc, el) => acc + el.estimation, 0),
            [preparedStudents]
    );

    useEffect(() => {
        getGetStudentsInGroup(groupId);
    }, [shouldUpdate, groupId]);
    return (
            <TableStyled>
                {/*<Table compact celled definition>*/}
                {/*    <TableHeader>*/}
                {/*        <TableRow>*/}
                {/*            <TableHeaderCell>Активний</TableHeaderCell>*/}
                {/*            {columns.map((el) => el.displayInTable ? (*/}
                {/*                    <TableHeaderCell*/}
                {/*                            key={el.name}*/}
                {/*                            className={el.name}*/}
                {/*                    >*/}
                {/*                        {t(`students.labels.${el.name}`)}*/}
                {/*                    </TableHeaderCell>*/}
                {/*            ) : <></>)}*/}
                {/*        </TableRow>*/}
                {/*    </TableHeader>*/}
                {/*    <TableBody>*/}
                {/*        {(preparedStudents &&*/}
                {/*                preparedStudents?.length &&*/}
                {/*                preparedStudents?.map((el, idx) => (*/}
                {/*                        <TableRow*/}
                {/*                                selected={selectedRow === el.id}*/}
                {/*                                key={idx}*/}
                {/*                                className={clsx({*/}
                {/*                                    active: selectedRow === el.id,*/}
                {/*                                    'is-active': el.isActive,*/}
                {/*                                })}>*/}
                {/*                            <TableCell collapsing>*/}
                {/*                                <Checkbox*/}
                {/*                                        slider*/}
                {/*                                        checked={el.isActive}*/}
                {/*                                        onChange={() => onSwitch(el)}*/}
                {/*                                />*/}
                {/*                            </TableCell>*/}
                {/*                            {columns.map((item) => {*/}
                {/*                                let content;*/}
                {/*                                switch (item.name) {*/}
                {/*                                    case 'avatar':*/}
                {/*                                        content = <Emoji size={60} unified={el['avatar']} />;*/}
                {/*                                        break;*/}
                {/*                                    case 'photo':*/}
                {/*                                        content = <img src={el[item.name]} alt="student photo" />;*/}
                {/*                                        break;*/}
                {/*                                    case 'firstName':*/}
                {/*                                        content = <span>{el.secondName} {el[item.name]}</span>;*/}
                {/*                                        break;*/}
                {/*                                    case 'action':*/}
                {/*                                    case 'estimation':*/}
                {/*                                    case 'years':*/}
                {/*                                        content = item.render(el) ;*/}
                {/*                                        break;*/}
                {/*                                    default:*/}
                {/*                                        content = el[item.name];*/}
                {/*                                }*/}

                {/*                                return item.displayInTable || item.name === 'avatar' ? (*/}
                {/*                                        <TableCell key={item.name} className={item.name}>*/}
                {/*                                            {content}*/}
                {/*                                        </TableCell>*/}
                {/*                                ) : null;*/}
                {/*                            })}*/}
                {/*                        </TableRow>*/}
                {/*                ))) || <></>}*/}
                {/*    </TableBody>*/}
                {/*    <TableFooter>*/}
                {/*        <TableRow>*/}
                {/*            <TableCell>Разом дітей:</TableCell>*/}
                {/*            <TableCell>{preparedStudents?.length}</TableCell>*/}
                {/*            <TableCell></TableCell>*/}
                {/*            <TableCell>Разом балів:</TableCell>*/}
                {/*            <TableCell>{getTotalScore()}</TableCell>*/}
                {/*        </TableRow>*/}
                {/*    </TableFooter>*/}
                {/*</Table>*/}
            </TableStyled>
    );
};
