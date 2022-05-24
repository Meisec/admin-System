<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('jian', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('jia', 1, cart)"
              >+
            </a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @click="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link @click="goTrade" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  computed: {
    ...mapState('tradeAbout', { address: 'address', orderInfo: 'orderInfo' }),
    ...mapGetters('shopcartAbout', ['cartList']),
    // 最终得到的购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算购买产品的总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum
      })
      return sum
    },
    // 判断底部的勾选框是否勾选 （当上面的勾选框全部勾选时）
    isAllChecked() {
      // 利用every遍历，只要里面的元素isChecked 属性都为1 返回的为 真
      // 只要里面的元素有一个为0 返回的就是 假
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1
      })
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取个人购物车的数据
    getData() {
      this.$store.dispatch('shopcartAbout/getShopCart')
    },
    // 修改产品的函数 【函数节流】
    handler: throttle(async function (type, disNum, cart) {
      // type:为了区分这三个元素，区别用户点击的是哪一个元素
      // disNum : 变化量， input 最终的个数（不是变化量）
      // cart.点击的餐品的id
      //  向服务器发送请求
      switch (type) {
        // 点击的加号
        case 'jia':
          // 带给服务器的变化的量
          disNum = 1
          break
        case 'jian':
          // 判断产品的个数是否大于1，大于1 才可以传递给服务器 -1
          if (cart.skuNum > 1) {
            disNum = -1
          } else {
            // 服务器小于等于1 给服务器传递的就是0 不增不减
            disNum = 0
          }
          // 三元运算符写法
          // disNum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // 如果用户输入的是非法的，比如汉字 或者 负数 传递给服务器的应该是0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }
      //  派发actions
      try {
        await this.$store.dispatch('detailAbout/addShopCart', {
          skuId: cart.skuId,
          skuNum: disNum
        })
        // 再一次获取服务器最新的数据进行展示
        this.getData()
      } catch (error) {}
    }, 1000),
    async deleteCartById(cart) {
      try {
        // 如果删除成功，再次发起请求，获取新的数据进行展示
        await this.$store.dispatch('shopcartAbout/deleteCartList', cart.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改某一个产品的状态
    async updateChecked(cart, event) {
      // 带给服务器的参数isChecked应该为0|1 不应该是布尔值
      try {
        // 如果数据成功，给服务器发送请求（购物车）
        let checked = event.target.checked ? '1' : '0'
        // console.log(event.target.checked)
        await this.$store.dispatch('shopcartAbout/getUpdateCheckedById', {
          skuId: cart.skuId,
          isChecked: checked
        })
      } catch (error) {
        // 如果失败 就 提示
        alert(error.message)
      }
    },
    // 删除全部选中的产品
    async deleteAllCheckedCart() {
      try {
        // 派发actions
        await this.$store.dispatch('shopcartAbout/deleteAllCart')
        // 如果成功了，再次发送请求
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    },
    // 全选按钮的操作
    async updateAllCartChecked(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch(
          'shopcartAbout/updateAllCartIsChecked',
          isChecked
        )
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 点击去结算页面
    goTrade() {
      this.$router.push('/trade')
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
