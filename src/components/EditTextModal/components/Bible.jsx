import { FormField } from 'semantic-ui-react';
import { InputStyled, TextareaAutosizeStyled } from '../../InputStyled';
import React from 'react';

export const Bible = ({ field }) => {
  return (
    <FormField>
      <InputStyled
        id="quote"
        F
        name="quote"
        placeholder="Місце з Писання"
        value={field.value}
        onChange={field.onChange}
      />
      <TextareaAutosizeStyled
        id="bible"
        name="bible"
        placeholder="Біблійний текст"
        {...field}
      />
    </FormField>
  );
};
