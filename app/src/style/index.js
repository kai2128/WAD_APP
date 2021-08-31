import {extendTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  fontConfig: {
    Roboto: {
      100: {
        normal: 'Inter-Light',
        italic: 'Roboto-LightItalic',
      },
      200: {
        normal: 'Inter-Light',
        italic: 'Roboto-LightItalic',
      },
      300: {
        normal: 'Inter-Light',
        italic: 'Roboto-LightItalic',
      },
      400: {
        normal: 'Inter-Regular',
        italic: 'Roboto-Italic',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-Medium',
        italic: 'Roboto-MediumItalic',
      },
      700: {
        normal: 'Inter-Bold',
      },
      800: {
        normal: 'Inter-Bold',
        italic: 'Roboto-BoldItalic',
      },
      900: {
        normal: 'Inter-Black',
        italic: 'Roboto-BoldItalic',
      },
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'Inter',
    },
  },
});
