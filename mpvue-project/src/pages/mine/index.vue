<template>
    <div class="page" :style="{'min-height': windowHeight+'px'}">
      <div class="mine-header">
        <div class="header-back">
          <img src="/static/images/white_back.png" class="back-icon" alt="" @click="goback" />
        </div>
        <div class="mine-info">
          <div class="my-info-details">
            <div class="my-avatar-box">
              <img src="" class="my-avatar" alt="">
            </div>
            <div class="my-nickname">昵称</div>
          </div>
          <div class="my-credit-box">
            <img src="" class="credit-icon" alt="">
            <div class="my-credit">456</div>
          </div>
        </div>
        <div class="my-activities">
          <div class="activities-item border-ccc">动态：0</div>
          <div class="activities-item">参与：0</div>
        </div>
      </div>
      <div class="list-group">
        <div class="list-item">
          <div class="list-text">消息通知</div>
          <div class="list-arrow"></div>
        </div>
        <div class="list-item">
          <div class="list-text">用户反馈</div>
          <div class="list-arrow"></div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        windowHeight: ''
      }
    },
    methods: {
      goback () {
        wx.navigateBack({delta: 1})
      }
    },
    onLoad () {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#F5F6F8'
      })
      let res = wx.getSystemInfoSync()
      this.windowHeight = res.windowHeight
    }
  }
</script>

<style scoped>
  .page{
    background:#f5f6f8;position:relative;height:100%
  }
  .mine-header{background: rgba(0,0,0,.7);height: 450rpx;color: #fff;}
  .header-back{padding: 50rpx 30rpx 0;}
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
  .credit-icon{display: block;width: 40rpx;height: 40rpx;background: #fff;margin-left: 20rpx;}
  .my-credit{margin-right: 20rpx;}
  .my-activities{display: flex;align-items: center;justify-content: space-between;margin-top: 120rpx;}
  .activities-item{padding: 8rpx 0;width: 49%;text-align: center;font-size: 28rpx;}
  .border-ccc{border-right: 1px solid #999;text-align: center;}
  .list-item{background: #fff;padding: 30rpx 40rpx;margin-bottom: 20rpx;display: flex;justify-content: space-between;align-items: center}
  .list-group .list-item:last-child{margin-bottom: 0}
  .list-text{font-size: 32rpx;}
  .list-arrow{width: 24rpx;height: 26rpx;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAARVBMVEUAAADi4uLIyM3Jyc7OztHIyM3IyM3IyM3Jyc7IyM3IyM3IyM3IyM3IyM3IyM3Q0NXIyM3Jyc3Jyc7IyM7IyM7MzM/Hx8zOIuGlAAAAFnRSTlMABfZLFqeglz/AtIDXzJENindqYFY0ge+S7QAAAJRJREFUOMut1EkOgzAQRFHj2YANZPD9jxorSkvZJP2R+Ou3qkWZr1yYDMj1TqCzncA82Cgq7DkYgdPcz8KkwAChiRQmgU2BO4WLwF2BB4U3gYsC7xQ+KHT2LDwUmCls/VNm4zTGEliQs8hmDpBNfycWNl/CLGJZWLmWbehhKmXoDKpX7qW82eqN0laFKflVmAbLb/YCOVAZsca1cp4AAAAASUVORK5CYII=") no-repeat;
  background-size: 100% 100%}
</style>
