<template>
  <div id="app">
    <Header />
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home，Search是显示的，在登录，注册隐藏 , 使用路由元信息-->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库里当中
    // 放在App组件中，因为App是根组件只加载一次，生命周期也是只走一次，所以请求放在这里，
    // 避免了重复加载组件，重复进行网络请求
    this.$store.dispatch('homeAbout/categoryList')
  }
}
</script>

<style></style>
