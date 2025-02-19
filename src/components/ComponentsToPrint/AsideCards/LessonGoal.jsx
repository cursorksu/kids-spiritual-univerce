import {ButtonIconMiniStyled} from '../../ButtonStyled';
import {Controller} from 'react-hook-form';
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

export const LessonGoal = ({onEdit, lesson}) => {
    const [isGoalEdit, setIsGoalEdit] = useState(false);
    const {user} = useSelector((state) => state.auth);
    return (
            <KsuCard
                    title={'Мета уроку'}
                    action={user?.uid && lesson?.createdBy?.uid === user?.uid && (<>
                        {!isGoalEdit ? (<ButtonIconMiniStyled onClick={() => setIsGoalEdit(true)}>
                            <EditIcon/>
                        </ButtonIconMiniStyled>) : (<ButtonIconMiniStyled
                                onClick={() => onEdit('goal')}>
                            <SaveIcon/>
                        </ButtonIconMiniStyled>)}
                    </>)}>
                <div>
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