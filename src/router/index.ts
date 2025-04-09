import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CollectionView from '../views/CollectionView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home',
      description: 'Discover random and programming jokes',
    },
  },
  {
    path: '/collection',
    name: 'Collection',
    component: CollectionView,
    meta: {
      title: 'Collection',
      description: 'View and manage your saved jokes',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Update document title based on route meta
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // Set the document title based on the route's meta title
    if (to.meta.title) {
      document.title = `Jokes App | ${to.meta.title as string}`;
    }
    next();
  }
);

export default router;
