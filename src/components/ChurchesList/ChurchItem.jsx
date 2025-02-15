import React from 'react';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { ChurchItemStyled, ContentStyled } from './styles';
import { PHOTO_PLACEHOLDER } from '../../constants/main';

export const ChurchItem = ({
    church,
    onClick,
    onDelete,
    isAuthor = false,
}) => {
    const { t } = useTranslation('tr');
    
    return (<ChurchItemStyled>
        <h3 className="title hover" onClick={onClick}>{church.title}</h3>
        <ContentStyled img={church?.gallery?.length ? church.gallery[0] : PHOTO_PLACEHOLDER}
                       onClick={onClick}>
            <img className={'logo'} src={church?.logo} alt={church?.title}/>
            <h3>{church?.title}</h3>
            <p className={'meta'}>{church?.about}</p>
        </ContentStyled>
        <div className={'footer'}>
            {church?.city}
        </div>
        {isAuthor && (<div className="action">
            <DeleteConfirmationModal
                    modalTitle={`${t('modal.title.churchDelete')} ${church?.title}`}
                    modalContent={`${t('modal.churchDelete')}`}
                    onConfirm={(e) => onDelete(e, church?.id)}
            />
        </div>)}
    </ChurchItemStyled>);
};
