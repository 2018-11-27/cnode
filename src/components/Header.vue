<template>
  <div class="header">
    <router-link :to="{name: 'root'}">
      <img src="../assets/cnodejs_light.svg">
    </router-link>
    <img v-if="loading" src="../assets/loading.jpg" alt="loading" class="loading">
    <span><a href="#">关于</a></span>
  </div>
</template>

<script>
  import axios from 'axios'

  axios.interceptors.request.use(config => {
    vm.loading = true
    return config
  }, error => {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(response => {
    console.log(vm.loading)
    vm.loading = false
    console.log(vm.loading)
    return response
  }, error => {
    return Promise.reject(error)
  })

  const vm = {
    name: 'Header',
    data () {
      return {
        loading: false
      }
    }
  }

  export default vm
</script>

<style scoped>
  /*添加 "scopod" 属性以将CSS仅限于此组件*/

  .header {
    background: #5a5555;
    height: 50px;
  }

  a {
    text-decoration: none;
    color: #cbc9c9;
  }

  .header > a > img {
    max-width: 12rem;
    margin-left: 5rem;
    margin-top: 0.5rem;
  }

  .header .loading {
    width: 3rem;
    height: 3rem;
    margin-top: 0.6rem;
    margin-left: 1rem;
    border-radius: 50%;
  }

  span {
    float: right;
    margin-right: 5rem;
    margin-top: 1rem;
  }
</style>
