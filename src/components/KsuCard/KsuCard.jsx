import { KsuCardStyled } from './KsuCardStyled';
import {
    Card,
    Image,
} from 'antd';
import { TitleSmall } from '../TitleStyled';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const KsuCard = ({
    title,
    image,
    extra,
    action,
    children,
    className,
    hideAction,
    onClick,
}) => {
    const { user } = useSelector((state) => state.auth);

    return (
            <KsuCardStyled
                    onClick={onClick}
                    className={className}
                    style={{
                        paddingBottom: !user?.uid
                                ? 20
                                : 60,
                        backgroundPosition: !user?.uid
                                ? 'center bottom 0'
                                : 'center bottom 40px',
                    }}
            >
                {image && <Image src={image} wrapped ui={false}/>}
                <TitleSmall>{title}</TitleSmall>
                <div>{children}</div>
                {extra && (
                        <Card.Meta>
                            <span className="date">{extra}</span>
                        </Card.Meta>
                )}
                {!hideAction && action && <div className="card-actions print-hide">{action}</div>}
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
    onClick: PropTypes.func,
};
