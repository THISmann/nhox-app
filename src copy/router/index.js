import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Realisation from '../views/DashboardElement/Realisation.vue';
import LoginPage from '../views/LoginPage.vue';
import Dashboard from '../views/Dashboard.vue';
import Page1 from '../views/DashboardElement/page1.vue';
import Page2 from '../views/DashboardElement/page2.vue';
import RealisationItem from '../views/RealisationItem.vue';
import Order from "../views/DashboardElement/filterOrder.vue";
import { useArticleStore } from '../stores/articleStore'; // Import article store
import { useProductStore } from '../stores/productStore'; // Import product store
import { useOrderStore } from '../stores/orderStore'; // Import order store

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
        {
          path: 'order',
          name: 'order',
          component: Order, // Page2
        }
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

// After route change, fetch data from the stores
router.afterEach((to, from) => {
  const articleStore = useArticleStore();
  const productStore = useProductStore();
  const orderStore = useOrderStore();

  // Fetch articles when visiting any route
  articleStore.fetchArticles();
  productStore.fetchProducts(); // You can modify the store fetch logic as needed
  orderStore.fetchOrders(); // Fetch orders when on the order-related route

  // Fetch products when visiting the dashboard or product pages
  if (to.name === 'dashboard' || to.name === 'order') {
    productStore.fetchProducts(); // You can modify the store fetch logic as needed
    orderStore.fetchOrders(); // Fetch orders when on the order-related route
  }
});

export default router;
