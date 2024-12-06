<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div
      :class="[
        'transition-all',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        'bg-gray-800',
        'text-white',
        'h-full',
        'flex',
        'flex-col'
      ]"
    >
      <!-- Profile Section -->
      <div class="flex justify-center items-center p-4 bg-gray-900">
        <div class="text-white font-bold text-lg">Profile</div>
      </div>

      <!-- Sidebar Items -->
      <nav class="flex-grow overflow-y-auto">
        <router-link
          v-for="(item, index) in sidebarItems"
          :key="index"
          :to="item.link"
          class="flex items-center text-white p-3 hover:bg-gray-700 w-full"
        >
          <!-- Icon -->
          <i :class="[item.icon, 'mr-3']"></i>
          <!-- Text -->
          <span v-if="!isSidebarCollapsed">{{ item.name }}</span>
        </router-link>
      </nav>

      <!-- Footer Section (Logout Button) -->
      <div class="p-4 bg-red-600 hover:bg-red-500 transition-colors">
        <button
          class="w-full text-white"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <!-- Dynamic Page Content based on current route -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      isSidebarCollapsed: false, // State for the sidebar toggle
      sidebarItems: [
        { name: "Accueil", link: "/dashboard", icon: "fas fa-home" },
        { name: "Réalisation", link: "/dashboard/realisation", icon: "fas fa-cogs" },
        { name: "Boutique", link: "/dashboard/page2", icon: "fas fa-chart-line" },
        // Add more items as needed
      ],
    };
  },
  methods: {
    toggleSidebar() {
      // Toggle the sidebar's expanded/collapsed state
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    logout() {
      // Handle logout logic here
      alert("Logged out!");
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles here if needed */
</style>
