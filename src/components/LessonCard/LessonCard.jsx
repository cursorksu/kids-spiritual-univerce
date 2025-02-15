import { useRef } from 'react';
import { ImageIcon } from '../../assets/ImageIcon.jsx';
import { ButtonIconStyled } from '../ButtonStyled';
import { LessonCardStyled } from './style';
import { Card } from 'antd';
import { useOnLoadImages } from '../../hooks/useOnLoadImages';

import PropTypes from 'prop-types';

export const LessonCard = ({ item, onClick, onDelete }) => {
    const wrapperRef = useRef(null);
    const imagesLoaded = useOnLoadImages(wrapperRef);

    return (
            <LessonCardStyled onClick={() => onClick(item?.id)}>
                <div className="card-img-wrapper" ref={wrapperRef}>
                    {imagesLoaded && <img src={item?.imageUrl} alt={item?.title}/>}
                    {!imagesLoaded && <ImageIcon/>}
                </div>
                <div className="card-content">
                    <p className="description">{item?.goal}</p>
                    <h2 className= "card-title">{item?.title}</h2>
                    <p className="quote">{item?.bibleText}</p>
                    <div className="quote">
                        <b>{item?.bibleQuote}</b>
                    </div>
                </div>
                <Card.Meta>
                    <div>
                        <p>Created: {item?.createdAt}</p>
                        <p>
                            Author: {item?.createdBy?.firstName} {item?.createdBy?.lastName}
                        </p>
                    </div>
                    <ButtonIconStyled onClick={(e) => onDelete(e, item?.id)}>
                    {/*    <DeleteIcon/>*/}
                    </ButtonIconStyled>
                </Card.Meta>
            </LessonCardStyled>
    );
};

LessonCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        title: PropTypes.string,
        goal: PropTypes.string,
        bibleText: PropTypes.string,
        bibleQuote: PropTypes.string,
        createdAt: PropTypes.string,
        createdBy: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        }),
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
