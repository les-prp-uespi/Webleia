import { FormControl, Grid2 } from '@mui/material';
import { ColorPicker, GenericModal, RichTextComponent } from 'app/shared/components';
import QuestionContent from '../QuestionContent';
import { LabelCreateQuestion, TitleDeleteQuestion } from './style';
import { TextInput } from 'pages/auth/components';
import { Controller, useForm } from 'react-hook-form';
import { useService } from 'app/shared/hooks';
import { saveCategoriaPergunta } from 'app/services/categoriaPergunta';
import toastr from 'toastr';
import { useState } from 'react';
import React from 'react';

const CreateMovimentoModal = ({ open, onClose, onSuccess, generoTextual }) => {
  const { handleSubmit, control, reset, watch } = useForm();
  const [color, setColor] = useState('#fff');
  const [descricao, setDescricao] = useState();
  const [plainText, setPlainTextDescricao] = useState();
  const [watchNome] = watch(['nome']);
  const { request, response, retry } = useService(saveCategoriaPergunta, {
    onSuccess: async (data) => {
      toastr.success('Movimento criado com sucesso');
      setColor('#fff');
      await reset();
      await onSuccess(data);
      await onClose();
    },
  });

  const onSubmit = (data, e) => {
    request({
      nome: data.nome,
      descricao: descricao,
      ordem: 1,
      genero_textual_id: generoTextual.id,
      cor: color,
    });
  };

  const handleChangeColor = (newValue) => {
    setColor(newValue);
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
          onClick: onClose,
          label: 'CANCELAR',
        },
        {
          label: 'CONFIRMAR',
          disabled: !watchNome || !plainText,
          loading: response.loading,
          onClick: () => {
            handleSubmit(onSubmit)();
          },
        },
      ]}
    >
      <>
        <Grid2 container size={12}>
          <Grid2 container size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <Grid2 size={12} container justifyContent={'center'}>
              <Grid2 alignSelf={'center'}>
                <FormControl fullWidth>
                  <ColorPicker defaultColor={color} handleChange={handleChangeColor} />
                </FormControl>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 container size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
            <Grid2 size={12} mt={3}>
              <Controller
                control={control}
                name="nome"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextInput {...field} required label="Nome (Obrigatório)" fullWidth />
                  </FormControl>
                )}
              />
            </Grid2>
            <Grid2 mt={3}>
              <Grid2>
                <LabelCreateQuestion>Descrição simplificada (Obrigatório):</LabelCreateQuestion>
              </Grid2>
              <Grid2 mt={1}>
                <RichTextComponent onChange={handleChangeDescricao} />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </>
    </GenericModal>
  );
};

export default CreateMovimentoModal;
