import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';

const LoadingIndicator = () => (
  <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{ height: '100%' }}
  >
    <CircularProgress size="3rem" />
  </Stack>
);

export default LoadingIndicator;
