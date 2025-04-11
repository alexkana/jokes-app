import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import JokeCollectionItem from '@components/JokeCollectionItem.vue';

// Mock the Icon component
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    render: () => {},
  },
}));

describe('JokeCollectionItem Component', () => {
  // Sample joke for testing
  const mockJoke = {
    id: 'joke_123',
    setup: 'Why do programmers prefer dark mode?',
    punchline: 'Because light attracts bugs!',
    type: 'programming' as const,
    rating: 4,
    createdAt: Date.now(),
  };

  it('renders joke content correctly', () => {
    const wrapper = mount(JokeCollectionItem, {
      props: {
        joke: mockJoke,
      },
    });

    // Check that joke setup and punchline are displayed
    expect(wrapper.text()).toContain('Why do programmers prefer dark mode?');
    expect(wrapper.text()).toContain('Because light attracts bugs!');

    // Check that joke type is displayed
    expect(wrapper.text()).toContain('Programming');
  });

  it('emits remove event when delete button is clicked', async () => {
    const wrapper = mount(JokeCollectionItem, {
      props: {
        joke: mockJoke,
      },
    });

    // Find the remove button (by aria-label) and click it
    const removeButton = wrapper.find('button[aria-label="Remove joke"]');
    await removeButton.trigger('click');

    // Check that the correct event was emitted with the correct payload
    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('remove')?.[0]).toEqual(['joke_123']);
  });

  it('displays the correct number of filled stars based on rating', () => {
    const wrapper = mount(JokeCollectionItem, {
      props: {
        joke: mockJoke, // Rating is 4
      },
    });

    // Check classes on star buttons
    const starButtons = wrapper.findAll('button[aria-label^="Rate"]');

    // First 4 stars should be filled (yellow)
    for (let i = 0; i < 4; i++) {
      expect(starButtons[i].classes()).toContain('text-yellow-400');
    }

    // 5th star should be empty (gray)
    expect(starButtons[4].classes()).toContain('text-gray-600');
  });

  it('emits rate event with correct rating when a star is clicked', async () => {
    const wrapper = mount(JokeCollectionItem, {
      props: {
        joke: mockJoke,
      },
    });

    // Find the 2nd star button and click it
    const starButtons = wrapper.findAll('button[aria-label^="Rate"]');
    await starButtons[1].trigger('click');

    // Check that the correct event was emitted
    expect(wrapper.emitted('rate')).toBeTruthy();
    expect(wrapper.emitted('rate')?.[0]).toEqual(['joke_123', 2]);
  });
});
