import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AuthUtils, Theme } from 'app/shared/utils';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextInput } from 'pages/auth/components';
import { ButtonWhite, ButtonBlue } from 'pages/auth';
import { Link } from './styles';
import { brazilStates } from 'app/shared/constants';
import { useDebounce, useIsFirstRender, useService } from 'app/shared/hooks';
import { buscaGrausInstrucao } from 'app/services/grausInstrucao';
import { buscaInstituicoesEnsino } from 'app/services/instituicoesEnsino';
import { useForm, SubmitHandler, Form, useFormContext, Controller } from 'react-hook-form';
import { FormAuth } from 'pages/auth/styles';
import { cadastrarUsuario } from 'app/services/auth';
import { ErrorAuth } from 'pages/auth/styles';
import toastr from 'toastr';
import SuccessRegistration from './SuccessRegistration';

const RegisterForm = () => {
  const navigate = useNavigate();
  const isFirstRender = useIsFirstRender()
  const [estado, setEstado] = useState();
  const [success, setSuccess] = useState(false);
  const [grauInstrucao, setGrauInstrucao] = useState();
  const [instituicaoEnsino, setInstituicaoEnsino] = useState();

  const [nomeInstituicaoVisual, setNomeInstituicaoVisual] = useState("");
  const [nomeInstituicao, setNomeInstituicao] = useState();
  const debouncedBuscaNomeInstituicao = useDebounce(nomeInstituicao, 300);

  const handleChangeNome = (value, type) => {
    setNomeInstituicaoVisual(value)
    if (type === 'change') {
      setNomeInstituicao(value)
    }
  }

  const { request: getGrausInstrucao, response: grausInstrucaoResponse } =
    useService(buscaGrausInstrucao);
  const { request: getInstituicoesEnsino, response: instituicoesEnsinoResponse, cancel: cancelRequestInstituicoes } =
    useService(buscaInstituicoesEnsino);
  const { request: cadastrarUsuarioRequest, response: cadastroUsuarioResponse } = useService(
    cadastrarUsuario,
    {
      onSuccess: () => {
        setSuccess(true)
      },
    },
  );
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    console.log(data.instituicaoEnsino);
    console.log(data.instituicaoEnsino?.Objectid);
    console.log(data.instituicaoEnsino?.id);
    console.log(data.instituicaoEnsino?.label);

    if (data.senha !== data.senhaConfirmacao) {
      toastr.error('As senhas digitadas não conferem');
      return;
    }

    if (!data.instituicaoEnsino?.id === undefined) {
      data.instituicaoEnsino = 373;
      toastr.error('Selecione uma instituição de ensino válida');
      return;
    }

    const response = await cadastrarUsuarioRequest({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      run_login: 1,
      long_token: 1,
      uf: estado,
      instituicao_ensino_id: instituicaoEnsino?.id || 373,
      grau_instrucao_id: grauInstrucao,
    });
  };

  useEffect(() => {
    getGrausInstrucao();
  }, []);

  useEffect(() => {
    getInstituicoesEnsino({
      page: 0,
      busca: debouncedBuscaNomeInstituicao,
    }, { cancelPrevious: true });
  }, [debouncedBuscaNomeInstituicao]);

  const grausInstrucaoResponseData = grausInstrucaoResponse.data?.data || [];
  const instituicoesEnsinoResponseData = instituicoesEnsinoResponse.data?.data || [];
  const instituicoesEnsinoDataFormatted = instituicoesEnsinoResponseData.map((instituicao) => ({
    label: instituicao.nome || '',
    id: instituicao.id,
  }));

  if (success) {
    return <SuccessRegistration />
  }

  return (
    <>
      <h1
        style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: '34px', fontWeight: '400' }}
      >
        Cadastro
      </h1>
      <FormAuth autoComplete="off" autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="nome"
          render={({ field }) => <TextInput {...field} label={'Nome'} required />}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => <TextInput {...field} label={'Email'} required />}
        />
        <FormControl
          fullWidth
          style={{
            marginLeft: 0,
          }}
        >
          <InputLabel id="select-state">Estado</InputLabel>
          <Select
            required
            fullWidth
            style={{ marginLeft: 0, height: 47, fontSize: '14px', fontFamily: 'Roboto' }}
            labelId="select-state"
            id="select-state-input"
            value={estado}
            label="Estado"
            defaultValue={0}
            placeholder="Selecione um estado"
            onChange={(e) => {
              setEstado(e.target.value);
            }}
          >
            <MenuItem value={0}>Selecione um estado</MenuItem>
            {brazilStates.map((state) => (
              <MenuItem key={state.code} value={state.code}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{
            marginLeft: 0,
          }}
        >
          <InputLabel id="select-leveleducation">Grau de instrução</InputLabel>
          <Select
            required
            fullWidth
            style={{ marginLeft: 0, height: 47, fontSize: '14px', fontFamily: 'Roboto' }}
            labelId="select-leveleducation"
            id="select-leveleducation-input"
            value={grauInstrucao}
            label="Grau de instrução"
            defaultValue={0}
            placeholder="Selecione uma opção"
            onChange={(e) => {
              setGrauInstrucao(e.target.value);
            }}
          >
            <MenuItem value={0}>Selecione uma opção</MenuItem>

            {grausInstrucaoResponseData.map((grauInstrucao) => (
              <MenuItem key={grauInstrucao.id} value={grauInstrucao.id}>
                {grauInstrucao.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{
            marginLeft: 0,
          }}
        >
          <Autocomplete
            disablePortal
            options={instituicoesEnsinoDataFormatted}
            fullWidth
            filterOptions={(options) => options}
            noOptionsText="Lista de instituições vazia"
            onChange={(e, newValue) => {
              setInstituicaoEnsino(newValue);
            }}
            inputValue={nomeInstituicaoVisual}
            onInputChange={(event, newInputValue) => {
              handleChangeNome(newInputValue, event?.type);
            }}
            renderInput={(params) => (
              <TextField
                slotProps={instituicoesEnsinoResponse.loading ? {
                  input: {
                    endAdornment: <CircularProgress sx={{ position: 'absolute', right: "10px" }} size="20px" />,
                  }
                } : undefined}
                placeholder="Selecione uma IES"
                {...params}
                style={{ margin: 0 }}
                label="Instituição de ensino"
              />
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name="senha"
          render={({ field }) => <TextInput {...field} required type="password" label={'Senha'} />}
        />
        <Controller
          control={control}
          name="senhaConfirmacao"
          render={({ field }) => (
            <TextInput {...field} required type="password" label={'Confirmar senha'} />
          )}
        />
        {error && <ErrorAuth>{error}</ErrorAuth>}
        <ButtonBlue fullWidth variant="contained" type={'submit'}
          disabled={cadastroUsuarioResponse.loading}
          sx={{ mt: '10px', minWidth: '140px' }}>
          {cadastroUsuarioResponse.loading ? (
            <CircularProgress size="20px" />
          ) : "Criar usuário"}
        </ButtonBlue>
        <ButtonWhite
          fullWidth
          variant="contained"
          onClick={() => {
            window.location.href = '/auth/login';
          }}
        >
          Cancelar
        </ButtonWhite>
      </FormAuth>
    </>
  );
};

export default RegisterForm;
