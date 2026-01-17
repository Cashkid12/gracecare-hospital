import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = ({
  label,
  placeholder,
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  helperText,
  error = false,
  disabled = false,
  required = false,
  multiline = false,
  rows = 1,
  InputProps,
  className = '',
  sx = {},
  ...props
}) => {
  const baseStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'white',
      transition: 'all 0.2s ease',
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.12)',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: '#14B8A6',
        borderWidth: '1px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#14B8A6',
        borderWidth: '2px',
        boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1)',
      },
      '&.Mui-error fieldset': {
        borderColor: '#EF4444',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 500,
      '&.Mui-focused': {
        color: '#14B8A6',
      },
      '&.Mui-error': {
        color: '#EF4444',
      },
    },
    '& .MuiInputBase-input': {
      py: size === 'small' ? 1 : 1.5,
      px: 1.5,
      fontSize: size === 'small' ? '0.875rem' : '1rem',
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginTop: '6px',
      fontSize: '0.75rem',
    },
    ...sx
  };

  return (
    <MuiTextField
      label={label}
      placeholder={placeholder}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      helperText={helperText}
      error={error}
      disabled={disabled}
      required={required}
      multiline={multiline}
      rows={rows}
      InputProps={InputProps}
      className={`modern-textfield ${className}`}
      sx={baseStyles}
      {...props}
    />
  );
};

export default TextField;