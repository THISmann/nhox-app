import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Realisation from '../views/DashboardElement/Realisation.vue';
import LoginPage from '../views/LoginPage.vue';
import Dashboard from '../views/Dashboard.vue';
import Page1 from '../views/DashboardElement/page1.vue';
import Page2 from '../views/DashboardElement/page2.vue';
import RealisationItem from '../views/RealisationItem.vue';

// Define routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/realisation/:id',
    name: 'RealisationItem',
    component: RealisationItem
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
        {
          path: '',
          name: 'page2',
          component: Page2, // Default page
        },
        {
          path: 'realisation',
          name: 'realisation',
          component: Realisation, // Page1
        },
        {
          path: 'page2',
          name: 'page2',
          component: Page2, // Page2
        },
        // Add more pages as needed
      ]
  }
 
];

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // If the route requires auth and the user is not authenticated, redirect to login
    next({ name: 'login' });
  } else {
    next(); // Continue to the route
  }
});

export default router;
