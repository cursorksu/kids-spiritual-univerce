import {
    useEffect,
    useRef,
    useState,
} from 'react';
import { TopicToPrint } from '../components/ComponentsToPrint';
import { useDispatch } from 'react-redux';
import { setLesson as setLessonInStore } from '../store/dataReducer';
import { useParams } from 'react-router';
import { useGetEntity } from '../api/entity/useGetEntity';
import { VeremLayout } from './VeremLayout.jsx';

export const Lesson = () => {
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const componentRef = useRef();
    const { lessonId } = useParams();
    const dispatch = useDispatch();
    const { getEntityById } = useGetEntity('lessons');

    useEffect(() => {
        lessonId &&
        getEntityById(lessonId).then((lesson) =>
                dispatch(setLessonInStore(lesson)),
        );
    }, [
        lessonId,
        getEntityById,
        shouldUpdate,
        dispatch,
    ]);

    return (
            <VeremLayout className={'lesson-page'}>
                <TopicToPrint
                        ref={componentRef}
                        onChangeConfirm={() => setShouldUpdate(prev => !prev)}
                />
            </VeremLayout>
    );
};
