import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function BoxSx() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#312f2f',
            dark: '#413f3f',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 320,
          height: 250,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          marginTop:2
        }}
      />
    </ThemeProvider>
  );
}