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

          <li>
            <i class="bi-color" @click.prevent="onThemeChange()"
              ><svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="bootstrap-icons.svg#toggles" /></svg
            ></i>
          </li>
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
