import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { FiSlash } from "react-icons/fi";
const LoaderComponent = ({
  loading,
  error,
  retry,
  message,
  errorMessage = "Falha ao carregar informações",
  children,
  height
}) => {
  if (loading) {
    return (
      <Alert
        color={"info"}
        icon={<CircularProgress size={25} />}
        style={{
          textAlign: "center",
          alignItems: "center",
          margin: "10px 0px",
          borderRadius: '5px',
          height: height,
          width: "100%"
        }}
      >
        <Grid
          container
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography>{message}</Typography>
        </Grid>
      </Alert>
    );
  }
  if (error) {
    return (
      <Alert
        color={"error"}
        icon={<FiSlash />}
        style={{
          textAlign: "center",
          alignItems: "center",
          margin: children ? "0px" : "10px 0px",
          width: "100%"
        }}
      >
        <Grid
          container
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography variant="body1" color="red">
            {errorMessage}
          </Typography>
          {retry && <Button onClick={retry}>Atualizar</Button>}
        </Grid>
      </Alert>
    );
  }
  return children;
};

export default LoaderComponent;
