<template>
  <div>
    <page-left/>
  </div>
</template>

<script>
  export default {
    name: 'index',
    components: {
      pageLeft: () => import('./left'),
      pageRight: () => import ('./right')
    }
  }
</script>
