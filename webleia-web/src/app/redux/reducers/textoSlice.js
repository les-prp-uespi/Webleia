import { createSlice } from '@reduxjs/toolkit';
import { TextoPerguntaTypes } from 'app/shared/constants';
import { removeTags } from 'app/shared/utils';

const isAnswered = (pergunta, resposta) => {
    const isMultipleChoice = [
        TextoPerguntaTypes.RADIO,
        TextoPerguntaTypes.CHECKBOX
    ].includes(pergunta?.tipo);

    const isNumber = pergunta?.tipo === TextoPerguntaTypes.NUMBER;

    if (isMultipleChoice || isNumber) {
        return resposta != null && String(resposta).trim().length > 0; // Verifica `null` e espaços
    }

    return resposta != null && removeTags(String(resposta)).trim().length > 0;
};

const textoSlice = createSlice({
    name: 'texto',
    initialState: {
        selectedTexto: null,
        perguntas: [],
        respostas: {},
        filters: {
            genero_textual_id: -1,
            titulo: '',
            status: -1,
            page: 1
        }
    },
    reducers: {
        setTextoFiltro: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setTexto: (state, action) => {
            const respostas = action.payload?.respostas || [];
            const perguntas = action.payload.genero_textual.perguntas;

            const formatedRespostas = {};
            respostas.forEach(resposta => {
                const pergunta = perguntas.find(pergunta => String(pergunta.id) === String(resposta.pergunta_id)); // Normaliza tipos
                formatedRespostas[resposta.pergunta_id] = {
                    text: resposta.resposta || '',
                    respostaId: String(resposta.id || ''),
                    checked: String(resposta.uso_texto_final) === '1', // Compara como string
                    answered: isAnswered(pergunta, resposta.resposta),
                    num_palavras: Number(resposta.num_palavras) || 0 // Evita NaN
                };
            });

            state.selectedTexto = action.payload;
            state.respostas = formatedRespostas;
        },
        setPerguntas: (state, action) => {
            const perguntas = action.payload || [];
            state.perguntas = perguntas.map(pergunta => ({
                ...pergunta,
                id: String(pergunta.id) // Normaliza ID como string
            }));
        },
        setResposta: (state, action) => {
            const perguntaId = String(action.payload.perguntaId); // Normaliza ID como string
            const resposta = action.payload.resposta || {};
            const respostaTextoFinal = String(action.payload.resposta_texto_final || '') === '1';

            const checked = resposta.uso_texto_final != null
                ? String(resposta.uso_texto_final) === '1'
                : true;

            const pergunta = state.perguntas.find(pergunta => String(pergunta.id) === perguntaId);

            state.respostas[perguntaId] = {
                text: resposta.resposta || '',
                respostaId: String(resposta.id || ''),
                checked: respostaTextoFinal && checked,
                answered: isAnswered(pergunta, resposta.resposta),
                num_palavras: Number(resposta.num_palavras) || 0
            };
        },
        updateUsoFinalRespostas: (state, action) => {
            const perguntasIds = action.payload.perguntasIds.map(id => String(id)); // Normaliza IDs como strings
            const checked = Boolean(action.payload.checked); // Garante booleano

            perguntasIds.forEach(id => {
                if (state.respostas[id]) {
                    state.respostas[id].checked = checked;
                }
            });
        },
        updateTextoFinal: (state, action) => {
            state.selectedTexto = {
                ...state.selectedTexto,
                texto: action.payload.texto || '',
                num_palavras: Number(action.payload.num_palavras) || 0,
                updated_at: action.payload.updated_at || null
            };
        },
        clearCreationState: (state) => {
            state.selectedTexto = null;
            state.perguntas = [];
            state.respostas = {};
        }
    }
});

export const {
    setTextoFiltro,
    setTexto,
    setPerguntas,
    setResposta,
    clearCreationState,
    updateUsoFinalRespostas,
    updateTextoFinal
} = textoSlice.actions;

export default textoSlice.reducer;
