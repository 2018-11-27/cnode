<template>
  <div id="app">
    <!--顶部导航-->
    <cnode-header/>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      cnodeHeader: () => import('@/components/Header')
    }
  }
</script>

<style>
  /*@import 'assets/bootstrap-3.3.7/css/bootstrap.css';*/

  html {
    /*全站背景颜色*/
    background-color: #DDDDDD;

    /*默认的 1rem 等于 16px, 下面将使 1rem 等于 10px, 便于单位换算*/
    font-size: 62.5%; /* 10 ÷ 16 × 100% = 62.5% */
  }

  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    font-size: 2rem;
    color: #2C3E50;
  }
</style>
