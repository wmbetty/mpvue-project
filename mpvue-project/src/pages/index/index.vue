<template>
  <div>
    <div v-if="!isIphoneLiuhai" :class="isAnDrLiuhai?'index-header andr-liuhai-header':'index-header'">
      <div class="header-cont">
        <div class="avatar-container">
          <img :src="userInfo.avatar || '/static/images/avatarDefault.png'" alt="" class="user-avatar" @click="gotoMine">
        </div>
        <div class="input-container">搜索感兴趣内容</div>
      </div>
    </div>
    <div v-else class="index-header phone-liuhai-header">
      <div class="header-cont">
        <div class="avatar-container">
          <img :src="userInfo.avatar || '/static/images/avatarDefault.png'" alt="" class="user-avatar" @click="gotoMine">
        </div>
        <div class="input-container">搜索感兴趣内容</div>
      </div>
    </div>
    <div v-if="!isIphoneLiuhai" class="top_menu_bar">
      <div class="top_menu_list">
        <a v-for="(item, index) in menuList" :index="index" :key="key" :class="{cur:index === iscur}" class="top_menu_btn" @click="setCur(index)">{{item.name}}</a>
      </div>
    </div>
    <div v-if="isIphoneLiuhai" class="top_menu_bar phone-liuhai-menu">
      <div class="top_menu_list">
        <a v-for="(item, index) in menuList" :index="index" :key="key" :class="{cur:index === iscur}" class="top_menu_btn" @click="setCur(index)">{{item.name}}</a>
      </div>
    </div>
    <div class="content-container" v-show="iscur===0">
      <div class="content-list" @click="gotoDetail" v-for="(item, index) in dataList" :id="item.id" :index="index" :key="key">
        <div :class="(item.type*1===1 || index%3===0)?'list-detail-100':'list-detail'">
          <h3 class="dotdot line3 image-margin-right">{{item.question}}</h3>
          <div v-if="item.type*1===2 && index%3===0" class="list_image">
            <img :src="item.option1" alt="" class="list-img">
            <img :src="item.option2" alt="" class="list-img">
          </div>
          <div class="item-info">
            <div class="item-bottom-info">
              <span v-if="index < 2" class="top-tag space">置顶</span>
              <span v-if="index >= 2 && index <= 4" class="hot-tag space">热</span>
              <span class="space">{{item.member.nickname || '无名氏'}}</span>
              <span class="space" v-if="item.total_comment*1>0">评论 {{item.total_comment}}</span>
              <span class="space">{{item.created_time}}</span>
            </div>
          </div>
        </div>
        <div class="list-img-holder" v-if="item.type * 1 !== 1 && index%3!==0">
          <img v-if="index/2===0" :src="item.option2" alt="" />
          <img v-else :src="item.option1" alt="" />
        </div>
      </div>
    </div>
    <div class="content-container" v-show="iscur===1">
      <div class="content-list" @click="gotoDetail" v-for="(item, index) in dataList" :id="item.id" :index="index" :key="key" v-if="index>4">
        <div :class="(item.type*1===1 || index%3===0)?'list-detail-100':'list-detail'">
          <h3 class="dotdot line3 image-margin-right">{{item.question}}</h3>
          <div v-if="item.type*1===2 && index%3===0" class="list_image">
            <img :src="item.option1" alt="" class="list-img">
            <img :src="item.option2" alt="" class="list-img">
          </div>
          <div class="item-info">
            <div class="item-bottom-info">
              <span v-if="index < 2" class="top-tag space">置顶</span>
              <span v-if="index >= 2 && index <= 4" class="hot-tag space">热</span>
              <span class="space">{{item.member.nickname || '无名氏'}}</span>
              <span class="space" v-if="item.total_comment*1>0">评论 {{item.total_comment}}</span>
              <span class="space">{{item.created_time}}</span>
            </div>
          </div>
        </div>
        <div class="list-img-holder" v-if="item.type * 1 !== 1 && index%3!==0">
          <img v-if="index/2===0" :src="item.option2" alt="" />
          <img v-else :src="item.option1" alt="" />
        </div>
      </div>
    </div>
    <div class="content-container" v-show="iscur===2">
      <div class="content-list" @click="gotoDetail" v-for="(item, index) in dataList" :id="item.id" :index="index" :key="key" v-if="index>6">
        <div :class="(item.type*1===1 || index%3===0)?'list-detail-100':'list-detail'">
          <h3 class="dotdot line3 image-margin-right">{{item.question}}</h3>
          <div v-if="item.type*1===2 && index%3===0" class="list_image">
            <img :src="item.option1" alt="" class="list-img">
            <img :src="item.option2" alt="" class="list-img">
          </div>
          <div class="item-info">
            <div class="item-bottom-info">
              <span v-if="index < 2" class="top-tag space">置顶</span>
              <span v-if="index >= 2 && index <= 4" class="hot-tag space">热</span>
              <span class="space">{{item.member.nickname || '无名氏'}}</span>
              <span class="space" v-if="item.total_comment*1>0">评论 {{item.total_comment}}</span>
              <span class="space">{{item.created_time}}</span>
            </div>
          </div>
        </div>
        <div class="list-img-holder" v-if="item.type * 1 !== 1 && index%3!==0">
          <img v-if="index/2===0" :src="item.option2" alt="" />
          <img v-else :src="item.option1" alt="" />
        </div>
      </div>
    </div>
    <div class="content-container" v-show="iscur===3">
      <div class="content-list" @click="gotoDetail" v-for="(item, index) in dataList" :id="item.id" :index="index" :key="key" v-if="index>8">
        <div :class="(item.type*1===1 || index%3===0)?'list-detail-100':'list-detail'">
          <h3 class="dotdot line3 image-margin-right">{{item.question}}</h3>
          <div v-if="item.type*1===2 && index%3===0" class="list_image">
            <img :src="item.option1" alt="" class="list-img">
            <img :src="item.option2" alt="" class="list-img">
          </div>
          <div class="item-info">
            <div class="item-bottom-info">
              <span v-if="index < 2" class="top-tag space">置顶</span>
              <span v-if="index >= 2 && index <= 4" class="hot-tag space">热</span>
              <span class="space">{{item.member.nickname || '无名氏'}}</span>
              <span class="space" v-if="item.total_comment*1>0">评论 {{item.total_comment}}</span>
              <span class="space">{{item.created_time}}</span>
            </div>
          </div>
        </div>
        <div class="list-img-holder" v-if="item.type * 1 !== 1 && index%3!==0">
          <img v-if="index/2===0" :src="item.option2" alt="" />
          <img v-else :src="item.option1" alt="" />
        </div>
      </div>
    </div>
    <myDialog @cancelDialog="cancelDialog" @getUserInfo="getUserInfo" :showDialog="showDialog"></myDialog>
  </div>
</template>

<script>
import dialog from '../../components/dialog'
import api from '../../../static/api/api'

export default {
  data () {
    return {
      menuList: [
        {id: 1, name: '推荐', iscur: true},
        {id: 2, name: '热点', iscur: false},
        {id: 3, name: '科技', iscur: false},
        {id: 4, name: '体育', iscur: false}
      ],
      iscur: 0,
      dataList: [],
      token: '',
      page: 1,
      notopPage: 1,
      showDialog: true,
      userInfo: {},
      isAnDrLiuhai: false,
      isIphoneLiuhai: false
    }
  },
  components: {
    myDialog: dialog
  },
  methods: {
    setCur (index) {
      this.iscur = index
    },
    gotoDetail (e) {
      let id = e.currentTarget.id
      wx.navigateTo({
        url: `../details/main?id=${id}`
      })
    },
    gotoMine () {
      wx.navigateTo({
        url: `../mine/main?mid=${this.userInfo.id}`
      })
    },
    cancelDialog () {
      wx.showToast({ title: '授权才能获取更多操作哦', icon: 'none' })
    },
    getUserInfo (e) {
      let that = this
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      if (wx.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
        that.showDialog = false
        wx.login({
          success: function (res) {
            let code = res.code
            wx.getUserInfo({
              success: (res) => {
                let userData = {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code
                }
                api.getToken().then(function (res) {
                  if (res.data.status * 1 === 200) {
                    let token = res.data.data.access_token
                    let userInfoApi = api.userInfo + token
                    api.wxRequest(userInfoApi, 'POST', userData, (res) => {
                      if (res.data.status * 1 === 200) {
                        wx.setStorageSync('userInfo', res.data.data)
                        wx.showToast({ title: '授权成功，可进行操作了', icon: 'none' })
                      } else {
                        wx.showToast({ title: '更新用户信息失败', icon: 'none' })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      } else {
        console.log('请升级微信版本')
      }
    }
  },

  created () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo.id) {
      that.showDialog = false
      that.userInfo = userInfo
    } else {
      that.showDialog = true
    }
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: `../../packageA/pages/test/main`
    //   })
    // }, 2000)
  },
  mounted () {
    let that = this
    api.getToken().then(function (res) {
      if (res.data.status * 1 === 200) {
        let token = res.data.data.access_token
        that.token = token
        let listApi = api.questions + token
        let notopApi = api.noTopQues + token
        let page = that.page
        let notopPage = that.notopPage
        api.wxRequest(listApi, 'GET', {page: page}, (res) => {
          if (res.data.status * 1 === 200) {
            let topdatas = res.data.data || []
            if (topdatas.length === 0) {
              api.wxRequest(notopApi, 'GET', {page: notopPage}, (res) => {
                if (res.data.status * 1 === 200) {
                  let datas = res.data.data || []
                  that.dataList = datas
                  // if (datas.length === 0) {}
                } else {
                  wx.showToast({ title: '网路出错了', icon: 'none' })
                }
              })
            } else {
              if (topdatas.length < 10) {
                api.wxRequest(notopApi, 'GET', {page: notopPage}, (res) => {
                  if (res.data.status * 1 === 200) {
                    let datas = res.data.data || []
                    that.dataList = topdatas.concat(datas)
                    // if (datas.length === 0) {}
                  } else {
                    wx.showToast({ title: '网路出错了', icon: 'none' })
                  }
                })
              } else {
                that.dataList = topdatas
              }
            }
          } else {
            wx.showToast({ title: '网路出错了', icon: 'none' })
          }
        })
      } else {
        wx.showToast({ title: '网路出错了', icon: 'none' })
      }
    })
  },
  onReachBottom () {
    let that = this
    let notopApi = api.noTopQues + that.token
    let notopPage = that.notopPage * 1 + 1
    api.wxRequest(notopApi, 'GET', {page: notopPage}, (res) => {
      if (res.data.status * 1 === 200) {
        let datas = res.data.data || []
        that.dataList = that.dataList.concat(datas)
        that.notopPage = notopPage
        // if (datas.length === 0) {}
      } else {
        wx.showToast({ title: '网路出错了', icon: 'none' })
      }
    })
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo.id) {

    }
  },
  onLoad () {
    let that = this
    // that.GLOBAL.isLiuhai = true
    wx.getSystemInfo({
      success: function (res) {
        let statusBarHeight = res.statusBarHeight
        if (statusBarHeight * 1 > 20 && statusBarHeight * 1 < 30) {
          that.GLOBAL.isAnDrLiuhai = true
          that.isAnDrLiuhai = true
        }
        if (statusBarHeight * 1 > 30) {
          that.GLOBAL.isIphoneLiuhai = true
          that.isIphoneLiuhai = true
        }
      }
    })
  }
}
</script>

<style scoped>
  .top_menu_bar{
    position: fixed;top:128rpx;left: 0;
    width: 100%;height: 84rpx;box-sizing: border-box;
    background: #f4f5f6;
  }
  .phone-liuhai-menu{top: 150rpx;}
  .top_menu_list{width: 100%;height: 100%;display: flex;align-items: center;}
  .top_menu_btn{
    text-decoration: none;font-size: 28rpx;color: #505050;width: 25%;text-align: center;
  }
  .top_menu_btn.cur{color: #f85959;}
  .content-container{background: #fff;padding: 0 30rpx;margin-top: 212rpx;}
  .content-list{padding: 32rpx 0;color: #131313;border-bottom: 1px solid #eee;display: flex;align-items: center;}
  .list-detail{width: 67%;}
  .list-detail-100{width: 100%;}
  .list-img-holder{width: 33%;height: 1.96rem;overflow: hidden;}
  .list-img-holder img{display: block;width: 100%;transition: opacity 300ms ease;border: none;height: 100%;}
  .dotdot{overflow: hidden;text-overflow: ellipsis;color: #222;font-weight: normal;}
  .image-margin-right{margin-right: 24rpx;}
  .item-info{color: #999;overflow: hidden;margin-top: 12rpx;font-size: 22rpx;}
  .item-bottom-info{display: flex;align-items: center;}
  .top-tag{width: 48rpx;line-height: 24rpx;font-size: 18rpx;color: #f85959;
    border: 1px solid rgba(248, 89, 89, .5);text-align: center;border-radius: 4rpx;}
  .hot-tag{width: 24rpx;line-height: 24rpx;font-size: 18rpx;color: #f85959;
    border: 1px solid rgba(248, 89, 89, .5);text-align: center;border-radius: 4rpx;}
  .space{margin-right: 10rpx;}
  .list_image{margin-top: 12rpx;display: flex;}
  .list-img{width: 33.3%;height: 1.96rem;margin-right: 8rpx;transition: opacity 300ms ease;}
  .index-header{
    display: flex;overflow: hidden;background: #d43d3d;height: 128rpx;align-items: center;
    position: fixed;top: 0;left: 0;right: 0;z-index: 999;
  }
  .andr-liuhai-header{padding-top: 14rpx;}
  .phone-liuhai-header{padding-top: 28rpx;}
  .header-cont{display: flex;align-items: center;width: 100%;padding-top: 24rpx;}
  .avatar-container{width: 50rpx;height: 50rpx;margin-left: 24rpx;margin-right: 24rpx;}
  .user-avatar{display: block;width: 100%;height: 100%;border-radius: 50%;border: 1px solid #eee;}
  .input-container{
    width:420rpx;height:54rpx;border-radius:8rpx;background:#fff;
    color: #999;font-size: 26rpx;padding-left: 12rpx;line-height: 54rpx;text-align: center;
  }
</style>
