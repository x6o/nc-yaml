import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface YamlEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const YamlEditor: React.FC<YamlEditorProps> = ({ value, onChange, error }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        YAML Editor
      </Typography>

      <Box>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            minHeight: '400px',
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '12px',
            border: 'none', 
          }}
        />
      </Box>
    </Paper>
  );
};

export default YamlEditor;
