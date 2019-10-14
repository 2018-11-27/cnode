<template>
  <div>
    <page-left/>
    <page-right/>
  </div>
</template>

<script>
  let watchRoute = {
    watch: {
      // 监控同级路由下复用附件，进行数据更新
      $route () {
        this.getData()
      }, // deep: true 对象内部的属性监听，也叫深度监听
    }
  }

  export default {
    name: 'index',
    components: {
      pageLeft: () => import('./left'),
      pageRight: () => import ('./right')
    }
  }

  export {watchRoute}
</script>
