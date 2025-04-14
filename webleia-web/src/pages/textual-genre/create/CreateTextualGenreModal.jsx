import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  GenericModal,
  SearchInput,
  StyledTableContainer,
  TableActionButton,
} from 'app/shared/components';
import { SubtitlePage, TextCounter, TitlePage } from './style';
import { useState } from 'react';
import { FiArrowLeft, FiEdit2, FiTrash } from 'react-icons/fi';
import { BackButton } from './style';
import { TextInput } from 'pages/auth/components';
import { TitleCardQuestion } from './style';
import { LabelCardQuestion } from './style';
import { DescriptionCardQuestion } from './style';
import { FinishModal, TabsTextualGenre } from '../components';
import { Controller, useForm } from 'react-hook-form';
import toastr from 'toastr';
import { createGeneroTextual } from 'app/services/genero';
import { useService } from 'app/shared/hooks';

const CreateTextualGenrePage = ({ open, onClose }) => {
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [permiteEditMinMax, setPermiteEditMinMax] = useState(true);
  const { request: requestCreateGeneroTextual, response: createGeneroTextualResponse } = useService(
    createGeneroTextual,
    {
      onSuccess: (data) => {
        reset();
        window.location.href = '/admin/textual-genre/edit/' + data.id;
      },
    },
  );
  const { handleSubmit, control, watch, reset } = useForm();
  const [nome, minPalavras, maxPalavras] = watch(['nome', 'min_palavras', 'max_palavras']);

  const onSubmit = () => {
    if (!nome) {
      toastr.warning('Preencha o campo nome');
      return;
    }

    if (!minPalavras) {
      toastr.warning('Preencha o campo minímo de palavras');
      return;
    }

    if (!maxPalavras) {
      toastr.warning('Preencha o campo máximo de palavras');
      return;
    }

    if (Number(minPalavras) > Number(maxPalavras)) {
      toastr.warning('O campo máximo de palavras deve ser maior que o campo minímo de palavras');
      return;
    }

    requestCreateGeneroTextual({
      nome: nome,
      min_palavras: minPalavras,
      max_palavras: maxPalavras,
      publicado: '0',
      use_min_max: permiteEditMinMax ? '1' : '0',
    });
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <GenericModal
      open={open}
      title="Criação do gênero textual"
      preventCloseClickOutside
      hasCloseIcon={false}
      size="sm"
      actions={[
        {
          color: 'default',
          onClick: handleOnClose,
          label: 'CANCELAR',
        },
        {
          label: 'CONFIRMAR',
          disabled: !nome || !minPalavras || !maxPalavras,
          loading: createGeneroTextualResponse.loading,
          onClick: () => onSubmit(),
        },
      ]}
    >
      <Grid2 container style={{ padding: 20, borderRadius: 8 }}>
        <Grid2 size={12}>
          <Controller
            control={control}
            name="nome"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextInput {...field} label={'Nome'} fullWidth required />
              </FormControl>
            )}
          />
        </Grid2>
        <Grid2 size={12} mt={2}>
          <Controller
            control={control}
            name="min_palavras"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextInput {...field} label={'Mínimo de palavras'} fullWidth required />
              </FormControl>
            )}
          />
        </Grid2>
        <Grid2 size={12} mt={2}>
          <Controller
            control={control}
            name="max_palavras"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextInput {...field} label={'Máximo de palavras'} fullWidth required />
              </FormControl>
            )}
          />
        </Grid2>
        <Grid2 size={12} mt={2}>
          <FormGroup>
            <FormControlLabel
              defaultChecked
              checked={permiteEditMinMax}
              style={{ fontSize: 12, fontFamily: 'Roboto' }}
              control={<Checkbox onChange={(e) => setPermiteEditMinMax(e.target.checked)} />}
              label="Permite editar o mínimo e o máximo de palavras"
            />
          </FormGroup>
        </Grid2>
      </Grid2>
    </GenericModal>
  );
};

export default CreateTextualGenrePage;
