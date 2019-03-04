<template>
  <div>
    <h2>Signup Page</h2>
    <form @submit.prevent="signup" method="post" enctype="multipart/form-data">
      <div>
          <input  type="text" placeholder="Name" v-model="name">
      </div>
      <div>
          <input placeholder="Your email" type="email" v-model="email">
      </div>
      <div>
          <input placeholder="Password" type="password" v-model="password">
      </div>
      <!-- <div>
          <input placeholder="Confirm password" type="password" v-model="password2">
      </div> -->
      <div>
          <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>


<script>
  export default {
    data(){
      return {
        name : "Tester",
        email : "test@test.com",
        password : "test"
        // password2 : ""
      }
    },
    methods: {
      signup: function () {
        // debugger;
        let info = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('signup', info).then(() => this.$router.push('/login'))

      }
    }
}
</script>
