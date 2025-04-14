import { FormControl, Grid2 } from '@mui/material';
import { ColorPicker, GenericModal, RichTextComponent } from 'app/shared/components';
import QuestionContent from '../QuestionContent';
import { LabelCreateQuestion, TitleDeleteQuestion } from './style';
import { TextInput } from 'pages/auth/components';
import { Controller, useForm } from 'react-hook-form';
import { useService } from 'app/shared/hooks';
import {
  buscaCategoriaPergunta,
  editCategoriaPergunta,
  saveCategoriaPergunta,
} from 'app/services/categoriaPergunta';
import toastr from 'toastr';
import { useEffect, useState } from 'react';

const EditMovimentoModal = ({
  open,
  onClose,
  nome,
  onSuccess,
  descricao,
  movimentoId,
  defaultColor,
}) => {
  const { handleSubmit, control, reset, watch } = useForm();
  const [color, setColor] = useState(defaultColor);
  const watchNome = watch('nome', nome);
  const [plainText, setPlainTextDescricao] = useState(descricao);
  const [descricaoEdit, setDescricao] = useState(descricao);
  const { request, response, retry } = useService(editCategoriaPergunta, {
    onSuccess: async (data) => {
      toastr.success('Movimento editado com sucesso');
      await reset();
      await onSuccess(data);
      await onClose();
    },
  });

  const handleChangeColor = (newValue) => {
    setColor(newValue);
  };

  const onSubmit = () => {
    request({
      nome: watchNome,
      descricao: descricaoEdit,
      id: movimentoId,
      cor: color,
    });
  };

  const handleChangeDescricao = (value) => {
    setDescricao(value.html);
    setPlainTextDescricao(value.plainText);
  };

  return (
    <GenericModal
      open={open}
      title="Adicionar/Editar movimento"
      preventCloseClickOutside
      hasCloseIcon={false}
      size="md"
      actions={[
        {
          color: 'default',
          onClick: () => {
            reset();
            onClose();
          },
          label: 'CANCELAR',
        },
        {
          label: 'CONFIRMAR',
          disabled: !watchNome || !plainText,
          loading: response.loading,
          onClick: () => {
            onSubmit();
          },
        },
      ]}
    >
      <>
        <Grid2 container size={12}>
          <Grid2 container size={{ xs: 12, sm: 12, md: 4, lg: 4 }} justifyContent={'center'}>
            <Grid2>
              <FormControl fullWidth>
                <ColorPicker defaultColor={defaultColor} handleChange={handleChangeColor} />
              </FormControl>
            </Grid2>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
            <Grid2 mt={3}>
              <Controller
                control={control}
                name="nome"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextInput
                      onChange={field.onChange}
                      defaultValue={nome}
                      required
                      label="Nome (Obrigatório)"
                      fullWidth
                    />
                  </FormControl>
                )}
              />
            </Grid2>
            <Grid2 mt={3}>
              <Grid2>
                <LabelCreateQuestion>Descrição simplificada (Obrigatório):</LabelCreateQuestion>
              </Grid2>
              <Grid2 mt={1}>
                <RichTextComponent defaultValue={descricao} onChange={handleChangeDescricao} />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </>
    </GenericModal>
  );
};

export default EditMovimentoModal;
