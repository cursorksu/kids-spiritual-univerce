import PropTypes from 'prop-types';
import { PresentationTitleStyled } from './styles.js';
import { TitleLarge } from '../TitleStyled.jsx';
import { AddIcon } from '../../assets/AddIcon.jsx';
import { ButtonIconMiniStyled } from '../ButtonStyled.js';
import { useCreateEntity } from '../../api/entity/useCreateEntity.js';
import { generateId } from '../../utils/generateId.js';

export const PresentationTitle = ({ title }) => {
    const {createEntity} = useCreateEntity('presentations');

    return (
            <PresentationTitleStyled>
                <TitleLarge>{title}</TitleLarge>
                <ButtonIconMiniStyled onClick={() => createEntity({
                    title: 'New presentation',
                    status: 'draft',
                    description: 'Description of presentation',
                    slides: [
                        {id: generateId(), template: 'text-left', content: 'Description of slide 1. Suspendisse pulvinar augue ac venenatis', img: 'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/40ql6xpGCxQJuUlF42FU%2FDALL%C2%B7E%202025-02-25%2017.15.17%20-%20A%20watercolor%20painting%20of%20two%20children%20standing%20on%20a%20stage%2C%20holding%20microphones%20and%20reading%20from%20papers.%20The%20setting%20is%20a%20modern%2C%20rustic%20venue%20with%20lar.webp?alt=media&token=5da002ca-8a6c-49a2-82f1-4bee85076768'},
                        {id: generateId(), template: 'text-right', content: 'Description of slide 2. Suspendisse enim turpis dictum sed', img: 'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/G6ncYi8SunAWYKsm0wYy%2FScreenshot%202025-01-07%20at%2011.40.58.png?alt=media&token=0ff3868e-c49d-4fd2-a4ed-f901e5951bc1'},
                        {id: generateId(), template: 'text-top', content: 'Description of slide 3. Vestibulum ante ipsum primis in', img: 'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/G6ncYi8SunAWYKsm0wYy%2FScreenshot%202025-01-07%20at%2011.40.38.png?alt=media&token=d514e747-3e80-423f-927f-390e7ead294c'},
                        {id: generateId(), template: 'text-bottom', content: 'Description of slide 4. Etiam ultricies nisi vel augue', img: 'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/G6ncYi8SunAWYKsm0wYy%2FScreenshot%202025-01-07%20at%2011.40.38.png?alt=media&token=d514e747-3e80-423f-927f-390e7ead294c'},
                    ]
                })}>
                    <AddIcon />
                </ButtonIconMiniStyled>
            </PresentationTitleStyled>
    );
};

PresentationTitle.propTypes = {
    title: PropTypes.string.isRequired,
};