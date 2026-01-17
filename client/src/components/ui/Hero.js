import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Button from './Button';

const Hero = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = '',
  primaryButtonText,
  primaryButtonOnClick,
  secondaryButtonText,
  secondaryButtonOnClick,
  backgroundColor = 'gradient',
  minHeight = { xs: 'auto', md: '85vh' },
  className = '',
  sx = {},
  children,
  ...props
}) => {
  const backgroundStyles = {
    gradient: {
      background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)'
    },
    solid: {
      backgroundColor: '#F8FAFC'
    },
    image: {
      backgroundImage: 'url("/hero-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  };

  return (
    <Box
      component="section"
      className={`modern-hero ${className}`}
      sx={{
        minHeight,
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        ...backgroundStyles[backgroundColor],
        ...sx
      }}
      {...props}
    >
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        background: backgroundColor === 'image' 
          ? 'rgba(255, 255, 255, 0.85)' 
          : 'none'
      }} />
      
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: { xs: 'auto', md: '70vh' },
            width: '100%',
            gap: { xs: 3, md: 4 },
            px: { xs: 2, md: 3 }
          }}
        >
          {/* Text Column - Left */}
          <Box
            sx={{
              flex: { md: '0 0 48%' },
              width: '100%',
              textAlign: { xs: 'center', md: 'left' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: { md: '450px' }
            }}
          >
            <Box sx={{ maxWidth: { md: '450px' } }}>
              {subtitle && (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    color: '#0F766E',
                    fontWeight: 600,
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {subtitle}
                </Typography>
              )}
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  color: '#134E4A',
                  mb: 3,
                  lineHeight: 1.2
                }}
              >
                {title}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: '#64748B',
                  mb: 4,
                  lineHeight: 1.7
                }}
              >
                {description}
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap'
                }}
              >
                {primaryButtonText && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={primaryButtonOnClick}
                    sx={{
                      px: { xs: 3, md: 4 },
                      py: 1.5
                    }}
                  >
                    {primaryButtonText}
                  </Button>
                )}
                
                {secondaryButtonText && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={secondaryButtonOnClick}
                    sx={{
                      px: { xs: 3, md: 4 },
                      py: 1.5
                    }}
                  >
                    {secondaryButtonText}
                  </Button>
                )}
              </Box>
              
              {children}
            </Box>
          </Box>
          
          {/* Image Column - Right */}
          <Box
            sx={{
              flex: { md: '0 0 48%' },
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { md: '450px' }
            }}
          >
            <Box
              sx={{
                width: { xs: '90%', sm: '85%', md: '100%' },
                maxWidth: { md: '450px' },
                height: '100%',
                maxHeight: { md: '450px' },
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(20, 184, 166, 0.2)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-10px) scale(1.02)',
                  boxShadow: '0 35px 70px rgba(20, 184, 166, 0.3)'
                }
              }}
            >
              <Box
                component="img"
                src={imageSrc}
                alt={imageAlt}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;