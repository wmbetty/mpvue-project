<template>
    <div class="page" :style="{'min-height': windowHeight+'px'}">
      <div v-if="isAnDrLiuhai" :class="isAnDrLiuhai?'detail-header andr-liuhai-header':'detail-header'" @click="goback">
        <img src="/static/images/back.png" class="back-icon" alt="" />
      </div>
      <div v-else class="detail-header phone-liuhai-header">
        <img src="/static/images/back.png" class="back-icon" alt="" @click="goback" />
      </div>
      <div class="list-group">
        <div class="list-item" v-for="(item, index) in myJoin" :index="index" :key="key">
          <div class="avatar-container">
            <img :src="item.question.member.avatar" class="u-avatar" alt="">
          </div>
          <div class="">
            <div class="list-item-title">
              {{item.question.question}}
            </div>
            <div class="list-item-cate">
              {{item.question.created_time}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import api from '../../../static/api/api'

  export default {
    data () {
      return {
        windowHeight: 0,
        isAnDrLiuhai: false,
        isIphoneLiuhai: false,
        joinTotalPage: 1,
        myJoin: [],
        page: 1,
        token: ''
      }
    },
    methods: {
      goback () {
        wx.navigateBack({delta: 1})
      }
    },
    onLoad (option) {
      let that = this
      let res = wx.getSystemInfoSync()
      that.windowHeight = res.windowHeight
      this.isAnDrLiuhai = this.GLOBAL.isAnDrLiuhai
      this.isIphoneLiuhai = this.GLOBAL.isIphoneLiuhai
    },
    onShow () {
      let that = this
      wx.showLoading({ title: '加载中' })
      api.getToken().then(function (res) {
        if (res.data.status * 1 === 200) {
          let token = res.data.data.access_token
          that.token = token
          let joinApi = api.my_join + token
          api.wxRequest(joinApi, 'GET', {}, (res) => {
            if (res.data.status * 1 === 200) {
              wx.hideLoading()
              let myJoin = res.data.data
              let joinTotalPage = res.header['X-Pagination-Page-Count']
              that.joinTotalPage = joinTotalPage
              that.myJoin = myJoin
            } else {
              wx.hideLoading()
              wx.showToast({ title: '列表数据获取失败', icon: 'none' })
            }
          })
        }
      })
    },
    onReachBottom () {
      let that = this
      let page = that.page * 1 + 1
      let joinTotalPage = that.joinTotalPage * 1
      let joinApi = api.my_join + that.token
      let myJoin = that.myJoin
      if (page <= joinTotalPage) {
        api.wxRequest(joinApi, 'GET', {page: page}, (res) => {
          if (res.data.status * 1 === 200) {
            let myJoins = res.data.data
            that.myJoin = myJoin.concat(myJoins)
            that.page = page
          } else {
            wx.showToast({ title: '列表数据获取失败', icon: 'none' })
          }
        })
      } else {
        wx.showToast({ title: '没有更多数据了', icon: 'none' })
      }
    }
  }
</script>

<style scoped>
.page{
  background:#f5f6f8;position:relative;height:100%;padding-bottom: 60rpx;
}
.detail-header{padding: 50rpx 30rpx 14rpx;position: fixed;left: 0;top:0;width: 100%;background: #f5f6f8;z-index: 99}
.andr-liuhai-header{padding-top: 64rpx;}
.phone-liuhai-header{padding-top: 76rpx;}
.back-icon{display: block;width: 34rpx;height: 34rpx;}
.list-group{background: #fff;margin-top: 120rpx;}
.list-item{border-bottom: 1px solid #eee;padding: 20rpx;color: #666;display: flex;align-items: center;}
.list-item:last-child{border: none;}
.avatar-container{width: 120rpx;height: 120rpx;margin-right: 40rpx;}
.u-avatar{display: block;width: 100%;height: 100%;border-radius: 50%;border: 2rpx solid #eee;background: #eee}
.list-item-title{font-size: 32rpx;margin-bottom: 10rpx;width: 560rpx;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;}
.list-item-cate{font-size: 28rpx;color: #999}
</style>
