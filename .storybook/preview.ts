import type { Preview } from '@storybook/svelte-vite';
import '../src/lib/styles.css';
import './preview.css';

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Colour scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (story, context) => {
      const theme = (context.globals.theme as string) ?? 'light';
      document.documentElement.dataset.theme = theme;
      document.body.style.background = theme === 'dark' ? '#09090b' : '#fafafa';
      return story();
    }
  ],
  parameters: { layout: 'padded', controls: { expanded: true } }
};

export default preview;
