import { KsuCardStyled } from './KsuCardStyled';
import {
    Card,
    Image,
} from 'antd';
import { TitleSmall } from '../TitleStyled';

import PropTypes from 'prop-types';

export const KsuCard = ({
    title,
    image,
    extra,
    action,
    children,
    className,
    hideAction,
}) => {
    return (
            <KsuCardStyled className={className}>
                {image && <Image src={image} wrapped ui={false}/>}
                <TitleSmall>{title}</TitleSmall>
                <div>{children}</div>
                {extra && (
                        <Card.Meta>
                            <span className="date">{extra}</span>
                        </Card.Meta>
                )}
                {!hideAction &&  action && <div className="card-actions print-hide">{action}</div>}
            </KsuCardStyled>
    );
};

KsuCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    extra: PropTypes.string,
    action: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    hideAction: PropTypes.bool,
};
