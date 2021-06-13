<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>Task Arena</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li><a @click="logout()">logout</a></li>

          <label class="switch">
            <input type="checkbox" @click="onThemeChange()" />
            <span class="slider round"></span>
          </label>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },

    onThemeChange() {
      var element = document.body;
      element.classList.toggle("dark-mode");
    },
  },
};
</script>
