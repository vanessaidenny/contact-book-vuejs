<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
  <div className="container d-flex justify-content-center">
    <div className="col-6">
      <header>
        <div class="wrapper py-4 text-center bg-light">
          <h1>Contact Book</h1>
          <nav class="py-2">
            <RouterLink to="/">Contacts</RouterLink>
            <RouterLink to="/new">New Contact</RouterLink>
          </nav>
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>

<style scoped>
nav a.menu-active {
  font-weight: bolder;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: rgb(24, 97, 73) !important;
}

nav a:first-of-type {
  border: 0;
}
</style>
