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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { LoaderComponent, TableActionButton } from 'app/shared/components';
import { FiEdit2 } from 'react-icons/fi';
import { useDebounce, useService } from 'app/shared/hooks';
import { buscaCategoriasPergunta } from 'app/services/categoriaPergunta';
import { buscaPerguntas, buscaPerguntasCount } from 'app/services/pergunta';
import { TextCounter } from '../style';
import CreateMovimentoModal from '../../CreateMovimentoModal';
import QuestionCard from '../../QuestionCard';
import CreateEstrategiaModal from '../../CreateEstrategiaModal';
import EditMovimentoModal from '../../EditMovimentoModal';
import OrderMovimentosModal from '../../OrderMovimentosModal';
import OrderEstrategiasModal from '../../OrderEstrategiasModal';

const TabMovimento = ({ generoTextual, updateGenero }) => {
  const [openCreateMovimentoModal, setOpenCreateMovimentoModal] = useState(false);
  const [openOrderMovimentosModal, setOpenOrderMovimentosModal] = useState(false);
  const [openOrderEstrategiasModal, setOpenOrderEstrategiasModal] = useState(false);
  const [openEditEstrategiaModal, setOpenEditEstrategiaModal] = useState(false);
  const [categoriaPergunta, setCategoriaPergunta] = useState();
  const [categoriaPerguntaSearch, setCategoriaPerguntaSearch] = useState();
  const [openCreateEstrategiaModal, setOpenCreateEstrategiaModal] = useState(false);
  const categoriaPerguntaSearchDebounced = useDebounce(categoriaPerguntaSearch);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    request: requestBuscaCategoriasPergunta,
    response: buscaCategoriasPerguntaResponse,
    retry,
  } = useService(buscaCategoriasPergunta, {
    cache: true,
    cacheKey: 'buscaMovimentos',
  });

  const {
    request: requestBuscaPerguntas,
    response: buscaPerguntasResponse,
    retry: retryBuscaPerguntas,
  } = useService(buscaPerguntas, {
    cache: true,
    cacheKey: 'buscaPerguntas',
  });

  const {
    request: requestBuscaPerguntasCount,
    response: buscaPerguntasCountResponse,
    retry: retryBuscaPerguntasCount,
  } = useService(buscaPerguntasCount);

  const handleBuscaMovimentos = (ignoreCache = false) => {
    if (ignoreCache) {
      updateGenero();
    }
    requestBuscaCategoriasPergunta(
      {
        limit: 10,
        page: 0,
        nome: categoriaPerguntaSearchDebounced,
        genero_textual_id: generoTextual.id,
      },
      {
        ignoreCache,
      },
    );
  };

  const handleBuscaPerguntas = (ignoreCache = false) => {
    requestBuscaPerguntas(
      {
        genero_textual_id: generoTextual.id,
        categoria_pergunta_id: categoriaPergunta.id,
        with: "itens"
      },
      {
        ignoreCache,
      },
    );
  };

  useEffect(() => {
    if (generoTextual) {
      handleBuscaMovimentos();
    }
  }, [categoriaPerguntaSearchDebounced]);

  useEffect(() => {
    if (categoriaPergunta) {
      handleBuscaPerguntas();
    }
  }, [categoriaPergunta]);

  const handleGetBuscaPerguntas = () => {
    requestBuscaPerguntasCount({
      genero_textual_id: generoTextual.id,
    });

    requestBuscaPerguntas(
      {
        genero_textual_id: generoTextual.id,
        categoria_pergunta_id: categoriaPergunta.id,
        with: "itens"
      },
      {
        ignoreCache: true,
      },
    );
  };

  const totalPerguntas = generoTextual.perguntas_count;
  const totalCategoriasPergunta = generoTextual.categorias_pergunta_count;
  const categoriasPergunta =
    buscaCategoriasPerguntaResponse?.data?.data?.map((item) => {
      return {
        id: item.id,
        label: item.nome,
        nome: item.nome,
        descricao: item.descricao,
        cor: item.cor,
      };
    }) || [];

  const perguntas = buscaPerguntasResponse?.data?.data || [];
  const perguntasTotal = buscaPerguntasResponse?.data?.total || 0;
  const movimentosOrdenacao = buscaCategoriasPerguntaResponse?.data?.data?.map((item, key) => {
    return {
      id: item.id,
      title: `Movimento ${key + 1}`,
      subtitle: item.nome,
      ordem: item.ordem,
    };
  });

  const estrategiasOrdenacao = buscaPerguntasResponse?.data?.data?.map((item, key) => {
    return {
      id: item.id,
      title: `Estratégia ${key + 1}`,
      subtitle: item.titulo,
      ordem: item.ordem,
    };
  });

  useEffect(() => {
    if (!categoriaPergunta && categoriasPergunta.length > 0) {
      setCategoriaPergunta(categoriasPergunta[0]);
    }
  }, [buscaCategoriasPerguntaResponse]);

  return (
    <Grid2>
      <LoaderComponent
        message="Buscando movimentos de gênero textual..."
        errorMessage="Falha ao buscar movimentos de gênero textual"
        {...buscaCategoriasPerguntaResponse}
        retry={retry}
      >
        <Grid2 size={12} mt={2} container justifyContent={'space-between'} flexDirection={'row'}>
          <Grid2 alignSelf={'center'}>
            <Button
              style={{ minWidth: 180 }}
              onClick={() => setOpenCreateMovimentoModal(true)}
              variant="contained"
            >
              Novo movimento
            </Button>
            <Button
              style={{
                minWidth: 180,
                marginLeft: isMobile ? 0 : 10,
                marginTop: isMobile ? 8 : 0,
                marginBottom: isMobile ? 10 : 0,
              }}
              onClick={() => {
                setOpenOrderMovimentosModal(true);
              }}
              variant="contained"
            >
              Ordenar movimentos
            </Button>
          </Grid2>
          <Grid2 alignSelf={'center'}>
            <TextCounter>Total de movimentos: {totalCategoriasPergunta}</TextCounter>
            <TextCounter
              sx={{
                textAlign: 'left',
              }}
            >
              Total de estratégias: {totalPerguntas}
            </TextCounter>
          </Grid2>
        </Grid2>
        <Grid2 size={12} mt={2}>
          <Grid2 size={12} flexDirection={'row'} container>
            <FormControl
              style={{
                marginLeft: 0,
                width: categoriaPergunta ? (isMobile ? '80%' : '95%') : '100%',
              }}
            >
              <Autocomplete
                disablePortal
                options={categoriasPergunta}
                fullWidth
                key={categoriaPergunta}
                defaultValue={categoriaPergunta}
                onChange={(e, newValue) => {
                  setCategoriaPergunta(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    slotProps={
                      buscaCategoriasPerguntaResponse.loading
                        ? {
                          input: {
                            endAdornment: (
                              <CircularProgress
                                sx={{ position: 'absolute', right: '10px' }}
                                size="20px"
                              />
                            ),
                          },
                        }
                        : undefined
                    }
                    {...params}
                    style={{ margin: 0 }}
                    placeholder="Movimento selecionado"
                    onChange={(e) => {
                      setCategoriaPerguntaSearch(e.target.value);
                    }}
                  />
                )}
              />
            </FormControl>
            {categoriaPergunta && (
              <TableActionButton
                style={{ marginLeft: 10, verticalAlign: 'middle', marginTop: 5 }}
                onClick={() => setOpenEditEstrategiaModal(true)}
              >
                <FiEdit2 />
              </TableActionButton>
            )}
          </Grid2>

          {categoriaPergunta && (
            <small
              style={{
                fontFamily: 'Roboto',
                fontSize: '12px',
                fontWeight: 400,
              }}
            >
              Total de estratégias do movimento: {perguntasTotal}
            </small>
          )}
        </Grid2>
      </LoaderComponent>
      <LoaderComponent
        message="Buscando estratégias gênero textual..."
        errorMessage="Falha ao buscar estratégias de gênero textual"
        {...buscaPerguntasResponse}
        retry={retryBuscaPerguntas}
      >
        {categoriaPergunta && !buscaPerguntasResponse.loading && (
          <Grid2 container justifyContent={'space-between'} flexDirection={'row'} mt={2}>
            <Grid2>
              <Button
                style={{ minWidth: 180 }}
                onClick={() => {
                  setOpenCreateEstrategiaModal(true);
                }}
                variant="contained"
              >
                adicionar estratégia
              </Button>
            </Grid2>
            <Grid2>
              <Button
                style={{ minWidth: 180 }}
                onClick={() => {
                  setOpenOrderEstrategiasModal(true);
                }}
                variant="contained"
                sx={{ mt: 1 }}
              >
                ordenar estratégias
              </Button>
            </Grid2>
          </Grid2>
        )}
      </LoaderComponent>
      {categoriaPergunta && (
        <Grid2 size={12} container mt={2}>
          {perguntas?.map((item) => (
            <QuestionCard
              pergunta={item}
              key={item.id}
              titulo={item.titulo}
              isRequired={item.obrigatorio === '1'}
              isFinalText={item.resposta_texto_final === '1'}
              onSuccess={handleBuscaPerguntas}
            />
          ))}
        </Grid2>
      )}
      <CreateMovimentoModal
        open={openCreateMovimentoModal}
        onClose={() => setOpenCreateMovimentoModal(false)}
        generoTextual={generoTextual}
        onSuccess={(data) => {
          const newSelected = {
            id: data.id,
            label: data.nome,
            nome: data.nome,
            descricao: data.descricao,
          };
          setCategoriaPergunta(newSelected);
          handleBuscaMovimentos(true);
        }}
      />
      {categoriaPergunta && (
        <CreateEstrategiaModal
          open={openCreateEstrategiaModal}
          movimentoId={categoriaPergunta.id}
          movimentoNome={categoriaPergunta.nome}
          onClose={() => setOpenCreateEstrategiaModal(false)}
          onSuccess={() => handleGetBuscaPerguntas()}
          generoTextualId={generoTextual.id}
        />
      )}
      {categoriaPergunta && (
        <EditMovimentoModal
          open={openEditEstrategiaModal}
          onClose={() => setOpenEditEstrategiaModal(false)}
          movimentoId={categoriaPergunta.id}
          nome={categoriaPergunta.nome}
          descricao={categoriaPergunta.descricao}
          defaultColor={categoriaPergunta.cor}
          onSuccess={(data) => {
            const newSelected = {
              id: data.id,
              label: data.nome,
              nome: data.nome,
              descricao: data.descricao,
              cor: data.cor,
            };
            setCategoriaPergunta(newSelected);
            handleBuscaMovimentos(true);
          }}
        />
      )}
      {movimentosOrdenacao && (
        <OrderMovimentosModal
          onClose={() => setOpenOrderMovimentosModal(false)}
          open={openOrderMovimentosModal}
          movimentos={movimentosOrdenacao}
          onSuccess={() => handleBuscaMovimentos(true)}
        />
      )}
      {categoriaPergunta && estrategiasOrdenacao && (
        <OrderEstrategiasModal
          onClose={() => setOpenOrderEstrategiasModal(false)}
          open={openOrderEstrategiasModal}
          estrategias={estrategiasOrdenacao}
          movimentoTitulo={categoriaPergunta.nome}
          onSuccess={() => handleBuscaPerguntas(true)}
        />
      )}
    </Grid2>
  );
};

export default TabMovimento;
