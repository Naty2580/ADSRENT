<template>
  <div class="dashboard">
    <aside class="sidebar">
      <nav>
        <router-link to="/dashboard/overview">Overview</router-link>
        <router-link to="/dashboard/add-property">Add Property</router-link>
        <router-link to="/dashboard/my-listings">My Listings</router-link>
        <router-link to="/dashboard/bookings">Bookings</router-link>
        <router-link to="/dashboard/settings">Settings</router-link>
      </nav>
    </aside>
    <header class="top-navbar">
      <router-link to="/dashboard/settings">
        <img src="account-icon.png" alt="Account" />
      </router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "DashboardLayout",
};
</script>

<style>
/* Add your styles for the layout here */
</style>
