<template>
    <div class="page" :style="{'min-height': windowHeight+'px'}">
      <div class="mine-header">
        <div v-if="!isIphoneLiuhai" :class="isAnDrLiuhai?'header-back andr-hearder-back':'header-back'">
          <img src="/static/images/white_back.png" class="back-icon" alt="" @click="goback" />
        </div>
        <div v-else class="header-back phone-hearder-back">
          <img src="/static/images/white_back.png" class="back-icon" alt="" @click="goback" />
        </div>
        <div class="mine-info">
          <div class="my-info-details">
            <div class="my-avatar-box">
              <img :src="userInfo.avatar" class="my-avatar" alt="">
            </div>
            <div class="my-nickname">{{userInfo.nickname}}</div>
          </div>
          <div class="my-credit-box">
            <img src="/static/images/credit_icon.png" class="credit-icon" alt="">
            <div class="my-credit">{{userInfo.points}}</div>
          </div>
        </div>
        <div class="my-activities">
          <div class="activities-item border-ccc" @click="goSendList">动态：{{myPublish.length || 0}}</div>
          <div class="activities-item" @click="goJoinList">参与：{{myJoin.length || 0}}</div>
        </div>
      </div>
      <div class="list-group">
        <!--<div class="list-item" hover-class="list-hover">-->
          <!--<div class="list-text">消息通知</div>-->
          <!--<div class="list-arrow"></div>-->
        <!--</div>-->
        <div class="list-item" hover-class="list-hover" @click="gotoFeed">
          <div class="list-text">用户反馈</div>
          <div class="list-arrow"></div>
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
        mid: '',
        userInfo: {},
        myPublish: [],
        myJoin: [],
        myTotalPage: 1,
        joinTotalPage: 1,
        joinPage: 1,
        publishPage: 1,
        isAnDrLiuhai: false,
        isIphoneLiuhai: false
      }
    },
    methods: {
      goback () {
        wx.navigateBack({delta: 1})
      },
      gotoFeed () {
        wx.navigateTo({
          url: `../feedback/main`
        })
      },
      goJoinList () {
        wx.navigateTo({
          url: `../joinList/main`
        })
      },
      goSendList () {
        wx.navigateTo({
          url: `../sendList/main`
        })
      }
    },
    onLoad (option) {
      let that = this
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#F5F6F8'
      })
      let res = wx.getSystemInfoSync()
      that.windowHeight = res.windowHeight
      that.mid = option.mid
      this.isAnDrLiuhai = this.GLOBAL.isAnDrLiuhai
      this.isIphoneLiuhai = this.GLOBAL.isIphoneLiuhai
    },
    onShow () {
      let that = this
      setTimeout(() => {
        api.getToken().then(function (res) {
          if (res.data.status * 1 === 200) {
            let token = res.data.data.access_token
            let othersInfoApi = api.othersInfo + token
            api.wxRequest(othersInfoApi, 'GET', {mid: that.mid}, (res) => {
              if (res.data.status * 1 === 200) {
                that.userInfo = res.data.data
              } else {
                wx.showToast({ title: '用户信息获取失败', icon: 'none' })
              }
            })
            let questionApi = api.my_question + token
            let joinApi = api.my_join + token
            wx.showLoading({ title: '加载中' })
            api.wxRequest(questionApi, 'GET', {page: that.publishPage}, (res) => {
              if (res.data.status * 1 === 200) {
                wx.hideLoading()
                let myPublish = res.data.data
                let myTotalPage = res.header['X-Pagination-Page-Count']
                that.myPublish = myPublish
                that.myTotalPage = myTotalPage
              } else {
                wx.hideLoading()
                api.wxShowToast('网络出错了，请稍后再试哦~', 'none', 2000)
              }
            })
            api.wxRequest(joinApi, 'GET', {page: that.joinPage}, (res) => {
              if (res.data.status * 1 === 200) {
                let myJoin = res.data.data
                let joinTotalPage = res.header['X-Pagination-Page-Count']
                that.myJoin = myJoin
                that.joinTotalPage = joinTotalPage
              }
            })
          }
        })
      }, 200)
    }
  }
</script>

<style scoped>
  .page{
    background:#f5f6f8;position:relative;height:100%
  }
  .mine-header{background: rgba(0,0,0,.7);height: 450rpx;color: #fff;}
  .header-back{padding: 50rpx 30rpx 0;}
  .andr-hearder-back{padding-top: 64rpx;}
  .phone-hearder-back{padding-top: 76rpx;}
  .back-icon{display: block;width: 38rpx;height: 38rpx;}
  .mine-info{display: flex;align-items: center;justify-content: space-between;
  padding-left: 40rpx;padding-top: 36rpx;}
  .my-info-details{display: flex;align-items: center;}
  .my-avatar-box{
    width: 120rpx;height: 120rpx;margin-right: 40rpx;
  }
  .my-avatar{display: block;width: 100%;height: 100%;border-radius: 50%;border: 1px solid #eee;}
  .my-nickname{font-size: 30rpx;max-width: 300rpx;overflow: hidden;text-overflow: ellipsis;}
  .my-credit-box{width: 200rpx;height: 40rpx;background: #333;border-radius: 30rpx 0 0 30rpx;
    padding: 14rpx 0;display: flex;align-items: center;justify-content: space-between;}
  .credit-icon{display: block;width: 40rpx;height: 40rpx;margin-left: 20rpx;}
  .my-credit{margin-right: 20rpx;}
  .my-activities{display: flex;align-items: center;justify-content: space-between;margin-top: 120rpx;}
  .activities-item{padding: 8rpx 0;width: 49%;text-align: center;font-size: 28rpx;}
  .border-ccc{border-right: 1px solid #999;text-align: center;}
  .list-item{background: #fff;padding: 30rpx 40rpx;margin-bottom: 20rpx;display: flex;justify-content: space-between;align-items: center}
  .list-group .list-item:last-child{margin-bottom: 0}
  .list-text{font-size: 32rpx;}
  .list-arrow{width: 24rpx;height: 26rpx;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAARVBMVEUAAADi4uLIyM3Jyc7OztHIyM3IyM3IyM3Jyc7IyM3IyM3IyM3IyM3IyM3IyM3Q0NXIyM3Jyc3Jyc7IyM7IyM7MzM/Hx8zOIuGlAAAAFnRSTlMABfZLFqeglz/AtIDXzJENindqYFY0ge+S7QAAAJRJREFUOMut1EkOgzAQRFHj2YANZPD9jxorSkvZJP2R+Ou3qkWZr1yYDMj1TqCzncA82Cgq7DkYgdPcz8KkwAChiRQmgU2BO4WLwF2BB4U3gYsC7xQ+KHT2LDwUmCls/VNm4zTGEliQs8hmDpBNfycWNl/CLGJZWLmWbehhKmXoDKpX7qW82eqN0laFKflVmAbLb/YCOVAZsca1cp4AAAAASUVORK5CYII=") no-repeat;
  background-size: 100% 100%}
  .list-hover{background:#ededed}
</style>
