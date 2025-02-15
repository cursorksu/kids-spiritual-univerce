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
    grid-template-columns: 23% 23% 23% 23%;
    grid-gap: 20px;
    padding: 20px;
  }

  .cards-grid {
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
