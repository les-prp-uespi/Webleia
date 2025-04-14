import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { GenericModal, RichTextComponent, UploadComponent } from 'app/shared/components';
import QuestionContent from '../QuestionContent';
import { LabelCreateQuestion, TitleDeleteQuestion } from './style';
import { TextInput } from 'pages/auth/components';
import { Controller, useForm } from 'react-hook-form';
import { useService } from 'app/shared/hooks';
import { savePerguntaGeneroTextual, updatePerguntaGeneroTextual } from 'app/services/pergunta';
import { useEffect, useState } from 'react';
import toastr from 'toastr';
import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';
import { TextoPerguntaLista, TextoPerguntaTypes, TextoPerguntaTypesProps } from 'app/shared/constants';
import ItensComponent from '../ItensComponent';

const EditEstrategiaModal = ({
  open,
  onClose,
  movimentoId,
  movimentoNome,
  generoTextualId,
  onSuccess,
  pergunta,
}) => {
  const [titulo, setTitulo] = useState();
  const [exemplo, setExemplo] = useState();
  const [tutorial, setTutorial] = useState();
  const [descricao, setDescricao] = useState();
  const [tipo, setTipo] = useState('1');
  const [itens, setItens] = useState([]);
  const [obrigatorio, setObrigatorio] = useState(false);
  const [textoFinal, setTextoFinal] = useState(false);
  const [plainTextDescricao, setPlainTextDescricao] = useState();
  const {
    request: requestUpdatePerguntaGeneroTextual,
    retry,
    response: updatePerguntaGeneroTextualResponse,
  } = useService(updatePerguntaGeneroTextual, {
    onSuccess: async (data) => {
      await onSuccess(true);
      await onClose();
    },
  });

  const onSubmit = () => {
    if (!titulo) {
      toastr.warning('Preencha o campo titulo');
      return;
    }

    if (!plainTextDescricao) {
      toastr.warning('Preencha o campo descrição da questão');
      return;
    }

    let itensValues = {}

    if ([TextoPerguntaTypes.CHECKBOX, TextoPerguntaTypes.RADIO].includes(tipo)) {
      itensValues = {
        itens: itens.map(item => {
          if (item.id.includes("new")) {
            return {
              descricao: item.descricao,
              ordem: item.ordem
            }
          }
          return item
        })
      }
    }

    requestUpdatePerguntaGeneroTextual({
      id: pergunta.id,
      categoria_pergunta_id: movimentoId,
      descricao: descricao,
      genero_textual_id: generoTextualId,
      tutorial: tutorial,
      exemplo: exemplo,
      titulo: titulo,
      resposta_texto_final: textoFinal ? '1' : '0',
      obrigatorio: obrigatorio ? '1' : '0',
      tipo,
      ...itensValues
    });
  };

  useEffect(() => {
    if (pergunta) {
      setExemplo(pergunta.exemplo);
      setTutorial(pergunta.tutorial);
      setDescricao(pergunta.descricao);
      setPlainTextDescricao(pergunta.descricao);
      setTitulo(pergunta.titulo);
      setTextoFinal(pergunta.resposta_texto_final === '1');
      setObrigatorio(pergunta.obrigatorio === '1');
      setTipo(pergunta.tipo);
      setItens(pergunta.itens || []);
    }
  }, []);

  const handleChangeTutorial = (value) => {
    setTutorial(value.html);
  };

  const handleChangeExemplo = (value) => {
    setExemplo(value.html);
  };

  const handleChangeDescricao = (value) => {
    setDescricao(value.html);
    setPlainTextDescricao(value.plainText);
  };

  const handleOnClose = () => {
    setExemplo('');
    setTutorial('');
    setDescricao('');
    setTitulo('');
    setPlainTextDescricao('');
    onClose();
  };

  return (
    <GenericModal
      open={open}
      title="Adicionar estratégia"
      subtitle={movimentoNome}
      preventCloseClickOutside
      hasCloseIcon={false}
      size="sm"
      actions={[
        {
          color: 'default',
          onClick: onClose,
          label: 'CANCELAR',
        },
        {
          label: 'CONFIRMAR',
          disabled: !titulo || !plainTextDescricao,
          loading: updatePerguntaGeneroTextualResponse.loading,
          onClick: () => {
            onSubmit();
          },
        },
      ]}
    >
      <>
        <Grid2>
          <TextInput
            onChange={(e) => {
              setTitulo(e.target.value);
            }}
            defaultValue={pergunta.titulo}
            label="Título"
            required
          />
        </Grid2>
        <Grid2 mt={2} container flexDirection={'row'} justifyContent={'space-between'}>
          <Grid2>
            <FormGroup>
              <FormControlLabel
                style={{ fontSize: 12, fontFamily: 'Roboto' }}
                control={
                  <Checkbox
                    checked={obrigatorio}
                    onChange={(e) => setObrigatorio(e.target.checked)}
                  />
                }
                label="Obrigatório"
              />
            </FormGroup>
          </Grid2>
          <Grid2>
            <FormGroup>
              <FormControlLabel
                style={{ fontSize: 12, fontFamily: 'Roboto' }}
                control={
                  <Checkbox
                    checked={textoFinal}
                    onChange={(e) => setTextoFinal(e.target.checked)}
                  />
                }
                label="Resposta pode ir para o texto final"
              />
            </FormGroup>
          </Grid2>
        </Grid2>
        <Grid2 mt={2}>
          <Grid2>
            <LabelCreateQuestion>Descrição da questão (Obrigatório):</LabelCreateQuestion>
          </Grid2>
          <Grid2 mt={1}>
            <RichTextComponent
              defaultValue={pergunta.descricao || ''}
              onChange={handleChangeDescricao}
            />
          </Grid2>
        </Grid2>

        <Grid2 mt={2}>
          <Grid2>
            <LabelCreateQuestion>Tipo de pergunta:</LabelCreateQuestion>
          </Grid2>
          <Grid2 mt={1}>
            <FormControl fullWidth>
              <Select
                value={tipo}
                size='small'
                onChange={e => setTipo(e.target.value)}
              >
                {TextoPerguntaLista.map(t => {
                  return <MenuItem key={t} value={t}>{TextoPerguntaTypesProps[t].text}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid2>
          {[TextoPerguntaTypes.CHECKBOX, TextoPerguntaTypes.RADIO].includes(tipo) && (
            <ItensComponent itens={itens} setItens={setItens} tipo={tipo} />
          )}
        </Grid2>

        <Grid2 mt={2}>
          <Grid2>
            <LabelCreateQuestion>Exemplo (opcional):</LabelCreateQuestion>
          </Grid2>
          <Grid2 mt={1}>
            <RichTextComponent
              defaultValue={pergunta.exemplo || ''}
              onChange={handleChangeExemplo}
            />
          </Grid2>
        </Grid2>

        <Grid2 mt={2}>
          <Grid2>
            <LabelCreateQuestion>Tutorial (opcional):</LabelCreateQuestion>
          </Grid2>
          <Grid2 mt={1}>
            <RichTextComponent
              defaultValue={pergunta.tutorial || ''}
              onChange={handleChangeTutorial}
            />
          </Grid2>
        </Grid2>
      </>
    </GenericModal>
  );
};

export default EditEstrategiaModal;
