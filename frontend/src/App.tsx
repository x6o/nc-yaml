import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          NC YAML
        </Typography>
      </Box>

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
