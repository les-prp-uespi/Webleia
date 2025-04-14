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
import { savePerguntaGeneroTextual } from 'app/services/pergunta';
import { useEffect, useState } from 'react';
import toastr from 'toastr';
import { TextoPerguntaLista, TextoPerguntaTypes, TextoPerguntaTypesProps } from 'app/shared/constants';
import ItensComponent from '../ItensComponent';

const CreateEstrategiaModal = ({
  open,
  onClose,
  movimentoId,
  movimentoNome,
  generoTextualId,
  onSuccess,
}) => {
  const { control, watch, reset } = useForm();
  const [exemplo, setExemplo] = useState();
  const [tutorial, setTutorial] = useState();
  const [descricao, setDescricao] = useState();
  const [obrigatorio, setObrigatorio] = useState(false);
  const [tipo, setTipo] = useState('1');
  const [itens, setItens] = useState([{ id: 1, descricao: "Alternativa 1" }]);
  const [textoFinal, setTextoFinal] = useState(false);
  const [plainTextDescricao, setPlainTextDescricao] = useState();
  const {
    request: requestSavePerguntaGeneroTextual,
    retry,
    response: savePerguntaGeneroTextualResponse,
  } = useService(savePerguntaGeneroTextual, {
    onSuccess: async (data) => {
      setExemplo('');
      setTutorial('');
      setDescricao('');
      setTipo(1)
      setPlainTextDescricao('');
      await reset();
      await onSuccess();
      await onClose();
    },
  });

  const [titulo] = watch(['titulo']);

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
          return {
            descricao: item.descricao,
            ordem: item.ordem
          }
        })
      }
    }


    requestSavePerguntaGeneroTextual({
      ordem: 1,
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

  const handleChangeTutorial = (value, firstCheck) => {
    if (!firstCheck) {
      setTutorial(value.html);
    }
  };

  const handleChangeExemplo = (value, firstCheck) => {
    if (!firstCheck) {
      setExemplo(value.html);
    }
  };

  const handleChangeDescricao = (value) => {
    setDescricao(value.html);
    setPlainTextDescricao(value.plainText);
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
          loading: savePerguntaGeneroTextualResponse.loading,
          onClick: () => {
            onSubmit();
          },
        },
      ]}
    >
      <>
        <Grid2>
          <Controller
            control={control}
            name="titulo"
            render={({ field }) => <TextInput {...field} label="Título" required />}
          />
        </Grid2>
        <Grid2 mt={2} container flexDirection={'row'} justifyContent={'space-between'}>
          <Grid2>
            <FormGroup>
              <FormControlLabel
                style={{ fontSize: 12, fontFamily: 'Roboto' }}
                control={<Checkbox onChange={(e) => setObrigatorio(e.target.checked)} />}
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
                    defaultChecked
                    onChange={(e) => {
                      setTextoFinal(e.target.checked);
                    }}
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
            <RichTextComponent onChange={handleChangeDescricao} />
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
            <RichTextComponent onChange={handleChangeExemplo} />
          </Grid2>
        </Grid2>

        <Grid2 mt={2}>
          <Grid2>
            <LabelCreateQuestion>Tutorial (opcional):</LabelCreateQuestion>
          </Grid2>
          <Grid2 mt={1}>
            <RichTextComponent onChange={handleChangeTutorial} />
          </Grid2>
        </Grid2>
      </>
    </GenericModal>
  );
};

export default CreateEstrategiaModal;
