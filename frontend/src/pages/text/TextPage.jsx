import { Box, Button, Grid2, MobileStepper, Step, StepLabel, Stepper, TextField, useMediaQuery, useTheme } from "@mui/material"
import { CreateTextHeader, FinalAjustsStep, OtherInformationsStep, TextAnswerStep } from "./components"
import { useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useDebounce, useService } from "app/shared/hooks";
import { buscaTextoById, updateTexto } from "app/services/texto";
import { useDispatch, useSelector } from "react-redux";
import { clearCreationState, setPerguntas, setTexto } from "app/redux/reducers/textoSlice";
import { LoaderComponent } from "app/shared/components";
import { removeTags } from "app/shared/utils";
import { clearCache } from "app/redux/reducers/cacheSlice";

const steps = [
    "Responda ao que se pede",
    "Outras informações",
    "Ajustes finais",
]

const maxStep = steps.length - 1

const TextPage = () => {
    const params = useParams();
    const theme = useTheme();
    const { selectedTexto, respostas } = useSelector(state => state.texto);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [currentStep, setCurrentStep] = useState(0);
    const textId = params.id;

    const [titulo, setTitulo] = useState(selectedTexto?.titulo || "");
    const debouncedTitulo = useDebounce(titulo, 500);
    const { request: requestUpdateTexto } = useService(updateTexto);

    const handleSaveTitulo = () => {
        if (selectedTexto?.titulo && (selectedTexto?.titulo !== titulo)) {
            requestUpdateTexto({
                id: selectedTexto?.id,
                titulo,
            });
            dispatch(clearCache("buscaListaTextos"));
        }
    };

    useEffect(() => {
        handleSaveTitulo();
    }, [debouncedTitulo]);

    useEffect(() => {
        if (selectedTexto?.titulo) {
            setTitulo(selectedTexto.titulo || "");
        }
    }, [selectedTexto?.titulo]);

    const { request: requestTexto, response, retry } = useService(buscaTextoById, {
        onSuccess: (data) => {
            dispatch(setTexto(data));

            const sortedPerguntas = [...(data.genero_textual?.perguntas || [])].sort((a, b) => {
                const aId = Number(a.categoria_pergunta_id) || 0;
                const bId = Number(b.categoria_pergunta_id) || 0;
                return aId - bId;
            });

            dispatch(setPerguntas(sortedPerguntas));
        },
    });

    useEffect(() => {
        requestTexto({
            id: textId,
            with: [
                "genero_textual.perguntas.categoria_pergunta",
                "genero_textual.perguntas.itens",
                "respostas",
            ],
        });

        return () => {
            dispatch(clearCreationState());
        };
    }, []);

    const isCurrentStepValid = useMemo(() => {
        if (!selectedTexto) return false;

        if (currentStep === 0) {
            const perguntas = selectedTexto.genero_textual?.perguntas || [];
            const requiredPerguntasIds = perguntas
                .filter(pergunta => String(pergunta.obrigatorio) === "1") // Normaliza comparação como string
                .map(pergunta => String(pergunta.id)); // Garante que IDs são strings

            return requiredPerguntasIds.every(perguntaId => {            
                const resposta = respostas?.[perguntaId];               
                return resposta?.answered === true; // Compara explicitamente como boolean
            });
        }

        if (currentStep === 1) {
            return Object.values(respostas || {}).some(resposta => resposta?.checked === true); // Verificação explícita
        }

        if (currentStep === 2) {
            const hasText = removeTags(selectedTexto?.texto || "").length > 0;
            return hasText;
        }

        return false;
    }, [selectedTexto, currentStep, respostas]);

    return (
        <Grid2
            height="fit-content"
            borderRadius="4px"
            border="1px solid #CDCDCD"
            bgcolor="white"
            width="100%"
            padding="20px"
        >
            <LoaderComponent
                {...response}
                message="Buscando texto..."
                errorMessage="Falha ao buscar texto"
                retry={retry}
            >
            
            {selectedTexto && <CreateTextHeader step={currentStep} isValid={isCurrentStepValid} />}

            {!isMobile && selectedTexto && (
                <Box
                    my="20px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        sx={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
                    >
                        Passo anterior
                    </Button>
                    <Stepper sx={{ width: "600px" }} activeStep={currentStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel sx={{ whiteSpace: "nowrap" }}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Button
                        size="small"
                        variant="contained"
                        disabled={!isCurrentStepValid}
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        sx={{ visibility: currentStep === maxStep ? "hidden" : "visible" }}
                    >
                        Próxima etapa
                    </Button>
                </Box>
            )}

            {selectedTexto && (
                <TextField
                    fullWidth
                    size="small"
                    name="search"
                    label="Título"
                    variant="outlined"
                    sx={{ mb: "10px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                />
            )}

            {isMobile && selectedTexto && (
                <MobileStepper
                    variant="dots"
                    steps={steps.length}
                    position="static"
                    sx={{ my: "20px" }}
                    activeStep={currentStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={() => setCurrentStep(prev => prev + 1)}
                            disabled={currentStep === steps.length - 1 || !isCurrentStepValid}
                        >
                            Próximo
                            {theme.direction === "rtl" ? <FiArrowLeft /> : <FiArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            disabled={currentStep === 0}
                        >
                            {theme.direction === "rtl" ? <FiArrowRight /> : <FiArrowLeft />}
                            Voltar
                        </Button>
                    }
                />
            )}

            {currentStep === 0 && <TextAnswerStep />}
            {currentStep === 1 && <OtherInformationsStep />}
            {currentStep === 2 && <FinalAjustsStep />}

            </LoaderComponent>
        </Grid2>
    );
};

export default TextPage;
