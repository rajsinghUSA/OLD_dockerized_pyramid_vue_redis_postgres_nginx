<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <input required v-model="email" type="email" placeholder="your@email.com"/>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>


<script>
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        const email = this.email
        const password = this.password
        this.$store.dispatch('login', { email, password }).then(() => this.$router.push('/'))
      }
    }
  }
</script>
