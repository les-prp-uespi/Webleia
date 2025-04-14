import { IconButton, TextField } from '@mui/material';
import { useDebounce } from 'app/shared/hooks';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

const SearchInput = ({ setSearch, label = 'Buscar' }) => {
  const [textSearch, setTextSearch] = useState('');
  const searchDebounced = useDebounce(textSearch);

  useEffect(() => {
    setSearch(searchDebounced);
  }, [searchDebounced]);

  return (
    <TextField
      placeholder={label}
      fullWidth
      size='small'
      value={textSearch}
      slotProps={{
        input: {
          endAdornment: textSearch.length > 0 ? (
            <IconButton onClick={() => setTextSearch('')}>
              <MdClose />
            </IconButton>
          ) : undefined
        }
      }}
      onChange={(e) => {
        setTextSearch(e.target.value);
      }}
    />
  );
};

export default SearchInput;
