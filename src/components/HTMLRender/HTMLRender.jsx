import PropTypes from 'prop-types';

export const HTMLRenderer = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

HTMLRenderer.propTypes = {
  htmlContent: PropTypes.string.isRequired,
};
