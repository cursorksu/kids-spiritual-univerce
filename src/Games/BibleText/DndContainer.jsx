import { useDrop } from 'react-dnd';
import { DARK_GRAY, GOLD, PRIMARY_MAIN_RGBA } from '../../constants/colors';

export const DndContainer = ({ accept, onDrop, className, content }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = DARK_GRAY;
  if (isActive) {
    backgroundColor = GOLD;
  } else if (canDrop) {
    backgroundColor = PRIMARY_MAIN_RGBA;
  }

  return (
    <span
      name={content}
      className={className}
      ref={drop}
      data-testid="dustbin">
      <>{content}</>
    </span>
  );
};
