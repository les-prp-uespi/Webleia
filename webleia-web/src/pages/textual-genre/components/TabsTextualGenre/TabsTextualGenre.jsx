import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { TextInput } from 'pages/auth/components';
import { TextCounter } from './style';
import QuestionCard from '../QuestionCard';
import { RichTextComponent, TableActionButton, UploadComponent } from 'app/shared/components';
import { FiEdit2 } from 'react-icons/fi';
import CreateMovimentoModal from '../CreateMovimentoModal';
import FinishModal from '../FinishModal';
import CreateEstrategiaModal from '../CreateEstrategiaModal';
import { useDebounce, useService } from 'app/shared/hooks';
import { buscaCategoriasPergunta } from 'app/services/categoriaPergunta';
import EditMovimentoModal from '../EditMovimentoModal';
import { buscaPerguntas } from 'app/services/pergunta';
import TabMovimento from './TabMovimento';
import TabTutorial from './TabTutorial';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid2
      size={12}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      mt={2}
    >
      {value === index && <>{children}</>}
    </Grid2>
  );
}

const TabsTextualGenre = ({ generoTextual, updateGenero }) => {
  const [actualTab, setActualTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActualTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={actualTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tutorial" {...a11yProps(0)} />
          <Tab
            aria-disabled="Teste"
            disabled={!generoTextual}
            label="Movimentos e estratégias"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={actualTab} index={0}>
        <TabTutorial generoTextual={generoTextual} updateGenero={updateGenero} />
      </CustomTabPanel>
      <CustomTabPanel value={actualTab} index={1}>
        <TabMovimento generoTextual={generoTextual} updateGenero={updateGenero} />
      </CustomTabPanel>
    </>
  );
};

export default TabsTextualGenre;
