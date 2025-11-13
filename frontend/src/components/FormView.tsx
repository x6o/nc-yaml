import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Switch,
  Box,
  Divider,
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
        <Typography>
          Server Configuration
        </Typography>

        <TextField
          fullWidth
          label="Host"
          value="Host val"
          helperText="Hostname or IP address"
        />

        <TextField
          fullWidth
          label="Port"
          type="number"
          value="port val"
        />

        <FormControlLabel
          control={
            <Switch
              checked={true}
            />
          }
          label="Enable SSL"
        />

        <Divider />

        <Typography >
          Logging Configuration
        </Typography>

        <FormControl component="fieldset">
          <FormLabel component="legend">Log Level</FormLabel>
          <RadioGroup
            value="debug"
          >

            <FormControlLabel value="debug" control={<Radio />} label="Debug" />
            <FormControlLabel value="info" control={<Radio />} label="Info" />
            <FormControlLabel value="warn" control={<Radio />} label="Warn" />
            <FormControlLabel value="error" control={<Radio />} label="Error" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          label="Log File"
          value="Log file"
        />
      </Box>
    </Paper>
  );
};

export default FormView;
