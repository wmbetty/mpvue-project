<template>
  <div class="user-dialog-mask" v-if="showDialog">
    <div class="user-dialog-content">
      <div class="user-dialog-title">{{authInfo}}</div>
      <div class="user-dialog-foot">
        <div class="user-dialog-btn" @click="cancelDialog">取消</div>
        <button class="user-dialog-btn user-dialog-confirm" open-type="getUserInfo" @click="getUserInfo">获取权限</button>
        <!--<button class="user-dialog-btn user-dialog-confirm" open-type="{{openType}}" @click="confirmDialog">查看</button>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showDialog: {
        type: Boolean,
        default: false
      },
      authInfo: {
        type: String,
        default: '需要微信授权登录才能更多操作哦'
      },
      openType: {
        type: String,
        default: 'getUserInfo'
      }
    },
    methods: {
      cancelDialog () {
        this.$emit('cancelDialog')
      },
      getUserInfo () {
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        this.$emit('getUserInfo')
      }
    }
  }
</script>

<style scoped>
  .user-dialog-mask{position:fixed;left:0;top:0;z-index:9999;background:rgba(0,0,0,0.5);width:100%;height:100%;display:flex;justify-content:center;align-items:center}
  .user-dialog-content{width:680rpx;background:#fff;border-radius:10rpx}
  .user-dialog-title{font-size:32rpx;color:#343434;padding:68rpx 0;text-align:center}
  .user-dialog-foot{display:flex;justify-content:space-between;border-top:1px solid #f1f1f1}
  .user-dialog-btn{width:49%;color:#888;border:1px solid #fff;margin:0;padding:42rpx 0 32rpx;background:#fff;line-height:1;text-align:center;border-radius:10rpx}
  .user-dialog-btn::after{border:0}
  .user-dialog-confirm{color:#0d89ff;border-left:1px solid #f1f1f1}
</style>
