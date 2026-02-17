import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Build as BuildIcon } from '@mui/icons-material';

const AdminPageTemplate = ({ title, subtitle, icon: IconComponent = BuildIcon }) => {
  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h4" 
          fontWeight="700" 
          color="#1E293B" 
          gutterBottom
          sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Perfect Grid Layout for Empty State */}
      <Grid 
        container 
        spacing={0}
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: {
            xs: 16,
            sm: 20,
            md: 24
          }
        }}
      >
        <Grid 
          item 
          sx={{ 
            display: 'flex',
            height: '100%',
            padding: 0
          }}
        >
          <Card 
            sx={{ 
              width: '100%',
              height: '100%',
              minHeight: { xs: 300, sm: 400, md: 500 },
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent 
              sx={{ 
                p: { xs: 3, sm: 4, md: 6 },
                pb: { xs: 3, sm: 4, md: 6 } + 'px !important',
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box sx={{ 
                width: { xs: 60, sm: 70, md: 80 },
                height: { xs: 60, sm: 70, md: 80 },
                borderRadius: '50%', 
                bgcolor: '#F0FDFA', 
                color: '#14B8A6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 3,
                flexShrink: 0
              }}>
                <IconComponent sx={{ fontSize: { xs: 30, sm: 35, md: 40 } }} />
              </Box>
              
              <Typography 
                variant="h5" 
                fontWeight="700" 
                color="#1E293B" 
                gutterBottom
                sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}
              >
                {title}
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 3, 
                  maxWidth: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  lineHeight: 1.6
                }}
              >
                This section is ready for configuration. Start by adding your first {title.toLowerCase()} to get started.
              </Typography>
              
              <Box sx={{ 
                display: 'inline-block',
                px: 3,
                py: 1,
                bgcolor: '#F0FDFA',
                borderRadius: 2,
                border: '1px solid #A7F3D0'
              }}>
                <Typography 
                  variant="body2" 
                  color="#0D9488" 
                  fontWeight="500"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  Coming Soon
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPageTemplate;