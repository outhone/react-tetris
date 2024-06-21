import { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import { useViewContext, ViewActionType } from '../../context/ViewProvider';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddHighScoreModal = ({ score }: { score: number }) => {
  const [showModal, setShowModal] = useState(true);
  const [addName, setAddName] = useState('');
  const [error, setError] = useState(false);
  const { dispatch } = useViewContext();

  const addScore = async () => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/api/highscores`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: addName,
            score,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      console.log(`Successful: ${data}`);
      dispatch({ type: ViewActionType.SET_HOME });
    } catch {
      console.log('error adding high score');
    }
  };

  const addHighScore = () => {
    if (addName.length < 3 || addName.length > 10) {
      setError(true);
    } else {
      addScore();
      setAddName('');
      setShowModal(false);
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddName(e.target.value);
    setError(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={showModal}
      onClose={() => setShowModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showModal}>
        <Stack sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Add Your High Score!
          </Typography>
          <TextField
            error={error}
            helperText="Name must be between 3 and 10 characters"
            value={addName}
            label="Name"
            variant="outlined"
            size="small"
            onChange={onNameChange}
          />
          <Button onClick={addHighScore} variant="contained">
            Submit
          </Button>
        </Stack>
      </Fade>
    </Modal>
  );
};

export default AddHighScoreModal;
