import { VeremLayout } from './VeremLayout.jsx';
import { PresentationsStyled } from './MainContentStyled.js';
import { PresentationTitle } from '../components/Presentations/PresentationTitle.jsx';
import { PresentationItem } from '../components/Presentations/PresentationItem.jsx';
import {
    useEffect,
    useState,
} from 'react';
import { useGetAllEntities } from '../api/entity/useGetAllEntities.js';

export const Presentations = () => {
    const { getAllEntities } = useGetAllEntities('presentations');
    const [presentations, setPresentations] = useState([]);

    useEffect(() => {
        getAllEntities().then((data) => {setPresentations(data);});
    });

    return (
            <VeremLayout>
                <PresentationsStyled>
                    <PresentationTitle
                            title={'Presentations'}
                    />
                    <div className={'list-wrapper'}>
                        {presentations.map((presentation) => (
                                <PresentationItem
                                        key={presentation.id}
                                        presentation={presentation}
                                />
                        ))}

                    </div>
                </PresentationsStyled>
            </VeremLayout>
    );
};