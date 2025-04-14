import { Avatar, Badge, Button, Grid2, Typography } from '@mui/material';
import { useApp } from 'app/shared/hooks';
import { formatCpf, Theme } from 'app/shared/utils';
import { MdOutlineModeEdit, MdPerson } from 'react-icons/md';
import EditUserModal from '../EditUserModal';
import EditFotoUserModal from '../EditFotoUserModal';
import ChangePasswordModal from '../ChangePasswordModal';
import { LoaderComponent } from 'app/shared/components';
import { useState } from 'react';

const UserProfile = ({ responseAluno, id }) => { // id from aluno, this cames from route
    const { user } = useApp()
    const [editUserModal, setEditUserModal] = useState(false)
    const [editFotoUserModal, setEditFotoUserModal] = useState(false)
    const [alteraSenhaModal, setAlteraSenhaModal] = useState(false)

    const aluno = id ? responseAluno?.data : user?.relacionado?.[0]
    const profilePic = id ? aluno?.usuario?.foto : user?.foto

    return (
        <LoaderComponent {...responseAluno} message="Buscando dados do aluno...">
            <Grid2 display="flex" flexDirection="column" alignItems="center">
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    onClick={() => { !id && setEditFotoUserModal(true) }}
                    badgeContent={                   
                        !id && <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '5px',
                                background: 'white',
                                border: '1px solid #CDCDCD',
                                borderRadius: '30px',
                                cursor: id ? 'default' : 'pointer',
                            }}
                        >
                            <MdOutlineModeEdit />
                        </div>
                    }
                >
                    <Avatar src={profilePic} sx={{ bgcolor: '#CDCDCD', width: 120, height: 120, cursor: id ? 'default' : 'pointer' }}>
                        {profilePic ? 'foto' : <MdPerson size={30} />}
                    </Avatar>
                </Badge>

                <Typography
                    color={Theme.colors.black}
                    mt="16px"
                    fontWeight="500"
                    textAlign="center"
                    fontSize="22px"
                >
                    {aluno?.nome}
                </Typography>
                {aluno?.cpf && <Typography textAlign='center' fontSize='14px'>
                    {formatCpf(aluno?.cpf)}
                </Typography>}
                <Typography textAlign="center" fontSize="12px">
                    {aluno?.email}
                </Typography>
                <Typography textAlign="center" fontSize="12px">
                    {aluno?.grau_instrucao.nome}
                </Typography>
                <Typography textAlign="center" fontSize="14px">
                    {aluno?.instituicao_ensino.nome}
                </Typography>

                { !id && <>
                    <Button sx={{ mt: '30px' }} onClick={() => setEditUserModal(true)} fullWidth variant="contained">
                        EDITAR PERFIL
                    </Button>
                    <Button sx={{ mt: '10px' }} onClick={() => setAlteraSenhaModal(true)} fullWidth variant="text">
                        ALTERAR SENHA
                    </Button>    
                </> }

                {editUserModal && <EditUserModal
                    open={editUserModal}
                    onClose={() => setEditUserModal(false)}
                />}
                {editFotoUserModal && <EditFotoUserModal
                    open={editFotoUserModal}
                    onClose={() => setEditFotoUserModal(false)}
                />}
                {alteraSenhaModal && <ChangePasswordModal
                    open={alteraSenhaModal}
                    onClose={() => setAlteraSenhaModal(false)}
                />}
            </Grid2>
        </LoaderComponent>
    );
};

export default UserProfile;
