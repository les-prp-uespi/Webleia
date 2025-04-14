import { LoadingButton } from '@mui/lab';
import { Button, Grid2 } from '@mui/material';
import { updateGeneroTextual } from 'app/services/genero';
import { RichTextComponent } from 'app/shared/components';
import { useService } from 'app/shared/hooks';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toastr from 'toastr';

const TabTutorial = ({ generoTextual, updateGenero }) => {
  const [tutorial, setTutorial] = useState();

  const {
    request: requestUpdateGeneroTextual,
    response: updateGeneroTextualResponse,
    retry,
  } = useService(updateGeneroTextual, {
    onSuccess: (data) => {
      toastr.success('Tutorial editado com sucesso');
      updateGenero();
    },
  });

  const onSubmit = () => {
    if (!tutorial) {
      toastr.warning('Preencha o campo tutorial');
      return;
    }

    requestUpdateGeneroTextual({
      id: generoTextual.id,
      descricao: tutorial,
    });
  };

  const handleChangeTutorial = (value) => {
    setTutorial(value.html);
  };

  return (
    <Grid2 size={12} container>
      <Grid2 size={12}>
        <RichTextComponent onChange={handleChangeTutorial} defaultValue={generoTextual.descricao} />
      </Grid2>
      <Grid2 size={12} mt={2}>
        <Grid2 alignSelf="center">
          <LoadingButton
            loading={updateGeneroTextualResponse.loading}
            style={{ minWidth: 180 }}
            onClick={onSubmit}
            variant="contained"
          >
            Salvar informações
          </LoadingButton>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default TabTutorial;
