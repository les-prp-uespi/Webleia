import { Bar, TextBar, Title } from './styles';

const { Grid2, Card, Tooltip, CircularProgress, Alert } = require('@mui/material');

const PercentageBar = ({ counters, loading, error }) => {
  const values = counters?.count_producoes_textuais_by_genero_textual;

  if (loading) {
    return (
      <Card
        style={{
          width: '100%',
          minHeight: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 15,
        }}
      >
        <CircularProgress size={30} />
      </Card>
    );
  }

  if (!values) return null;

  const total = values.reduce((acc, currentValue) => {
    return acc + Number(currentValue.total);
  }, 0);

  const options = values.map((tipo) => {
    return {
      title: tipo.nome,
      value: Number(tipo.total),
      percentage: Math.round((Number(tipo.total) / total) * 100),
    };
  });

  return (
    <Card style={{ width: '100%', padding: 15 }}>
      <Title>Produções textuais X Gênero textual</Title>
      <Grid2 container flexDirection={'column'}>
        {options.length === 0 && <Alert severity="info">Nenhuma produção textual encontrada</Alert>}
        {options.map((option, i) => (
          <Grid2
            container
            key={i}
            flexDirection={'row'}
            justifyContent={'space-between'}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Grid2 size={3} alignContent={'center'}>
              <TextBar>{option.title}</TextBar>
            </Grid2>
            <Grid2 size={9} alignContent={'center'} style={{ paddingLeft: 10 }}>
              <Tooltip title={`${option.percentage}% (${option.value})`}>
                <Bar value={option.percentage} />
              </Tooltip>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </Card>
  );
};

export default PercentageBar;
