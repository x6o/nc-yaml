import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
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

  /**
   * Load configuration from backend
   */
  const loadConfig = async (): Promise<void> => {
    try {
      setLoading(true);
      // Temp mock data
      const mockConfig: Config = {
        server: {
          host: "127.0.0.1",
          port: 3000,
          use_ssl: true
        },
        logging: {
          level: "debug",
          file: "./debug.log"
        }
      };
      setConfig(mockConfig);
      setYamlText(JSON.stringify(mockConfig, null, 2)); // Temporary placeholder

      setValidationError(null);
      setSaveError(null);
    } catch (error) {
      setSaveError(`Failed to load configuration: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSave = useCallback(
    async (configData: Config) => {
      try {
        console.log('Saving config:', configData);
        setSaveError(null);
        setSaveSuccess(true);
      } catch (error) {
        setSaveError(`Failed to save: ${(error as Error).message}`);
      }
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
  };

  /**
   * Handle form view changes
   */
  const handleFormChange = (newConfig: Config): void => {
    // Prevent circular updates
    if (isUpdatingRef.current) {
      return;
    }

    setConfig(newConfig);


    console.log('Form changed:', newConfig);
    debouncedSave(newConfig);
  };

  // Load initial configuration
  useEffect(() => {
    loadConfig();
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
          NC YAML
        </Typography>
      </Box>

      {/* Errors go here */}
      {saveError && (
        <Box>
          Error: {saveError}
        </Box>
      )}
      {validationError && (
        <Box>
          Warning: {validationError}
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Box>
            YAML Editor
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box>
            Form View
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
