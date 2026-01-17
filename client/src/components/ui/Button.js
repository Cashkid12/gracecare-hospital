import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({
  children,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  className = '',
  sx = {},
  ...props
}) => {
  const baseStyles = {
    borderRadius: '8px',
    fontWeight: 500,
    textTransform: 'none',
    boxShadow: variant === 'contained' ? '0 4px 12px rgba(20, 184, 166, 0.25)' : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: size === 'small' ? '8px 16px' : size === 'large' ? '14px 28px' : '10px 20px',
    fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem',
    minWidth: size === 'small' ? 'auto' : '120px',
    '&:hover': {
      boxShadow: variant === 'contained' 
        ? '0 8px 24px rgba(20, 184, 166, 0.35)' 
        : '0 2px 8px rgba(20, 184, 166, 0.1)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      opacity: 0.6,
      transform: 'none',
      boxShadow: 'none',
    },
    ...sx
  };

  const variantStyles = {
    contained: {
      backgroundColor: '#14B8A6',
      color: 'white',
      border: 'none',
      '&:hover': {
        backgroundColor: '#0F766E',
      }
    },
    outlined: {
      backgroundColor: 'transparent',
      color: '#14B8A6',
      border: '2px solid #14B8A6',
      '&:hover': {
        backgroundColor: 'rgba(20, 184, 166, 0.05)',
        borderColor: '#0F766E',
        color: '#0F766E',
      }
    },
    text: {
      backgroundColor: 'transparent',
      color: '#134E4A',
      border: 'none',
      '&:hover': {
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        color: '#14B8A6',
      }
    }
  };

  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      className={`modern-button ${className}`}
      sx={{
        ...baseStyles,
        ...variantStyles[variant],
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;