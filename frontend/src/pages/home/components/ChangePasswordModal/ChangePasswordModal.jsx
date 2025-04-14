import { Grid2, TextField } from "@mui/material"
import { GenericModal } from "app/shared/components"
import { useService } from "app/shared/hooks";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import toastr from 'toastr';
import { alterarSenha } from "app/services/auth";

const ChangePasswordModal = ({ open, onClose }) => {
    const formRef = useRef()
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();


    const { request: requestAlterarSenha, response: responseAlterarSenha } = useService(alterarSenha, {
        onSuccess: (data) => {
            toastr.success("Senha alterada com sucesso!");
            onClose()
        }
    });

    const onSubmit = (data) => {
        requestAlterarSenha(data)
    }


    return (
        <GenericModal
            open={open}
            title="Alterar senha"
            preventCloseClickOutside
            hasCloseIcon={false}
            size="xs"
            actions={[
                {
                    color: 'default',
                    onClick: onClose,
                    label: "CANCELAR"
                },
                {
                    label: "SALVAR",
                    disabled: !isValid || responseAlterarSenha.loading,
                    loading: responseAlterarSenha.loading,
                    onClick: () => handleSubmit(onSubmit)(),
                }
            ]}
        >
            <form ref={formRef} action="" autoComplete="nope" autocomplete="nope" onSubmit={handleSubmit(onSubmit)}>

                {/* Corrige bug quando chrome ignora autocomplete off*/}
                <input style={{ opacity: 0, position: 'absolute' }} />
                <input type="password" style={{ opacity: 0, position: 'absolute' }} />

                <Grid2 container spacing={1}>
                    <Controller
                        control={control}
                        name="senha_atual"
                        rules={{ required: true }}
                        render={({ field }) => <TextField  {...field} error={errors.senha_atual} size="small" fullWidth type="password" label={'Senha Atual'} />}
                    />
                    <Controller
                        control={control}
                        name="senha_nova"
                        rules={{ required: true }}
                        render={({ field }) => <TextField  {...field} error={errors.senha_nova} size="small" fullWidth type="password" label={'Senha nova'} />}
                    />
                    <Controller
                        control={control}
                        name="senhaConfirmacao"
                        rules={{
                            required: true,
                            validate: (value, formValues) => {
                                if (formValues?.senha_nova?.length > 0 || value?.length > 0) {
                                    return formValues.senha_nova === value
                                }
                                return true
                            }
                        }}
                        render={({ field }) => (
                            <TextField {...field} error={errors.senhaConfirmacao} fullWidth size="small" type="password" label={'Confirmar senha'} />
                        )}
                    />
                </Grid2>
            </form>
        </GenericModal>
    )
}

export default ChangePasswordModal