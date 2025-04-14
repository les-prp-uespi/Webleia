import { Autocomplete, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { buscaGrausInstrucao } from "app/services/grausInstrucao";
import { buscaInstituicoesEnsino } from "app/services/instituicoesEnsino";
import { GenericModal, LoaderComponent } from "app/shared/components"
import { useApp, useDebounce, useIsFirstRender, useService } from "app/shared/hooks";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { brazilStates } from 'app/shared/constants';
import { formatCpf } from "app/shared/utils";
import { atualizarAluno, buscaAluno } from "app/services/auth";
import toastr from 'toastr';

const EditUserModal = ({ open, onClose }) => {
    const { user, updateUser } = useApp()
    const userRelacionado = user.relacionado[0]
    const isFirstRender = useIsFirstRender()
    const formRef = useRef()
    const { control, register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            ...userRelacionado,
            instituicao_ensino: userRelacionado?.instituicao_ensino ? {
                id: userRelacionado?.instituicao_ensino?.id,
                label: userRelacionado?.instituicao_ensino.nome
            } : null
        }
    });

    const [nomeInstituicaoVisual, setNomeInstituicaoVisual] = useState("");
    const [nomeInstituicao, setNomeInstituicao] = useState("");
    const debouncedBuscaNomeInstituicao = useDebounce(nomeInstituicao, 600);

    const handleChangeNome = (value, type) => {
        setNomeInstituicaoVisual(value)
        if (type === 'change') {
            setNomeInstituicao(value)
        }
    }

    const { request: getGrausInstrucao, response: grausInstrucaoResponse } =
        useService(buscaGrausInstrucao, {
            cache: true,
            cacheKey: "buscaGrausInstrucao"
        });
    const { request: getInstituicoesEnsino, response: instituicoesEnsinoResponse } =
        useService(buscaInstituicoesEnsino, {
            cache: true,
            cacheKey: "buscaInstituicoes",
        });

    const { request: requestBuscaAluno } = useService(buscaAluno, {
        onSuccess: (data) => {
            toastr.success("Dados alterados com sucesso!");
            updateUser({ ...user, relacionado: [data] })
            onClose()
        }
    });

    const { request: requestAtualiza, response: responseAtualiza } = useService(atualizarAluno, {
        onSuccess: (data) => {
            requestBuscaAluno({
                id: userRelacionado.id,
                with: "grau_instrucao,instituicao_ensino"
            })
        }
    });


    useEffect(() => {
        getGrausInstrucao();
    }, []);

    useEffect(() => {
        getInstituicoesEnsino({
            page: 0,
            busca: debouncedBuscaNomeInstituicao,
        }, { cancelPrevious: true });
    }, [debouncedBuscaNomeInstituicao]);

    const onSubmit = (data) => {
        const userId = data.id
        delete data.grau_instrucao
        delete data.created_at
        delete data.updated_at
        delete data.id

        data.instituicao_ensino_id = data?.instituicao_ensino?.id || null

        requestAtualiza({ id: userId, data })
    }

    const grausInstrucaoResponseData = grausInstrucaoResponse.data?.data || [];
    const instituicoesEnsinoResponseData = instituicoesEnsinoResponse.data?.data || [];
    const instituicoesEnsinoDataFormatted = instituicoesEnsinoResponseData.map((instituicao) => ({
        label: instituicao.nome || '',
        id: instituicao.id,
    }));

    const loadingOptions = grausInstrucaoResponse.loading || (instituicoesEnsinoResponse.loading && nomeInstituicao === "")
    return (
        <GenericModal
            open={open}
            title="Editar informações"
            preventCloseClickOutside
            hasCloseIcon={false}
            size="sm"
            actions={[
                {
                    color: 'default',
                    onClick: onClose,
                    label: "CANCELAR"
                },
                {
                    label: "CONFIRMAR",
                    disabled: !isValid || responseAtualiza.loading,
                    loading: responseAtualiza.loading,
                    onClick: () => handleSubmit(onSubmit)(),
                }
            ]}
        >
            {loadingOptions && <LoaderComponent
                loading
                message="Carregando Informações..."
            />}
            {!loadingOptions && <form ref={formRef} action="" autoComplete="nope" autocomplete="nope" onSubmit={handleSubmit(onSubmit)}>

                {/* Corrige bug quando chrome ignora autocomplete off*/}
                <input style={{ opacity: 0, position: 'absolute' }} />
                <input type="password" style={{ opacity: 0, position: 'absolute' }} />

                <Grid2 container spacing={2}>
                    <TextField
                        fullWidth
                        {...register('nome', { required: true })}
                        label="Nome"
                        autocomplete="off"
                        size="small"
                        error={errors.nome}
                        required
                    />
                    <TextField
                        fullWidth
                        {...register('email', { required: true })}
                        label="Email"
                        disabled
                        size="small"
                        error={errors.email}
                        required
                    />

                    <Controller
                        control={control}
                        name="cpf"
                        rules={{
                            validate: (value) => {
                                if (value?.trim()?.length > 0) {
                                    return value?.trim()?.length >= 11
                                }
                                return true
                            }
                        }}
                        render={({ field }) => {
                            return (
                                <TextField
                                    {...field}
                                    value={formatCpf(field.value)}
                                    fullWidth
                                    error={errors.cpf}
                                    size="small"
                                    label={'CPF'} />
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        name="uf"
                        rules={{ required: true, validate: (value) => value !== "vazio" }}
                        render={({ field }) => {
                            return (
                                <FormControl
                                    fullWidth
                                    required
                                    style={{
                                        marginLeft: 0,
                                    }}
                                >
                                    <InputLabel id="select-state">Estado</InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        style={{ marginLeft: 0, fontSize: '14px', fontFamily: 'Roboto' }}
                                        labelId="select-state"
                                        id="select-state-input"
                                        value={field.value}
                                        label="Estado"
                                        error={errors.uf}
                                        size="small"
                                        placeholder="Selecione um estado"
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                    >
                                        <MenuItem value='vazio'>Selecione um estado</MenuItem>
                                        {brazilStates.map((state) => (
                                            <MenuItem key={state.code} value={state.code}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )
                        }}
                    />



                    <Grid2 item container width='100%' spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <Controller
                                control={control}
                                name="grau_instrucao_id"
                                rules={{ required: true, validate: (value) => value !== "vazio" }}
                                render={({ field }) => {
                                    return (
                                        <FormControl
                                            fullWidth

                                        >
                                            <InputLabel id="select-leveleducation">Grau de instrução</InputLabel>
                                            <Select
                                                required
                                                fullWidth
                                                style={{ marginLeft: 0, height: 40, fontSize: '14px', fontFamily: 'Roboto' }}
                                                labelId="select-leveleducation"
                                                id="select-leveleducation-input"
                                                value={field.value}
                                                size="small"
                                                error={errors.grau_instrucao_id}
                                                label="Grau de instrução"
                                                placeholder="Selecione uma opção"
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                }}
                                            >
                                                <MenuItem value="vazio">Selecione uma opção</MenuItem>
                                                {grausInstrucaoResponseData.map((grauInstrucao) => (
                                                    <MenuItem key={grauInstrucao.id} value={grauInstrucao.id}>
                                                        {grauInstrucao.nome}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>

                            <Controller
                                control={control}
                                name="instituicao_ensino"
                                render={({ field }) => {
                                    return (
                                        <FormControl
                                            fullWidth
                                        >
                                            <Autocomplete
                                                options={instituicoesEnsinoDataFormatted}
                                                fullWidth
                                                size="small"
                                                autoSelect={false}
                                                filterOptions={(options) => options}
                                                noOptionsText="Lista de instituições vazia"
                                                value={field.value}
                                                onChange={(e, newValue) => {
                                                    field.onChange(newValue);
                                                }}
                                                inputValue={nomeInstituicaoVisual}
                                                onInputChange={(event, newInputValue) => {
                                                    handleChangeNome(newInputValue, event?.type);
                                                }}
                                                renderInput={(params) => {
                                                    return (
                                                        (
                                                            <TextField
                                                                {...params}
                                                                slotProps={instituicoesEnsinoResponse.loading ? {
                                                                    input: {
                                                                        endAdornment: <CircularProgress sx={{ position: 'absolute', right: "10px" }} size="20px" />,
                                                                    }
                                                                } : undefined}
                                                                error={errors.instituicao_ensino}
                                                                size="small"
                                                                placeholder="Selecione uma IES"
                                                                style={{ margin: 0 }}
                                                                label="Instituição de ensino"
                                                            />
                                                        )
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                    )
                                }}
                            />

                        </Grid2>
                    </Grid2>
                </Grid2>
            </form>}
        </GenericModal>
    )
}

export default EditUserModal