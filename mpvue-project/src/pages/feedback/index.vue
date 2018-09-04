<template>
  <div>
    <div class="header-back">
      <img src="/static/images/back.png" class="back-icon" alt="" @click="goback" />
      <span class="feed-title">意见反馈</span>
    </div>
    <div class="advice-container">
      <textarea placeholder="有任何产品建议或反馈，请给选小象留言哦～" class="advice-cont" maxlength="200" v-model="advice"></textarea>
    </div>
    <div>
      <input class="mobile-put" type="number" v-model="phone" placeholder="留下手机号码，方便小象联系你哟～" maxlength="11">
    </div>
    <div class="send-btn" @click="sendAdvice">发送</div>
  </div>
</template>

<script>
  import api from '../../../static/api/api'

  export default {
    data () {
      return {
        advice: '',
        phone: '',
        token: ''
      }
    },
    onLoad () {
      let that = this
      api.getToken().then(function (response) {
        if (response.data.status * 1 === 200) {
          let token = response.data.data.access_token
          that.token = token
        } else {
          wx.showToast({ title: '网络出错了，请稍后再试哦~', icon: 'none' })
        }
      })
    },
    methods: {
      goback () {
        wx.navigateBack({delta: 1})
      },
      sendAdvice () {
        let that = this
        let feedApi = api.feedback + that.token
        if (that.advice === '') {
          wx.showToast({ title: '建议内容不能为空哦', icon: 'none' })
          return false
        }
        let feedData = {
          content: that.advice,
          mobile: that.phone
        }
        api.wxRequest(feedApi, 'POST', feedData, (res) => {
          wx.showLoading({
            title: '提交中',
            mask: true
          })
          if (res.data.status * 1 === 201 && res.data.data.id) {
            wx.hideLoading()
            wx.showToast({ title: '感谢你的建议，小象会及时跟进哟~', icon: 'none' })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .header-back{padding: 50rpx 30rpx 0;text-align: center;line-height: 0}
  .back-icon{display: block;width: 38rpx;height: 38rpx;}
  .feed-title{font-size: 32rpx;color: #343434}
  .advice-cont{font-size: 28rpx;}
  .advice-container{
    margin:50rpx 20rpx 20rpx 20rpx;border:1px solid #ccc;padding:12rpx;
  }
  .mobile-put{color:#343434;font-size:28rpx;padding:12rpx;margin: 20rpx;border:1px solid #ccc;}
  .send-btn{margin: 20rpx;color: #fff;text-align: center;font-size: 32rpx;background: #d43d3d;padding: 20rpx 0;border-radius: 10rpx;}
</style>
