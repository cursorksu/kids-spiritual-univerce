import { BibleTextSettingsStyled } from './BibleTextStyled';
import { InputStyled, LabelStyled } from '../../components/InputStyled';
import { useEffect, useState } from 'react';
import { ButtonStyled } from '../../components/ButtonStyled';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

export const BibleTextSettings = ({ data, onSave }) => {
  const [text, setText] = useState('');
  const [quote, setQuote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    data && setIsSaved(text !== data?.bibleText || quote !== data?.bibleQuote);
  }, [data, text, quote]);

  useEffect(() => {
    data?.bibleText && setText(data?.bibleText);
    data?.bibleQuote && setQuote(data?.bibleQuote);
  }, [data]);

  const handleCancel = () => {
    setText('');
    setQuote('');
  };

  const handleSave = async () => {
    try {
      const newData = {
        id: 'bibleText',
        settings: {
          bibleText: text,
          bibleQuote: quote,
        },
      };

      await onSave(newData);
      setIsSaved(true);
      dispatch(
        setMessage({
          type: 'success',
          message: {
            title: `Success`,
            description: `Bible text was saved successfully`,
          },
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error`,
            description: error.message,
          },
        })
      );
    }
  };

  return (
    <div>
      <BibleTextSettingsStyled>
        <LabelStyled>Біблійний вірш</LabelStyled>
        <InputStyled
          name="bibleText"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <LabelStyled>Місце в Біблії</LabelStyled>
        <InputStyled
          name="bibleQuote"
          value={quote}
          onChange={({ target }) => setQuote(target.value)}
        />

        <div className="action-wrapper">
          <ButtonStyled onClick={handleCancel}>Відмінити</ButtonStyled>
          <ButtonStyled disabled={!isSaved} onClick={handleSave}>
            Зберігти
          </ButtonStyled>
        </div>
      </BibleTextSettingsStyled>
    </div>
  );
};

BibleTextSettings.propTypes = {
  data: PropTypes.shape({
    bibleText: PropTypes.string,
    bibleQuote: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};
