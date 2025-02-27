import { useRef } from 'react';
import {
    useDrag,
    useDrop,
} from 'react-dnd';
import PropTypes from 'prop-types';
import { SlideStyled } from './styles.js';
import { DeleteIcon } from '../../assets/DeleteIcon.jsx';
import { ButtonIconMiniStyled } from '../ButtonStyled.js';
import { TitleMedium } from '../TitleStyled.jsx';

export const SlideItem = ({ id, text, title, index, moveCard, img, onDelete, className }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect (monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover (item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                          (
                                  hoverBoundingRect.bottom - hoverBoundingRect.top
                          ) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => (
                {
                    isDragging: monitor.isDragging(),
                }
        ),
    });
    const opacity = isDragging
            ? 0
            : 1;
    drag(drop(ref));
    return (
            <SlideStyled ref={ref} style={{ opacity }} className={className}>
                <div className="img-wrapper">
                    {text}
                    {img && <img src={img} alt="slide"/>}
                    {title && <TitleMedium>{title}</TitleMedium>}
                    <ButtonIconMiniStyled onClick={() => onDelete(id)}>
                        <DeleteIcon/>
                    </ButtonIconMiniStyled>
                </div>
                <div className="drag-handle" data-handler-id={handlerId}/>
            </SlideStyled>
    );
};

SlideItem.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    className: PropTypes.string,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};