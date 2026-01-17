import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Section = ({
  children,
  title,
  subtitle,
  titleAlign = 'center',
  titleVariant = 'h3',
  subtitleVariant = 'body1',
  backgroundColor = 'white',
  padding = 'section',
  maxWidth = 'lg',
  className = '',
  sx = {},
  ...props
}) => {
  const paddingStyles = {
    section: { py: { xs: 6, md: 10 } },
    compact: { py: { xs: 4, md: 6 } },
    spacious: { py: { xs: 8, md: 12 } }
  };

  const titleVariants = {
    h1: {
      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
      fontWeight: 800,
      lineHeight: 1.2
    },
    h2: {
      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
      fontWeight: 700,
      lineHeight: 1.25
    },
    h3: {
      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
      fontWeight: 700,
      lineHeight: 1.3
    },
    h4: {
      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
      fontWeight: 600,
      lineHeight: 1.35
    }
  };

  return (
    <Box
      component="section"
      className={`modern-section ${className}`}
      sx={{
        backgroundColor,
        ...paddingStyles[padding],
        ...sx
      }}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        {(title || subtitle) && (
          <Box 
            sx={{ 
              textAlign: titleAlign,
              mb: title || subtitle ? 4 : 0 
            }}
          >
            {title && (
              <Typography
                variant={titleVariant}
                sx={{
                  ...titleVariants[titleVariant],
                  color: '#14B8A6',
                  mb: subtitle ? 2 : 0,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': titleAlign === 'center' ? {
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    backgroundColor: '#14B8A6',
                    borderRadius: '2px'
                  } : {
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '60px',
                    height: '3px',
                    backgroundColor: '#14B8A6',
                    borderRadius: '2px'
                  }
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant={subtitleVariant}
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: '#64748B',
                  maxWidth: '600px',
                  mx: titleAlign === 'center' ? 'auto' : 0
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Section;