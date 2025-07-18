// src/components/layout/CustomToolbar.tsx
import { Container, Toolbar } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface HeaderToolbarProps {
  children: ReactNode;
}

export default function HeaderToolbar({ children }: HeaderToolbarProps) {
  const theme = useTheme();

  const backgroundColor = theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4);

  return (
    <Container>
      <Toolbar
        variant='dense'
        disableGutters
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
          backdropFilter: 'blur(24px)',
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
          backgroundColor,
          boxShadow: (theme.vars || theme).shadows[1],
          padding: '8px 12px'
        }}
      >
        {children}
      </Toolbar>
    </Container>
  );
}
