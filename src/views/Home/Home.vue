<template>
  <div>
    <!-- 直接使用全局组件，不需要导入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Footer v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from './ListContainer/index'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Footer from './Floor/index.vue'
import Brand from './Brand/index.vue'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Footer,
    Brand
  },
  computed: {
    ...mapState('homeAbout', { floorList: 'floorList' })
  },
  mounted() {
    // 请求数据 获取floor 子组件的数据
    this.$store.dispatch('homeAbout/getFloorList')
  }
}
</script>

<style></style>
