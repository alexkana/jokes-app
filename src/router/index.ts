import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CollectionView from '../views/CollectionView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        description: 'Discover random and programming jokes',
      }
    },
  
    {
      path: '/collection',
      name: 'collection',
      component: CollectionView,
      meta: {
        title: 'Collection',
        description: 'View and manage your saved jokes',
      }
    }
  ]
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  // Set the document title based on the route's meta title
  if (to.meta.title) {
    document.title = `Jokes App | ${to.meta.title}`
  }
  next()
})

export default router