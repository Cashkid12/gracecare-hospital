import React from 'react';
import { Box, Typography } from '@mui/material';
import Card from './Card';

const ServiceCard = ({
  icon,
  title,
  description,
  variant = 'vertical',
  className = '',
  sx = {},
  ...props
}) => {
  const isVertical = variant === 'vertical';
  
  return (
    <Card
      variant="elevated"
      sx={{
        height: '100%',
        textAlign: isVertical ? 'center' : 'left',
        p: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 48px rgba(20, 184, 166, 0.2)',
        },
        ...sx
      }}
      className={`service-card ${className}`}
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : { xs: 'column', sm: 'row' },
          alignItems: isVertical ? 'center' : { xs: 'center', sm: 'flex-start' },
          gap: 2,
          height: '100%'
        }}
      >
        {/* Icon Container */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isVertical ? 'center' : { xs: 'center', sm: 'flex-start' },
            minWidth: isVertical ? 'auto' : { sm: '60px' }
          }}
        >
          <Box
            sx={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: 'rgba(20, 184, 166, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(20, 184, 166, 0.15)',
                transform: 'scale(1.1)'
              }
            }}
          >
            {icon}
          </Box>
        </Box>
        
        {/* Content */}
        <Box 
          sx={{ 
            flex: 1,
            textAlign: isVertical ? 'center' : { xs: 'center', sm: 'left' }
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              fontWeight: 700,
              color: '#134E4A',
              mb: 1.5,
              lineHeight: 1.3
            }}
          >
            {title}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#64748B',
              lineHeight: 1.6,
              fontSize: { xs: '0.875rem', md: '0.9375rem' }
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ServiceCard;