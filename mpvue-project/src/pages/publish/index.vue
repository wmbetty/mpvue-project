<template>
  <div class="page" :style="{'min-height': windowHeight+'px'}">
    <div v-if="!isIphoneLiuhai" :class="isAnDrLiuhai?'detail-header andr-liuhai-header':'detail-header'" @click="goback">
      <!-- <img src="/static/images/white_back.png" class="back-icon" alt="" /> -->
    </div>
    <div v-else class="detail-header phone-liuhai-header">
      <!-- <img src="/static/images/white_back.png" class="back-icon" alt="" @click="goback" /> -->
    </div>
    <div v-if="!isIphoneLiuhai" :class="isAnDrLiuhai?'p1-container andr-p1-container':'p1-container'">
      <div class="tab-box">
        <div :class="type===1?'tab-item tab-active':'tab-item'" data-type="1" @click="changeType">
          <img :src="type===1?'/static/images/text_icon.png':'/static/images/text_act_icon.png'" alt="" class="tab-item-img" />
        </div>
        <div :class="type===2?'tab-item tab-active':'tab-item'" data-type="2" @click="changeType">
          <img :src="type===2?'/static/images/img_icon.png':'/static/images/img_act_icon.png'" alt="" class="tab-item-img" />
        </div>
      </div>
      <div class="text-area">
        <textarea v-model="title" placeholder-style="color: #888;" class="title-text" placeholder="点击输入标题" @change="textChange"></textarea>
      </div>
    </div>
    <div v-else class="p1-container iphone-p1-container">
      <div class="tab-box">
        <div :class="type===1?'tab-item tab-active':'tab-item'" data-type="1" @click="changeType">
          <img :src="type===1?'/static/images/text_icon.png':'/static/images/text_act_icon.png'" alt="" class="tab-item-img" />
        </div>
        <div :class="type===2?'tab-item tab-active':'tab-item'" data-type="2" @click="changeType">
          <img :src="type===2?'/static/images/img_icon.png':'/static/images/img_act_icon.png'" alt="" class="tab-item-img" />
        </div>
      </div>
    </div>
    <div class="options-container" v-if="type===1">
      <div class="options-item">
        <textarea v-model="option1" class="option-text" placeholder="点击输入左选项" placeholder-style="color: #888;" @change="textChange"></textarea>
      </div>
      <div class="options-item">
        <textarea v-model="option2" class="option-text" placeholder="点击输入左选项" placeholder-style="color: #888;" @change="textChange"></textarea>
      </div>
    </div>
    <div class="options-container" v-if="type===2">
      <div class="options-item had-right-border">
        <img src="/static/images/zhanwei.png" alt="" class="option-img-default" />
        <!-- <img src="" alt="" class="option-img" /> -->
      </div>
      <div class="options-item">
        <img src="/static/images/zhanwei.png" alt="" class="option-img-default" />
        <!-- <img src="" alt="" class="option-img" /> -->
      </div>
    </div>
    <button :class="btnActive?'submit-btn submit-btn-active':'submit-btn'" :disabled="btnDis">发布</button>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        windowHeight: 0,
        isAnDrLiuhai: false,
        isIphoneLiuhai: false,
        type: 1,
        btnDis: true,
        btnActive: false,
        title: '',
        option1: '',
        option2: '',
        option1_img: '',
        option2_img: ''
      }
    },
    onLoad () {
      let res = wx.getSystemInfoSync()
      this.windowHeight = res.windowHeight
      this.isAnDrLiuhai = this.GLOBAL.isAnDrLiuhai
      this.isIphoneLiuhai = this.GLOBAL.isIphoneLiuhai
    },
    methods: {
      changeType (e) {
        let that = this
        let type = e.currentTarget.dataset.type * 1
        if (type === 1) {
          that.type = 1
          if (that.title !== '' && that.option1 !== '' && that.option2 !== '') {
            that.btnActive = true
            that.btnDis = false
          } else {
            that.btnActive = false
            that.btnDis = true
          }
        } else {
          that.type = 2
          if (that.title !== '' && that.option1_img !== '' && that.option2_img !== '') {
            that.btnActive = true
            that.btnDis = false
          } else {
            that.btnActive = false
            that.btnDis = true
          }
        }
      },
      textChange (e) {
        let that = this
        if (that.title !== '' && that.option1 !== '' && that.option2 !== '' && that.type === 1) {
          that.btnActive = true
          that.btnDis = false
        } else {
          that.btnActive = false
          that.btnDis = true
        }
      }
    }
  }
</script>

<style scoped>
.page {
  background:#f5f6f8;position:relative;height:100%;overflow: hidden;
}
.detail-header{padding: 50rpx 30rpx 14rpx;position: fixed;left: 0;top:0;width: 100%;background: #E64340;z-index: 99;height: 34rpx;}
.andr-liuhai-header{padding-top: 64rpx;}
.phone-liuhai-header{padding-top: 76rpx;}
.back-icon{display: block;width: 34rpx;height: 34rpx;}
.p1-container{
  width: 100%;height: 406rpx; margin-top: 98rpx;overflow: hidden;background: #fff;
  /* border-bottom: 1px solid #E1E1E1; */
}
.andr-p1-container{margin-top: 110rpx;}
.iphone-p1-container{margin-top: 124rpx;}
.tab-box{
  width: 200rpx;height: 64rpx;border: 1px solid #E74C49;background: #fff;border-radius: 4rpx;margin: 40rpx auto 32rpx;
  display: flex;justify-content: space-between;
}
.tab-item{height: 100%;width: 50%;}
.tab-active{background: #E64340;}
.tab-item-img{
  display: block;width: 40rpx;height: 40rpx;margin: 14rpx auto;
}
.text-area{width: 690rpx;height: 220rpx;margin: 0 auto;}
.title-text{display: block;width: 670rpx;height: 100%;border: 1px dashed #ddd;padding: 10rpx;font-size: 32rpx;color: #333}
.options-container{width: 100%;height: 510rpx;background: #fff;display: flex;justify-content: space-between;}
.options-item{
  width: 50%;height: 100%;
}
.option-text{width: 290rpx;height: 350rpx;margin: 40rpx auto;border: 1px dashed #ddd;padding: 10rpx;font-size: 32rpx;color: #333}
.option-img{
  display: block;
  width: 310rpx;height: 370rpx;margin: 40rpx auto;
}
.option-img-default{
  display: block;
  width: 250rpx;height: 200rpx;margin: 134rpx auto;
}
.had-right-border{border-right: 1px solid #eee;}
.submit-btn{font-size: 38rpx;display: block;width: 500rpx;margin-top: 50rpx;background: #E1E1E1;color:#fff;line-height: 2}
.submit-btn::after{border: none;}
button[disabled]{font-size: 38rpx;display: block;width: 500rpx;margin-top: 50rpx;background: #E1E1E1;color:#fff;line-height: 2}
.submit-btn-active{background: #E64340;}
</style>
