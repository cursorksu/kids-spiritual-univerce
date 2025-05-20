import PropTypes from "prop-types";

export const HighlightButton = ({ content, onClick }) => (
  <div className="mic" onClick={onClick} role="button">
    <div className="mic-content">{content}</div>
    <div className="mic-icon" />
    <div className="mic-shadow"></div>
  </div>
);

HighlightButton.propTypes = {
  content: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
