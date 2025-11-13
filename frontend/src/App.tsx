import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import * as yaml from 'js-yaml';
import YamlEditor from './components/YamlEditor';
import FormView from './components/FormView';
import './App.css';

// Temp config
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

const App: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [yamlText, setYamlText] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Ref to prevent circular updates
  const isUpdatingRef = useRef<boolean>(false);
  // debounce timeout
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Load configuration from backend
   */
  const loadConfig = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await fetch('/api/config');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to load configuration');
      }

      const configData = result.data;
      setConfig(configData);
      setYamlText(yaml.dump(configData));

      setValidationError(null);
      setSaveError(null);
    } catch (error) {
      setSaveError(`Failed to load configuration: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSave = useCallback(
    (configData: Config) => {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout for 275ms
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          console.log('Saving config:', configData);

          // PUT in BE
          const response = await fetch('/api/config', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(configData),
          });

          const result = await response.json();

          if (!result.success) {
            throw new Error(result.error || 'Failed to save configuration');
          }

          setSaveError(null);
          setSaveSuccess(true);
        } catch (error) {
          setSaveError((error as Error).message);
        }
      }, 275); // ¯\_(ツ)_/¯ https://stackoverflow.com/questions/42361485/how-long-should-you-debounce-text-input#comment79931812_44755058
    },[]);

  /**
   * Handle YAML editor changes
   */
  const handleYamlChange = (value: string): void => {
    // Prevent circular updates
    if (isUpdatingRef.current) {
      return;
    }

    setYamlText(value);
    console.log('YAML changed:', value);

    // update config
    try {
      const parsed = yaml.load(value) as Config;
      setValidationError(null);

      isUpdatingRef.current = true;
      setConfig(parsed);
      isUpdatingRef.current = false;

      debouncedSave(parsed);
    } catch (error) {
      setValidationError(`Invalid YAML: ${(error as Error).message}`);
    }
  };

  /**
   * Handle form view changes
   */
  const handleFormChange = (newConfig: Config): void => {
    // Prevent circular updates
    if (isUpdatingRef.current) {
      return;
    }

    // update config
    setConfig(newConfig);

    isUpdatingRef.current = true;
    setYamlText(yaml.dump(newConfig));
    isUpdatingRef.current = false;

    console.log('Form changed:', newConfig);
    debouncedSave(newConfig);
  };

  // Load initial configuration
  useEffect(() => {
    loadConfig();
  }, []);

    // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading configuration...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          NC YAML Editor
        </Typography>
      </Box>

      {/* Errors go here */}
      {saveError && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
          Error: {saveError}
        </Box>
      )}
      {validationError && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'warning.light', color: 'error.contrastText', borderRadius: 1 }}>
          Warning: {validationError}
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <YamlEditor
            value={yamlText}
            onChange={handleYamlChange}
            error={validationError}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          {config && (
            <FormView
              config={config}
              onChange={handleFormChange}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
