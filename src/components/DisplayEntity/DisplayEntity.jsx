import { TopicStyled } from './style';
import { clsx } from 'clsx';

import PropTypes from 'prop-types';
import log from "eslint-plugin-react/lib/util/log.js";

export const DisplayEntity = ({ entity }) => {
  const mappedData = Array.isArray(entity) ? entity : (entity?.list ?? []);

  return (
    <TopicStyled>
      {mappedData?.map((el) => {
        if (el.type === 'list') {
          return (
            <ul key={el?.id}>
              {el.value &&
                el.value.map((item) => <li key={item?.id}>{item.value}</li>)}
            </ul>
          );
        }

        if (el.type === 'dev') {
          return <div className="hr" key={el?.id} />;
        }

        if (el.type === 'dict') {
          return (
            <div className="dictionary" key={el?.id}>
              <b className="declaration">{el.value}</b>
              <div className="text">{el.text}</div>
            </div>
          );
        }

        if (el.type === 'title') {
          return (
            <h1 className="title" key={el?.id}>
              {el.value}
            </h1>
          );
        }
        if (el.type === 'subtitle') {
          return (
            <h2 className="subtitle" key={el?.id}>
              {el.value}
            </h2>
          );
        }

        if (el.type === 'paragraph') {
          const paragraphArray = el.value.split('\n');
          return paragraphArray.map((p, index) =>
            !p?.length ? <br key={index} /> : <p key={el?.id + index}>{p}</p>
          );
        }

        // if (el.type === 'date') {
        //   const formattedDate = getDateLocalString(el.value);
        //   return (<p>
        //     <span className='date-holder' key={el.id}>
        //       {formattedDate}
        //     </span>
        //   </p>);
        // }

        if (el.type === 'image') {
          return (
            <div
              className={clsx('image-holder', { 'print-hide': el.hideElement })}
              key={el?.id}>
              <img
                src={el.value}
                alt={el.description}
              />
              <label>{el.description}</label>
            </div>
          );
        }

        if (el.type === 'link') {
          return (
            <p key={el?.id}>
              <a href={el.value} className="link-holder">
                {el.text || el.value}
              </a>
            </p>
          );
        }

        if (el.type === 'media') {
            const videoSrc = el.value.includes('/shorts/')
                ? el.value.replace('/shorts/', '/embed/').split('?')[0] : el.value;

            return (
            <div key={el?.id} className="sect sect-bg">
              <div className="sect-header sect-title">{el.text}</div>
              <div className="sect-content video-box">
                <iframe
                  width="100%"
                  height="400"
                  src={videoSrc}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }

        return <div key={el?.id}></div>;
      })}
    </TopicStyled>
  );
};

DisplayEntity.propTypes = {
  entity: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        type: PropTypes.string,
        text: PropTypes.string,
        description: PropTypes.string,
        hideElement: PropTypes.bool,
      })
    ),
    PropTypes.shape({
      list: PropTypes.array,
    }),
  ]),
};
