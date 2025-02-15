import { EntityStatusMenuStyled, KsuStatusStyled } from './KsuStatusStyled';
import { clsx } from 'clsx';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { publicStatuses } from '../../constants/statuses/publicStatuses';
import { useSelector } from 'react-redux';

export const EntityStatusMenu = ({ onChangeFilter, entityName }) => {
  const { t } = useTranslation('tr');
  const [activeStatus, setActiveStatus] = useState(1);

  const { lessons } = useSelector((store) => store.lessonData);

  const amountOfItems = useMemo(() => {
    if (lessons?.length) {
      const publishedAmount = lessons.filter(
        (el) => el.status === publicStatuses.published
      ).length;
      const activeAmount = lessons.filter(
        (el) => el.status === publicStatuses.active
      ).length;
      const waitingAmount = lessons.filter(
        (el) => el.status === publicStatuses.waiting
      ).length;
      const draftAmount = lessons.filter(
        (el) => el.status === publicStatuses.draft
      ).length;

      return {
        published: publishedAmount,
        active: activeAmount,
        waiting: waitingAmount,
        draft: draftAmount,
      };
    }

    return {
      published: 0,
      active: 0,
      waiting: 0,
      draft: 0,
    };
  }, [lessons]);
  const handleFilterChange = (status) => {
    onChangeFilter(status);
    setActiveStatus(status);
  };

  return (
    <EntityStatusMenuStyled>
      <KsuStatusStyled
        onClick={() => handleFilterChange(1)}
        className={clsx({
          active: activeStatus === publicStatuses.published,
        })}>
        {t(`status.labels.published`)} <b>{amountOfItems.published}</b>
      </KsuStatusStyled>
      <KsuStatusStyled
        onClick={() => handleFilterChange(2)}
        className={clsx({
          active: activeStatus === publicStatuses.waiting,
        })}>
        {t(`status.labels.waiting`)} <b>{amountOfItems.waiting}</b>
      </KsuStatusStyled>
      <KsuStatusStyled
        onClick={() => handleFilterChange(3)}
        className={clsx({
          active: activeStatus === publicStatuses.active,
        })}>
        {t(`status.labels.active`)} <b>{amountOfItems.active}</b>
      </KsuStatusStyled>
      <KsuStatusStyled
        onClick={() => handleFilterChange(4)}
        className={clsx({
          active: activeStatus === publicStatuses.draft,
        })}>
        {t(`status.labels.draft`)} <b>{amountOfItems.draft}</b>
      </KsuStatusStyled>
    </EntityStatusMenuStyled>
  );
};
