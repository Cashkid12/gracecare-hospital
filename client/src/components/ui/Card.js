import React from 'react';
import { Card as MuiCard, CardContent, CardActions, CardMedia } from '@mui/material';

const Card = ({
  children,
  variant = 'elevated',
  elevation = 2,
  media,
  mediaHeight = 200,
  actions,
  className = '',
  sx = {},
  ...props
}) => {
  const baseStyles = {
    borderRadius: '16px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: variant === 'outlined' ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
    backgroundColor: 'white',
    overflow: 'hidden',
    boxShadow: variant === 'elevated' 
      ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
      : variant === 'outlined'
      ? '0 2px 12px rgba(0, 0, 0, 0.04)'
      : 'none',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: variant === 'elevated'
        ? '0 12px 40px rgba(0, 0, 0, 0.12)'
        : variant === 'outlined'
        ? '0 8px 24px rgba(0, 0, 0, 0.08)'
        : '0 4px 16px rgba(0, 0, 0, 0.06)',
    },
    ...sx
  };

  return (
    <MuiCard
      className={`modern-card ${className}`}
      sx={baseStyles}
      {...props}
    >
      {media && (
        <CardMedia
          component="img"
          height={mediaHeight}
          image={media}
          alt=""
          sx={{
            objectFit: 'cover',
          }}
        />
      )}
      <CardContent sx={{ p: 3 }}>
        {children}
      </CardContent>
      {actions && (
        <CardActions sx={{ p: 3, pt: 0 }}>
          {actions}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;