import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface YamlEditorProps {
}

const YamlEditor: React.FC<YamlEditorProps> = ({}) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        YAML Editor
      </Typography>

      <Box
       
      >
        <textarea
          value="hello world"
        />
      </Box>
    </Paper>
  );
};

export default YamlEditor;
