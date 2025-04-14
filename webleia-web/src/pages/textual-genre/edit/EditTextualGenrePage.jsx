import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
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
  Typography,
} from '@mui/material';
import {
  LoaderComponent,
  SearchInput,
  StyledTableContainer,
  TableActionButton,
} from 'app/shared/components';
import { SubtitlePage, TextCounter, TitlePage } from './style';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiEdit2, FiTrash } from 'react-icons/fi';
import { BackButton } from './style';
import { TextInput } from 'pages/auth/components';
import { TitleCardQuestion } from './style';
import { LabelCardQuestion } from './style';
import { DescriptionCardQuestion } from './style';
import { FinishModal, QuestionCard, TabsTextualGenre } from '../components';
import { useConfirmModal, useDebounce, useService } from 'app/shared/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaGenerosTextualById, updateGeneroTextual } from 'app/services/genero';
import { Controller, useForm } from 'react-hook-form';

const EditTextualGenrePage = () => {
  const { control, watch } = useForm();
  const navigate = useNavigate();
  const confirmModal = useConfirmModal();

  const {
    request: buscaGenerosTextuaisByIdRequest,
    response: buscaGenerosTextualByIdResponse,
    retry,
  } = useService(buscaGenerosTextualById);

  const { request: updateGeneroTextualRequest } = useService(updateGeneroTextual);

  const { request: publicaGeneroTextualRequest } = useService(updateGeneroTextual, {
    onSuccess: () => {
      confirmModal.hideConfirmModal();
      navigate('/admin/textual-genre');
    },
  });
  const { id } = useParams();

  const getGeneroTextutal = (silent = false) => {
    buscaGenerosTextuaisByIdRequest(
      {
        id,
        withCount: ['perguntas', 'categorias_pergunta'],
      },
      {
        silent,
      },
    );
  };

  useEffect(() => {
    getGeneroTextutal();
  }, []);

  const generoTextual = buscaGenerosTextualByIdResponse.data;
  const [permiteEditMinMax, setPermiteEditMinMax] = useState(
    generoTextual?.use_min_max === '1' ? true : false,
  );
  const [nome, minPalavras, maxPalavras] = watch(['nome', 'min_palavras', 'max_palavras']);
  const nomeDebounced = useDebounce(nome);
  const minPalavrasDebounced = useDebounce(minPalavras);
  const maxPalavrasDebounced = useDebounce(maxPalavras);

  useEffect(() => {
    setPermiteEditMinMax(generoTextual?.use_min_max === '1' ? true : false);
  }, [generoTextual?.use_min_max]);

  useEffect(() => {
    if (
      nomeDebounced !== generoTextual?.nome ||
      minPalavrasDebounced !== generoTextual?.min_palavras ||
      maxPalavrasDebounced !== generoTextual?.max_palavras
    ) {
      updateGeneroTextualRequest({
        id: generoTextual?.id,
        nome: nomeDebounced,
        min_palavras: minPalavrasDebounced,
        max_palavras: maxPalavrasDebounced,
      });
    }
  }, [nomeDebounced, minPalavrasDebounced, maxPalavrasDebounced]);

  const handlePublicaGenero = async () => {
    const confirmed = await confirmModal.openConfirmModal({
      title: 'Publicar gênero textual',
      loader: true,
      message: (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography fontWeight="bold">Confirma a publicação do gênero textual?</Typography>
          <Typography fontSize="15px">
            <b>Nome:</b>&nbsp; {generoTextual.nome}
          </Typography>
          <Typography fontSize="15px">
            <b>Quantidade de movimentos:</b>&nbsp;{generoTextual.categorias_pergunta_count}
          </Typography>
          <Typography fontSize="15px">
            <b>Quantidade de estratégias:</b>&nbsp;{generoTextual.perguntas_count}
          </Typography>
          <Alert severity="info">
            <Typography fontWeight="bold">Importante</Typography>
            <Typography fontSize="15px" margin="0px">
              Ao finalizar o gênero textual, o mesmo ficará disponível para todos os usuários, por
              isso somente confirme se tiver certeza.
            </Typography>
          </Alert>
        </Box>
      ),
    });

    if (!confirmed) return;

    publicaGeneroTextualRequest({
      id: generoTextual?.id,
      publicado: '1',
    });
  };

  const handleOnChangePermiteEditMinMax = (checked) => {
    setPermiteEditMinMax(checked);

    updateGeneroTextualRequest({
      id: generoTextual?.id,
      use_min_max: checked ? '1' : '0',
    });
  };

  return (
    <>
      <LoaderComponent
        {...buscaGenerosTextualByIdResponse}
        message="Buscando gênero textual..."
        errorMessage="Falha ao buscar gênero textual"
        retry={retry}
      >
        {!!generoTextual && (
          <>
            <Grid2
              container
              height="fit-content"
              borderRadius="4px"
              border="1px solid #CDCDCD"
              padding="20px"
              bgcolor="white"
            >
              <Grid2
                size={12}
                mb="20px"
                justifyContent="space-between"
                flexDirection={'row'}
                container
              >
                <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                  <Box display="flex" alignItems="center">
                    <BackButton sx={{ mr: '12px' }} onClick={() => navigate(-1)}>
                      <FiArrowLeft />
                    </BackButton>
                    <TitlePage>Edição do gênero textual</TitlePage>
                  </Box>
                </Grid2>
              </Grid2>
              <Grid2 size={12} container mt={2}>
                <Grid2 size={6}>
                  <Controller
                    control={control}
                    name="nome"
                    render={({ field }) => (
                      <TextInput
                        onChange={field.onChange}
                        defaultValue={generoTextual.nome}
                        label={'Nome do modelo'}
                        fullWidth
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={3} paddingLeft={1}>
                  <Controller
                    control={control}
                    name="min_palavras"
                    render={({ field }) => (
                      <TextInput
                        onChange={field.onChange}
                        defaultValue={generoTextual.min_palavras}
                        label={'Mínimo de palavras'}
                        fullWidth
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={3} paddingLeft={1}>
                  <Controller
                    control={control}
                    name="max_palavras"
                    render={({ field }) => (
                      <TextInput
                        onChange={field.onChange}
                        defaultValue={generoTextual.max_palavras}
                        label={'Máximo de palavras'}
                        fullWidth
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
              <Grid2 size={12}>
                <Grid2 mt={2} justifyContent={'flex-start'} container>
                  <FormGroup>
                    <FormControlLabel
                      checked={permiteEditMinMax}
                      style={{ fontSize: 12, fontFamily: 'Roboto' }}
                      control={
                        <Checkbox
                          onChange={(e) => {
                            handleOnChangePermiteEditMinMax(e.target.checked);
                          }}
                        />
                      }
                      label="Permite editar o mínimo e o máximo de palavras"
                    />
                  </FormGroup>
                </Grid2>
              </Grid2>
              <Grid2 size={12} container mt={2}>
                <TabsTextualGenre
                  generoTextual={generoTextual}
                  updateGenero={() => {
                    getGeneroTextutal(true);
                  }}
                />
              </Grid2>
            </Grid2>
          </>
        )}
      </LoaderComponent>
    </>
  );
};

export default EditTextualGenrePage;
