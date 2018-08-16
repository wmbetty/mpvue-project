<template>
  <div>
    <div class="index-header">
      <div class="header-cont">
        <div class="avatar-container">
          <img src="/static/images/avatarDefault.png" alt="" class="user-avatar" @click="gotoMine">
        </div>
        <div class="input-container">搜索感兴趣内容</div>
      </div>
    </div>
    <div class="top_menu_bar">
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
  </div>
</template>

<script>
//
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
      notopPage: 1
    }
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
        url: '../mine/main'
      })
    }
  },

  created () {
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
  }
}
</script>

<style scoped>
  .top_menu_bar{
    position: fixed;top:128rpx;left: 0;
    width: 100%;height: 84rpx;box-sizing: border-box;
    background: #f4f5f6;
  }
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
  .header-cont{display: flex;align-items: center;width: 100%;padding-top: 24rpx;}
  .avatar-container{width: 50rpx;height: 50rpx;margin-left: 24rpx;margin-right: 24rpx;}
  .user-avatar{display: block;width: 100%;height: 100%;border-radius: 50%;border: 1px solid #eee;}
  .input-container{
    width:420rpx;height:54rpx;border-radius:8rpx;background:#fff;
    color: #999;font-size: 26rpx;padding-left: 12rpx;line-height: 54rpx;text-align: center;
  }
</style>
