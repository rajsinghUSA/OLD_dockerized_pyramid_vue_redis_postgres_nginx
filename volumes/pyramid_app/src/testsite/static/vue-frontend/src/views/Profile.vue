/**
* Created by vouill on 11/13/17.
*/

<template>
  <div>
    <div class="headline">
      <img src="../assets/logo.png">
      <h1>Your doge profile</h1>
    </div>
    <p v-if="profile.name">
      <strong>Name:</strong> {{profile.title}} {{profile.name}}
    </p>
  </div>
</template>



<script>
  import { mapState } from 'vuex'
export default {
    name: 'profile',
    computed: mapState({profile: state => state.user.profile})
  }
</script>
