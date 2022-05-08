<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 三级联动列表 -->
              <div
                class="item bo"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { throttle } from 'lodash'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标移动到哪一个列表上
      currentIndex: -1,
      // 控制组件显示和隐藏
      show: true
    }
  },
  computed: {
    ...mapState('homeAbout', { categoryList: 'categoryList' })
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // 使用lodash的throttle节流函数，这里不能够使用箭头函数，否则会出现this指向问题
    changeIndex: throttle(function (index) {
      // 鼠标移动到某一个一级分类的元素的索引值
      this.currentIndex = index
    }, 50),
    // 鼠标移出一级分类剋元素的索引值
    leaveShow() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    // 进行路由跳转的方法
    goSearch(e) {
      // 最好的解决方案：编程式路由导航+事件委托+自定义属性 ： 最终方案
      // 存在的问题：事件委托，是把全部的子节点{h3，dt，dl，em}的事件委托给父亲节点
      // 点击a标签的时候，才会进行路由跳转【怎么确定点击的一定是a标签】
      // 存在的另外一个问题：即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签。

      // 第一个问题：把子节点当中a标签，添加上自定义属性data-categoryName，其余的节点是没有的
      let element = e.target
      // 获取到当前触发这个事件的节点【a，dl，dt等】，需要带有data-categoryName这样的节点，这一定是a标签
      // 节点有一个 dataset属性，可以获取到节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset // 解构赋值
      // console.log(element.dataset)
      // 如果身上有categoryname这个属性一定是a 标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 第二个问题：如何得知点击的是一级、二级、三级标签呢
        if (category1id) {
          // 动态给query添加参数
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          // 整理完参数  给location动态添加query参数
          location.query = query
          location.params = this.$route.params
          // 最后路由跳转
          this.$router.push(location)
        }
      }
    },
    // 鼠标进入，显示TypeNav
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    }
  },
  // 组件挂载完毕后：可以向服务器发送请求
  mounted() {
    // 判断是在哪个路由组件中
    if (this.$route.path != '/home') {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过度动画开始状态（进入）
    .sort-enter {
      height: 0;
      // transform: rotate(0deg);
    }
    // 过渡动画结束状态
    .sort-enter-to {
      // transform: rotate(360deg);
      height: 461px;
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
