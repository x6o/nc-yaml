import React from 'react';
import {
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface FormViewProps {
}

const FormView: React.FC<FormViewProps> = ({ }) => {

  return (
    <Paper>
      <Typography variant="h6" gutterBottom>
        Form View
      </Typography>

      <Box>
        Form goes here
      </Box>
    </Paper>
  );
};

export default FormView;
