import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Grid2,
  Pagination,
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
import { SubtitlePage, TitlePage } from './style';
import { useEffect, useState } from 'react';
import { FiCheckCircle, FiEdit2, FiTrash } from 'react-icons/fi';
import { useConfirmModal, useService } from 'app/shared/hooks';
import { buscaGenerosTextuais, updateGeneroTextual } from 'app/services/genero';
import { CreateTextualGenreModal } from '..';
import GeneroDeleteModal from '../components/GeneroDeleteModal';
import { FinishModal } from '../components';
import { useNavigate } from 'react-router-dom';

const ReadTextualGenrePage = () => {
  const [isOpenCreateGenreTextualModal, setIsOpenCreateGenreTextualModal] = useState(false);
  const [isOpenDeleteGenreTextualModal, setIsDeleteCreateGenreTextualModal] = useState(false);
  const [isOpenPublishGenreTextualModal, setIsOpenPublishGenreTextualModal] = useState(false);
  const [genero, setGenero] = useState();
  const navigate = useNavigate();

  const confirmModal = useConfirmModal();

  const { request: publicaGeneroTextualRequest } = useService(updateGeneroTextual, {
    onSuccess: () => {
      confirmModal.hideConfirmModal();
      getGenero();
    },
  });

  const {
    request: requestBuscaGenerosTextuais,
    response: buscaGenerosResponse,
    retry,
  } = useService(buscaGenerosTextuais);

  const getGenero = () => {
    requestBuscaGenerosTextuais({
      withCount: ['perguntas', 'categorias_pergunta'],
    });
  };
  useEffect(() => {
    getGenero();
  }, []);

  const generosTextuais = buscaGenerosResponse.data?.data || [];
  const generosTextuaisTotal = buscaGenerosResponse.data?.total || 0;
  const lastPage = buscaGenerosResponse?.data?.last_page;
  const currentPage = buscaGenerosResponse?.data?.current_page;

  const handleEditTextualGenre = (id) => {
    navigate(`/admin/textual-genre/edit/${id}`);
  };

  const handleDeleteTextualGenre = (genero) => {
    setGenero(genero);
    setIsDeleteCreateGenreTextualModal(true);
  };

  const handlePublishTextualGenre = async (genero) => {
    const confirmed = await confirmModal.openConfirmModal({
      title: 'Publicar gênero textual',
      loader: true,
      message: (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography fontWeight="bold">Confirma a publicação do gênero textual?</Typography>
          <Typography fontSize="15px">
            <b>Nome:</b>&nbsp; {genero.nome}
          </Typography>
          <Typography fontSize="15px">
            <b>Quantidade de movimentos:</b>&nbsp;{genero.categorias_pergunta_count}
          </Typography>
          <Typography fontSize="15px">
            <b>Quantidade de estratégias:</b>&nbsp;{genero.perguntas_count}
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
      id: genero?.id,
      publicado: '1',
    });
  };

  return (
    <>
      <Card style={{ padding: 20, borderRadius: 8 }}>
        <Grid2 container style={{ padding: 20, borderRadius: 8 }}>
          <Grid2 size={12} justifyContent="space-between" flexDirection={'row'} container>
            <Grid2 alignSelf="center">
              <TitlePage>Listagem de gêneros textuais</TitlePage>
              <SubtitlePage>{generosTextuaisTotal} Gêneros textuais</SubtitlePage>
            </Grid2>
            <Grid2 alignSelf="center">
              <Button
                style={{ minWidth: 180 }}
                onClick={() => {
                  setIsOpenCreateGenreTextualModal(true);
                }}
                variant="contained"
              >
                novo gênero textual
              </Button>
            </Grid2>
          </Grid2>
          <Grid2 container size={12}>
            <LoaderComponent
              {...buscaGenerosResponse}
              message="Buscando gêneros textuais..."
              errorMessage="Falha ao buscar gêneros textuais"
              retry={retry}
            >
              <StyledTableContainer style={{ marginTop: 10 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Nome</TableCell>
                      <TableCell align="left">Movimentos</TableCell>
                      <TableCell align="left">Estratégias</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {generosTextuais.map((genero) => {
                      const isPublicado = genero.publicado === '1';
                      return (
                        <TableRow key={genero.id}>
                          <TableCell align="left" width="100px">
                            <span
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: 400,
                                textAlign: 'left',
                              }}
                            >
                              {genero.nome}
                            </span>
                          </TableCell>
                          <TableCell align="left" width="100px">
                            <span
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: 400,
                                textAlign: 'left',
                              }}
                            >
                              {genero.categorias_pergunta_count}
                            </span>
                          </TableCell>
                          <TableCell align="left" width="100px">
                            <span
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: 400,
                                textAlign: 'left',
                              }}
                            >
                              {genero.perguntas_count}
                            </span>
                          </TableCell>
                          <TableCell align="left" width="100px">
                            <Chip
                              color={isPublicado ? 'success' : 'default'}
                              label={isPublicado ? 'Publicado' : 'Rascunho'}
                            />
                          </TableCell>
                          <TableCell align="left" width="100px">
                            <Grid2 container spacing={1}>
                              <TableActionButton
                                onClick={() => {
                                  handleDeleteTextualGenre(genero);
                                }}
                              >
                                <FiTrash />
                              </TableActionButton>
                              <>
                                <TableActionButton
                                  onClick={() => {
                                    handleEditTextualGenre(genero.id);
                                  }}
                                >
                                  <FiEdit2 />
                                </TableActionButton>
                                <TableActionButton
                                  onClick={() => {
                                    handlePublishTextualGenre(genero);
                                  }}
                                >
                                  <FiCheckCircle />
                                </TableActionButton>
                              </>
                            </Grid2>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </LoaderComponent>
          </Grid2>
          <Grid2 width="100%">
            {lastPage > 1 && (
              <Pagination
                count={generosTextuaisTotal}
                color="primary"
                shape="rounded"
                page={currentPage}
                onChange={(_event, newPage) => {
                  requestBuscaGenerosTextuais({ page: newPage });
                }}
                style={{
                  marginTop: 20,
                  padding: 10,
                  float: 'right',
                }}
              />
            )}
          </Grid2>
        </Grid2>
      </Card>
      <CreateTextualGenreModal
        open={isOpenCreateGenreTextualModal}
        onClose={() => {
          setIsOpenCreateGenreTextualModal(false);
        }}
      />
      {genero && isOpenDeleteGenreTextualModal && (
        <GeneroDeleteModal
          open={isOpenDeleteGenreTextualModal}
          onClose={() => {
            setIsDeleteCreateGenreTextualModal(false);
            setGenero();
          }}
          onSuccess={() => {
            setGenero();
            requestBuscaGenerosTextuais({});
          }}
          genero={genero}
        />
      )}
      {genero && isOpenPublishGenreTextualModal && (
        <FinishModal
          open={isOpenPublishGenreTextualModal}
          onClose={() => {
            setIsOpenPublishGenreTextualModal(false);
            setGenero();
          }}
          onSuccess={() => {
            setGenero();
            requestBuscaGenerosTextuais({});
          }}
          genero={genero}
        />
      )}
    </>
  );
};

export default ReadTextualGenrePage;
