import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Navbar from '@components/Navbar.vue';

// Mock the Icon component
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    render: () => {},
  },
}));

// Mock routes for testing
const routes = [
  {
    path: '/',
    name: 'Home',
    component: { template: '<div>Home</div>' },
    meta: { title: 'Home' },
  },
  {
    path: '/collection',
    name: 'Collection',
    component: { template: '<div>Collection</div>' },
    meta: { title: 'Collection' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('Navbar Component', () => {
  beforeEach(async () => {
    // Reset router to home before each test
    router.push('/');
    await router.isReady();
  });

  it('renders the app name correctly', () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
        // Don't stub RouterLink so the actual content is rendered
        // stubs: {
        //   RouterLink: true,
        // },
      },
    });

    expect(wrapper.text()).toContain('Jokes App');
  });

  it('shows proper active page styling for Home', async () => {
    await router.push('/');

    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });

    // In the desktop menu, the Home link should have the active class
    const homeLink = wrapper.findAll('a').find((el) => el.text().includes('Home'));
    expect(homeLink?.classes()).toContain('text-indigo-200');

    // The Collection link should not have the active class
    const collectionLink = wrapper.findAll('a').find((el) => el.text().includes('Collection'));
    expect(collectionLink?.classes()).not.toContain('text-indigo-200');
  });

  it('toggles mobile menu when button is clicked', async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });

    // Initially, mobile menu should be hidden
    expect(wrapper.find('.sm\\:hidden.hidden').exists()).toBe(true);

    // Click the toggle button
    const menuButton = wrapper.find('button');
    await menuButton.trigger('click');

    // Now the mobile menu should be visible
    expect(wrapper.find('.sm\\:hidden.block').exists()).toBe(true);

    // Click again to hide
    await menuButton.trigger('click');

    // Menu should be hidden again
    expect(wrapper.find('.sm\\:hidden.hidden').exists()).toBe(true);
  });

  it('displays both Home and Collection links', () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });

    // Check desktop menu links
    const desktopLinks = wrapper.findAll('.hidden.sm\\:flex a');
    expect(desktopLinks.length).toBe(2);

    // The first link should be Home
    expect(desktopLinks[0].text()).toContain('Home');

    // The second link should be Collection
    expect(desktopLinks[1].text()).toContain('Collection');
  });
});
