import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(svelte|ts)', '../src/stories/**/*.mdx'],
  addons: ['@storybook/addon-svelte-csf', '@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/svelte-vite'
};

export default config;
