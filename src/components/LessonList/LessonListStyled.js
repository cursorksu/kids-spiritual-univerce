import styled from '@emotion/styled';
import {
  DARK_GRAY,
  BOX_SHADOW,
  BOX_SHADOW_HOVER,
} from '../../constants/colors';

export const LessonListStyled = styled('div')`
  & > .grid {
    margin: 0;
    padding: 20px;
  }

  .lessons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
    align-items: stretch;
    padding: 20px;
  }

  .card-title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    position: relative;
    height: 66px;
    padding-bottom: 10px;
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
  }

  .content {
    padding-bottom: 0;
  }

  .description {
    text-align: center;

    img {
      display: none;
    }
  }

  .description,
  .title.card-title,
  .quote {
    color: ${DARK_GRAY};
  }
}
`;
