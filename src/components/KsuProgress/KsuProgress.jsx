import {
    CREAM,
    STATUS_ACTIVE,
    SUCCESS,
} from '../../constants/colors.js';
import {
    useEffect,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { ProgressStyled } from '../ComponentsToPrint/AsideCards/styles.js';

export const KsuProgress = () => {
    const [percent, setPercent] = useState(0);
    const { lesson } = useSelector((state) => state.lessonData);

    useEffect(() => {
        let calc = 0;
        if (lesson) {
            Object.keys(lesson).forEach((el) => {
                if (el === 'title') calc += 4;
                if (el === 'goal') calc += 4;
                if (el === 'description') calc += 4;
                if (el === 'bibleText') calc += 4;
                if (el === 'material') calc += 4;
                if (el === 'video') calc += 9;
                if (el === 'imageUrl') calc += 9;
                if (el === 'food') calc += 9;
                if (el === 'creative') calc += 9;
                if (el === 'subject') calc += 9;
                if (el === 'presentation') calc += 9;
                if (el === 'memory') calc += 9;
                if (el === 'topic') calc += 18;
            });

            setPercent(calc);
        }
    }, [lesson]);

    const conicColors = {
        '0%': CREAM,
        '50%': STATUS_ACTIVE,
        '100%': SUCCESS,
    };

    return <ProgressStyled
            type="dashboard"
            percent={percent}
            strokeColor={conicColors}
            strokeWidth={10}
            size="small"
    />
};