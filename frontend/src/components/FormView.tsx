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

// Same as app.tsx
interface Config {
  server: {
    host: string;
    port: number;
    use_ssl: boolean;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    file: string;
  };
}

interface FormViewProps {
  config: Config;
  onChange: (config: Config) => void;
}

const FormView: React.FC<FormViewProps> = ({ config, onChange }) => {
  const handleServerChange = (field: any, value: any) => {
    onChange({
      ...config,
      server: { ...config.server, [field]: value },
    });
  };

  const handleLoggingChange = (field: any, value: string) => {
    onChange({
      ...config,
      logging: { ...config.logging, [field]: value },
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Form View
      </Typography>
  
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Server Configuration
        </Typography>
        

        <TextField
          fullWidth
          label="Host"
          value={config.server?.host || ''}
          onChange={(e) => handleServerChange('host', e.target.value)}
          helperText="Hostname or IP address"
        />

        <TextField
          fullWidth
          label="Port"
          type="number"
          value={config.server?.port || ''}
          onChange={(e) => handleServerChange('port', parseInt(e.target.value, 10))}
          margin="normal"
        />

        <FormControlLabel
          control={
            <Switch
              checked={config.server?.use_ssl || false}
              onChange={(e) => handleServerChange('use_ssl', e.target.checked)}
            />
          }
          label="Enable SSL"
        />

        <Divider sx={{ my: 3 }}/>

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Logging Configuration
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Log Level</FormLabel>
          <RadioGroup
            value={config.logging?.level || 'debug'}
            onChange={(e) => handleLoggingChange('level', e.target.value)}
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
          value={config.logging?.file || ''}
          onChange={(e) => handleLoggingChange('file', e.target.value)}
          margin="normal"
        />
      </Box>
    </Paper>
  );
};

export default FormView;
