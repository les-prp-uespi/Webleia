import * as React from 'react';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
        <BaseNumberInput
            slots={{
                root: StyledInputRoot,
                input: StyledInputElement,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: '▴',
                },
                decrementButton: {
                    children: '▾',
                },
            }}
            {...props}
            ref={ref}
        />
    );
});

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledInputRoot = styled('div')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 2px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[200]};
    box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? blue[200] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  .base--disabled {
        opacity: 0.5;
        cursor: not-allowed;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

const StyledButton = styled('button')(
    () => `
  display: none;
`,
);

export default NumberInput