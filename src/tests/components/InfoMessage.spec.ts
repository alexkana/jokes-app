import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import InfoMessage from '@components/InfoMessage.vue';
import type { Message } from '@interfaces';

// Mock the Icon component since we're not testing its functionality
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    render: () => {},
  },
}));

describe('InfoMessage Component', () => {
  it('renders with success message correctly', () => {
    const message = {
      text: 'Operation successful',
      type: 'success' as const,
    };

    const wrapper = mount(InfoMessage, {
      props: {
        message,
      },
    });

    // Check that message text is displayed
    expect(wrapper.text()).toContain('Operation successful');

    // Check for success styling
    expect(wrapper.classes()).toContain('inline-flex');
    expect(wrapper.attributes('class')).toContain('bg-green-900');
    expect(wrapper.attributes('class')).toContain('text-green-100');
  });

  it('renders with error message correctly', () => {
    const message = {
      text: 'An error occurred',
      type: 'error' as const,
    };

    const wrapper = mount(InfoMessage, {
      props: {
        message,
      },
    });

    // Check that message text is displayed
    expect(wrapper.text()).toContain('An error occurred');

    // Check for error styling
    expect(wrapper.attributes('class')).toContain('bg-red-900');
    expect(wrapper.attributes('class')).toContain('text-red-100');
  });

  it('renders with info message correctly', () => {
    const message = {
      text: 'Just an information',
      type: 'info' as const,
    };

    const wrapper = mount(InfoMessage, {
      props: {
        message,
      },
    });

    // Check that message text is displayed
    expect(wrapper.text()).toContain('Just an information');

    // Check for info styling
    expect(wrapper.attributes('class')).toContain('bg-blue-900');
    expect(wrapper.attributes('class')).toContain('text-blue-100');
  });

  it('does not render when message is null', () => {
    const wrapper = mount(InfoMessage, {
      props: {
        // Cast null as a partial Message to satisfy TypeScript
        message: null as unknown as Message,
      },
    });

    // The component should not be in the DOM
    expect(wrapper.html()).toBe('<!--v-if-->');
  });
});
