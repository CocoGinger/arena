<template>
  <section id="settings">
    <div class="row">
      <div class="col-sm col-lg col-md col1">
      <div class="card">
        <img
          src="https://images.unsplash.com/photo-1611095565995-d09bbf618f6d?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="John"
          style="width:100%"
        />
        <h1>{{ userProfile.name }}</h1>
        <p class="title">{{ userProfile.title }}</p>
        <p>Task Arena Account</p>
      
      </div>
    </div>
    <div class="col-sm col-lg col-md  col1">
      <h3>Settings</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>
      
      <form @submit.prevent>
        <label for="name">Name</label>
        <input
          v-model.trim="name"
          type="text"
          :placeholder="userProfile.name"
          id="name"
        />

        <label for="title">Job Title</label>
        <input
          v-model.trim="title"
          type="text"
          :placeholder="userProfile.title"
          id="title"
        />

        <button @click="updateProfile()" class="button">Update Profile</button>
      </form>
    </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      title: "",
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        title: this.title !== "" ? this.title : this.userProfile.title,
      });

      this.name = "";
      this.title = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
  },
};
</script>
