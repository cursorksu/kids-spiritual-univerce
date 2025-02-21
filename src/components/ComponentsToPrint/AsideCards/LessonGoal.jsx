import {ButtonIconMiniStyled} from '../../ButtonStyled';
import {
    FormFieldStyled,
    InputStyled,
} from '../../InputStyled';
import {HTMLRenderer} from '../../HTMLRender/HTMLRender';
import {KsuCard} from '../../KsuCard';
import {useState} from 'react';
import { EditIcon } from '../../../assets/EditIcon.jsx';
import {SaveIcon} from '../../../assets/SaveIcon.jsx';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';

export const LessonGoal = ({onEdit, lesson}) => {
    const {t} = useTranslation('tr');
    const {t: tLesson} = useTranslation('lessons');
    const [isGoalEdit, setIsGoalEdit] = useState(false);
    const {user} = useSelector((state) => state.auth);
    return (
            <KsuCard
                    title={tLesson('lessonGoal')}
                    action={user?.uid && lesson?.createdBy?.uid === user?.uid && (<>
                        {!isGoalEdit ? (<ButtonIconMiniStyled onClick={() => setIsGoalEdit(true)}>
                            <EditIcon/>
                        </ButtonIconMiniStyled>) : (<ButtonIconMiniStyled
                                onClick={() => onEdit('goal')}>
                            <SaveIcon/>
                        </ButtonIconMiniStyled>)}
                    </>)}>
                <div>
                    {!lesson?.goal && <Empty description={t('empty')}/>}
                    {isGoalEdit ? (
                            <FormFieldStyled
                            name="goal"
                            render={({field}) => (<div>
                                <InputStyled
                                        name="goal"
                                        placeholder={'Почніть вводити щось...'}
                                        onChange={(data) => console.log('goal', data)}
                                        {...field}
                                />
                            </div>)}
                    />) : (<HTMLRenderer htmlContent={lesson?.goal}/>)}
                </div>
            </KsuCard>
    );
};

LessonGoal.propTypes = {
    onEdit: PropTypes.func.isRequired,
    lesson: PropTypes.shape({
        goal: PropTypes.string,
        createdBy: PropTypes.shape({
            uid: PropTypes.string,
        }),
    }),
};