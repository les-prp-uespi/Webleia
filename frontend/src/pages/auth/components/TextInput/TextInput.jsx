import { TextField } from '@mui/material';
import { Theme } from 'app/shared/utils';
import { TextInputStyled } from './style';

const TextInput = ({ label, id, type = 'text', ...props }) => {
  return (
    <TextInputStyled
      style={{ marginLeft: 0, fontSize: '16px', fontFamily: 'Roboto' }}
      variant="outlined"
      fullWidth
      color={Theme.colors.black}
      label={label}
      id={id}
      type={type}
      {...props}
    />
  );
};

export default TextInput;
