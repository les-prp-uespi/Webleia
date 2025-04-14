import {
  Button,
  Card,
  Grid2,
  Pagination,
} from '@mui/material';
import {
  CardDashboard,
  CardDashboardTitle,
  CardDashboardValue,
  DateDashboard,
  TitleDashboard,
} from './style';
import { PercentageBar } from './components/PercentageBars';
import { UserTable } from './components/UserTable';
import { useService } from 'app/shared/hooks';
import { buscaDashboardCounters } from 'app/services/dashboard';
import { useEffect, useRef, useState } from 'react';
import { LoaderComponent, SearchInput } from 'app/shared/components';
import { buscaTextoRanking } from 'app/services/texto';

const DashboardPage = () => {
  const lastUpdate = useRef(new Date());
  const [userSearch, setUserSearch] = useState('');
  const [page, setPage] = useState(1);

  const { request: requestDashCounters, response: responseDashCounters } = useService(buscaDashboardCounters, {
    cache: true,
    cacheKey: "dashCounters"
  })

  const {
    request: requestRanking,
    response: responseRanking
  } = useService(buscaTextoRanking)

  const getCounters = (ignoreCache = false) => {
    if (ignoreCache) {
      lastUpdate.current = new Date()
    }
    requestDashCounters({
      status: '2'
    }, {
      ignoreCache,
      cancelPrevious: true,
    })
  }

  const getFormatedDate = () => {
    const dateFromater = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
      timeZone: "america/sao_paulo",
    });
    return dateFromater.format(lastUpdate.current)
  }

  const getRanking = (ignoreCache = false) => {
    requestRanking({
      order: "total",
      sort: 'desc',
      limit: 10,
      status: "2",
      nome: userSearch,
      page
    }, {
      ignoreCache,
      cancelPrevious: true,
    })
  }

  const handleUpdate = () => {
    getCounters(true)
    getRanking(true)
  }

  useEffect(() => {
    getCounters()
  }, [])

  useEffect(() => {
    getRanking()
  }, [userSearch, page])

  const counters = responseDashCounters?.data
  const ranking = responseRanking?.data

  const usersCount = () => {
    if (!counters?.counts_perfil_usuario) return 0;
    const users = counters.counts_perfil_usuario.find(perfil => perfil.perfil === '2')
    return users?.total || 0
  }

  const textsCount = () => {
    if (!counters?.count_producoes_textuais_by_status) return 0;
    let sum = 0
    counters.count_producoes_textuais_by_status.forEach(item => {
      if (item.status === "2") {
        sum = sum + Number(item.total)
      }
    })
    return sum
  }

  return (
    <Card style={{ padding: 20, borderRadius: 8 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={12} justifyContent="space-between" flexDirection={'row'} container>
          <Grid2 alignSelf="center">
            <TitleDashboard>Dashboard</TitleDashboard>
            <DateDashboard>Última atualização: {getFormatedDate()}</DateDashboard>
          </Grid2>
          <Grid2 alignSelf="center">
            <Button onClick={handleUpdate} style={{ minWidth: 180 }} variant="contained">
              Atualizar
            </Button>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
          <Grid2 container>
            <LoaderComponent
              height="75px"
              message="Buscando contagem de usuários..."
              errorMessage='Falha ao buscar contagem de usuários.'
              {...responseDashCounters}
            >
              <CardDashboard
                variant="outlined"
                style={{
                  backgroundColor: '#88BFB833',
                }}
              >
                <Grid2 justifyContent="space-between" flexDirection={'row'} container>
                  <CardDashboardTitle>Usuários</CardDashboardTitle>
                  <CardDashboardValue>{usersCount()}</CardDashboardValue>
                </Grid2>
              </CardDashboard>
            </LoaderComponent>

            <LoaderComponent
              height="75px"
              message="Buscando contagem de textos..."
              errorMessage='Falha ao buscar contagem de textos.'
              {...responseDashCounters}
            >
              <CardDashboard
                variant="outlined"
                style={{
                  backgroundColor: '#F0E17466',
                }}
              >
                <Grid2 justifyContent="space-between" flexDirection={'row'} container>
                  <CardDashboardTitle>Produções textuais</CardDashboardTitle>
                  <CardDashboardValue>{textsCount()}</CardDashboardValue>
                </Grid2>
              </CardDashboard>
            </LoaderComponent>
            <LoaderComponent
              height="75px"
              message="Buscando contagem de instituições..."
              errorMessage='Falha ao buscar contagem de instituições.'
              {...responseDashCounters}
            >
              <CardDashboard
                variant="outlined"
                style={{
                  backgroundColor: '#7FA4D666',
                }}
              >
                <Grid2 justifyContent="space-between" flexDirection={'row'} container>
                  <CardDashboardTitle>Instituições de ensino</CardDashboardTitle>
                  <CardDashboardValue>{counters?.count_ies_aluno}</CardDashboardValue>
                </Grid2>
              </CardDashboard>
            </LoaderComponent>
          </Grid2>
          <Grid2 container>
            <PercentageBar counters={counters} {...responseDashCounters} />
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 8 }} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Grid2 style={{ flexGrow: 1 }}>
            <SearchInput label="Buscar por nome" setSearch={setUserSearch} />
            <LoaderComponent
              message="Buscando ranking de usuários..."
              errorMessage='Falha ao buscar ranking de usuários.'
              {...responseRanking}
            >
              <UserTable ranking={ranking} page={page} />
            </LoaderComponent>
          </Grid2>
          <Grid2 container alignSelf={'end'} justifyContent={'flex-end'} style={{ paddingTop: 20 }}>
            {ranking?.last_page > 1 && (
              <Pagination
                count={ranking?.last_page}
                color="primary"
                shape="rounded"
                page={page}
                onChange={(_event, newPage) => {
                  setPage(newPage)
                }}
                style={{
                  marginTop: 20,
                  padding: 10,
                  float: 'right'
                }}
              />
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </Card>
  );
};

export default DashboardPage;
