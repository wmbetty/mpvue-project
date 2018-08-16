<template>
    <div class="page" :style="{'min-height': windowHeight+'px'}">
      <div class="mine-header">
        <div class="header-back">
          <img src="/static/images/white_back.png" class="back-icon" alt="" @click="goback" />
        </div>
      </div>
      <div></div>
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
    }
  }
</script>

<style scoped>
  .page{
    background:#f5f6f8;position:relative;height:100%
  }
  .mine-header{background: rgba(0,0,0,.5);height: 450rpx;}
  .header-back{padding: 50rpx 30rpx 0;}
  .back-icon{display: block;width: 38rpx;height: 38rpx;}

</style>
