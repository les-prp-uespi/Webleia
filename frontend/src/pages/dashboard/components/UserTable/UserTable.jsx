import { Avatar, Grid2, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { StyledTableContainer } from 'app/shared/components';
import { MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ ranking, page = 1 }) => {
  const navigate = useNavigate()

  if (!ranking) return null
  const lista = ranking.data
  return (
    <>
      <StyledTableContainer style={{ marginTop: 10 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ranking</TableCell>
              <TableCell align="left">Usuário</TableCell>
              <TableCell align="center">Textos publicados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map((user, index) => {
              const profilePic = user.foto
              return (
                <TableRow key={user.id} sx={{ cursor: 'pointer' }} onClick={() => navigate('/admin/perfil-aluno/' + user.id)}>
                  <TableCell align="left" width="100px">
                    <span
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        fontWeight: 400,
                        textAlign: 'left',
                      }}
                    >
                      {index + 1 + (page * 10) - 10}º
                    </span>
                  </TableCell>
                  <TableCell align="left" width="500px">
                    <Grid2 container flexDirection={'row'}>
                      <Grid2 size={2} alignSelf="center">
                        <Avatar src={profilePic} sx={{ bgcolor: '#CDCDCD', width: 34, height: 34 }}>                             
                          {profilePic ? 'foto' : <MdPerson size={16} />}
                        </Avatar>
                      </Grid2>
                      <Grid2 size={10} alignSelf="center">
                        <span
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '12px',
                            fontWeight: 400,
                            textAlign: 'left',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {user.nome} <br />
                          {user.instituicao_ensino_nome}
                        </span>
                      </Grid2>
                    </Grid2>
                  </TableCell>
                  <TableCell align="center" width="300px">
                    <span
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                    >
                      {user.num_producoes}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default UserTable;
