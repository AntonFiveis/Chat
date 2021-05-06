import React, { useState } from 'react';
import { Dialogs as BaseDialogs } from '../components';

const Dialogs = ({ items, userId }) => {
  const [inputValue, setValue] = useState('');
  const [filtred, setFiltredItems] = useState(Array.from(items));

  const onChangeInput = (value) => {
    console.log('value before', value);
    setFiltredItems(
      items.filter(
        (dialog) =>
          dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      ),
    );
    setValue(value);
    console.log('value after', value);
    console.log('filtred', filtred);
  };

  return (
    <BaseDialogs
      userId={userId}
      items={filtred}
      onSearch={onChangeInput}
      inputValue={inputValue}
    />
  );
};

export default Dialogs;
