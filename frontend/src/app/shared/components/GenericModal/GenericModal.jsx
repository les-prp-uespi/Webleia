import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Theme } from 'app/shared/utils';
import { FiX } from 'react-icons/fi';
import { Container } from './styles';
import { top } from './../../../../../node_modules/@mui/system/modern/positions/positions';

const GenericModal = ({
  open,
  onClose,
  title,
  subtitle,
  size = 'md',
  children,
  hasCloseIcon = true,
  preventCloseClickOutside = false,
  actions = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (event, reason) => {
    if (preventCloseClickOutside && ['backdropClick', 'escapeKeyDown'].includes(reason)) {
      return;
    }
    onClose?.();
  };

  return (
    <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={isMobile}
        maxWidth={size}
        disableEscapeKeyDown
        sx={{ mt: '60px' }}
      >
        <Box
          position="sticky"
          top={0}
          bgcolor='white'
          zIndex={9999}
        >
          <Box
            width="100%"

            display="flex"
            flexDirection="row"
            alignItems="center"
            p={2}
            paddingBottom={1}
            paddingTop={isMobile ? 8 : 2}
            justifyContent={title ? 'space-between' : 'flex-end'}
          >
            <Box display="flex" flexDirection="column">
              {title && (
                <Typography variant="h5" fontWeight="500" color={Theme.colors.black}>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="caption" color={Theme.colors.black}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            {hasCloseIcon && (
              <IconButton
                style={{
                  right: 10,
                  position: 'absolute',
                }}
                onClick={onClose}
              >
                <FiX color={Theme.colors.black} size={18} />
              </IconButton>
            )}
          </Box>
          <Divider sx={{ mt: 2 }} />


        </Box>
        <Box p={2} paddingTop={2}>
          {children}
        </Box>
        {actions.length > 0 && (
          <Box position='sticky' width='100%' left={0} right={0} bottom={0} bgcolor='white'>
            <Divider />
            <Box display="flex" justifyContent="flex-end" gap="10px" p={2} paddingTop={1}>
              {actions.map((action, index) => {
                return (
                  <Button
                    variant="contained"
                    sx={{ minWidth: '100px' }}
                    size="medium"
                    key={index}
                    {...action}
                    disabled={action.loading || action.disabled}
                  >
                    {action.loading ? (
                      <CircularProgress sx={{ mr: '5px' }} size={20} />
                    ) : (
                      action.label
                    )}
                  </Button>
                );
              })}
            </Box>
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default GenericModal;
