<template>
  <div class="page" :style="{'min-height': windowHeight+'px'}">
    <div v-if="isAnDrLiuhai" :class="isAnDrLiuhai?'detail-header andr-liuhai-header':'detail-header'" @click="goback">
      <img src="/static/images/back.png" class="back-icon" alt="" />
    </div>
    <div v-else class="detail-header phone-liuhai-header">
      <img src="/static/images/back.png" class="back-icon" alt="" @click="goback" />
    </div>
    <div class="page-head">详情</div>
    <div class="main-head white-bg">
      <div class="left-item">
        <div class="avatar-box" :mid="details.mid" @click="gotoOthers">
          <img :src="details.member && details.member.avatar?details.member.avatar:'/static/images/avatarDefault.png'" class="m-avatar" />
        </div>
        <div class="user-infos">
          <div class="infos-head" :mid="details.mid" @click="gotoOthers">{{details.member && details.member.nickname || ''}}</div>
          <div v-if="details.member && details.member.gender" :class="details.member && details.member.gender*1===1?'gender-box gender-boy':'gender-box gender-girl'"></div>
        </div>
      </div>
      <div class="right-item">
        <button class="r-share-btn" open-type="share"></button>
        <!--<img v-if="isMy" src="../../images/d_more.png" class="ellipse-icon" @click="gotoDelete" />-->
      </div>
    </div>
    <div class="ques-title white-bg">{{details.question}}</div>
    <div class="white-bg per-outer">
      <div class="per-box">
        <div class="green-font"></div>
        <div class="hot-box">
          <span class="hot-icon"></span>
          <span>{{details.hots || 0}}</span>
        </div>
        <div class="purple-font"></div>
      </div>
    </div>
    <div class="white-bg">
      <div class="options-group" v-if="details.type*1===1">
        <div class="ques-option border-eee option-text" data-option="1" @click="govote">
          <span>{{details.option1}}</span>
        </div>
        <div class="ques-option border-eee option-text" data-option="2" @click="govote">
          <span>{{details.option2}}</span>
        </div>
      </div>
      <div class="options-group" v-else>
        <div class="ques-option">
          <img :src="details.option1" class="option-img" alt="" data-option="1" @click="govote">
        </div>
        <div class="ques-option">
          <img :src="details.option2" class="option-img" alt="" data-option="2" @click="govote">
        </div>
      </div>
      <div class="ques-fxi">
        数据显示：<span><span class="red-percent">{{details.choose1_per}}%</span>支持左边，
        <span class="red-percent">{{details.choose2_per}}%</span>支持右边，你支持哪边呢，点击左边或右边，为你的态度投一票吧^_^</span>
      </div>
    </div>
    <div class="white-bg comment-area" v-if="commentList.length">
      <div class="comment-title">精彩评论</div>
      <div class="comment-list-group">
        <div class="comment-list-item" v-for="(item, index) in commentList" :key="key" :index="index">
          <div class="list-user">
            <img src="" alt="" :mid="item.member.id" @click="gotoOthers" class="comm-user-avatar" :src="item.member.avatar || '/static/images/avatarDefault.png'" />
            <div class="comm-user-name" :mid="item.member.id" @click="gotoOthers">{{item.member.nickname || '无名氏'}}</div>
            <img alt="" v-if="details.member.id===item.member.id" class="comment-owner" src="/static/images/comm_owner.png" />
          </div>
          <div class="list-first-comment">
            <div>
              <!--<text selectable="{{true}}">{{item.content}}</text>-->
              <span>{{item.content}}</span>
            </div>
          </div>
          <div v-if="item.ate" class="list-other-comment">
            <div class="other-comm-item">
              <!--<text style="color: #888;" decode="{{true}}">@{{item.ate.member.nickname}} &nbsp;</text>-->
              <!--<text selectable="{{true}}">{{item.ate.content}}</text>-->
              <span style="color: #888;">@{{item.ate.member.nickname}}&nbsp;&nbsp;</span>
              <span>{{item.ate.content}}</span>
            </div>
            <!--<view class="other-comm-item">啊啊啊啊，两个都好帅～</view>-->
          </div>
          <div class="list-comment-info">
            <div class="comment-time">{{item.created_time}}</div>
            <div class="comment-operate">
              <div class="comment-icon-area">
                <img src="/static/images/comment1.png" class="comment-icon" alt="" :pid="item.id" :atename="item.member.nickname || '无名氏'" :index="index" data-type="reply" @click="gotoReply" />
              </div>
              <div class="comm-good-area" :cid="item.id" :index="index" @click="gotoLike">
                <img :class="item.isLike?'good-icon good-icon-active':'good-icon'" :src="(item.isLike || item.is_praise*1===1)?'/static/images/good2.png':'/static/images/good1.png'" alt="" />
                <span :class="(item.isLike || item.is_praise*1===1)?'red-font':''">{{item.total_praise}}</span>
              </div>
              <!--<image wx:if="{{item.isLike}}" class="comm-like-icon" src="../../images/good2.png"></image>-->
            </div>
          </div>
        </div>
      </div>
      <!--<div class="nomore-text" v-if="nomoreList">— 选象 让选择简单点 —</div>-->
    </div>
    <div class="comment-fixed-area">
      <view class="fade-input" data-type="comment" @click="gotoReply">靠谱青年，马上发言</view>
      <view class="comment-total-view" data-type="comment" @click="gotoReply">
        <image class="total-comm-icon" src="/static/images/comment2.png"></image>
        <view>{{details.total_comment || 0}}</view>
      </view>
      <view class="gohome-view" @click="goHome">
        <image class="comm-gohome-icon" src="/static/images/gohome1.png"></image>
        <view>主页</view>
      </view>
    </div>
    <!--输入评论弹窗-->
    <div class="comment-mask" v-show="showComment">
      <div class="comment-write-area">
        <!--<img src="" alt="" class="close-icon" />-->
        <span class="close-icon" @click="closeComment">&times;</span>
        <textarea class="comment-text-area" placeholder="说点什么吧^_^" placeholder-style="font-size: 28rpx;color: #999;" v-model="commentText"></textarea>
        <div class="btn-container">
          <div class="comment-btn" @click="publishComment">发表</div>
        </div>
      </div>
    </div>
    <!-- 点赞效果-->
    <div v-if="showThumb" class="voted-thumb-box">
      <img src="/static/images/thumbs_up.png" class="thumb_up" />
    </div>
  </div>
</template>

<script>
//
import api from '../../../static/api/api'

export default {
  data () {
    return {
      qid: '',
      details: {},
      commentList: [],
      token: '',
      windowHeight: '',
      showComment: false,
      commentText: '',
      commentType: '',
      page: 1,
      commentPage: 0,
      showThumb: false,
      isAnDrLiuhai: false,
      isIphoneLiuhai: false
    }
  },

  methods: {
    gotoOthers () {},
    gotoShare () {},
    goback () {
      wx.navigateBack({delta: 1})
    },
    gotoReply (e) {
      let that = this
      let type = e.currentTarget.dataset.type
      if (type === 'comment') {
        // 评论
        that.showComment = true
        that.commentType = 'comment'
      } else {
        // 回复
        that.commentType = 'reply'
      }
    },
    goHome () {
      wx.switchTab({
        url: '../index/main'
      })
    },
    closeComment () {
      let that = this
      that.showComment = false
    },
    // textChange (e) {
    //   console.log(e, 'change')
    // },
    publishComment () {
      let that = this
      let commentApi = api.commentApi + that.token
      if (that.commentText === '') {
        wx.showToast({ title: '请输入内容', icon: 'none' })
      } else {
        that.showComment = false
        if (that.commentType === 'comment') {
          // 评论
          let postData = {qid: that.qid, content: that.commentText}
          api.wxRequest(commentApi, 'POST', postData, (res) => {
            let status = res.data.status * 1
            if (status === 201) {
              wx.showLoading({
                title: '发表中'
              })
              let item = res.data.data
              setTimeout(() => {
                wx.hideLoading()
                that.commentList.unshift(item)
                that.commentText = ''
                that.details.total_comment = that.details.total_comment * 1 + 1
                wx.showToast({ title: '评论成功', icon: 'none' })
              }, 1000)
            } else {
              wx.hideLoading()
              wx.showToast({ title: res.data.msg, icon: 'none' })
            }
          })
        } else {
          // 回复
        }
      }
    },
    // 点赞
    govote (e) {
      let that = this
      let qid = that.qid
      let voteApi = api.u_answer
      let option = e.currentTarget.dataset.option
      let answerData = {qid: qid, choose: option}
      api.wxRequest(voteApi + that.token, 'POST', answerData, (res) => {
        let status = res.data.status * 1
        if (status === 201) {
          wx.showToast({ title: '站队成功了', icon: 'none' })
          that.showThumb = true
          that.details = res.data.data
        } else {
          if (status === 444) {
            wx.showToast({ title: '你已经选过了哦，继续浏览其他问题吧', icon: 'none' })
          } else {
            wx.showToast({ title: '投票出错了', icon: 'none' })
          }
        }
      })
    }
  },

  created () {
    let that = this
    api.getToken().then(function (res) {
      if (res.data.status * 1 === 200) {
        that.token = res.data.data.access_token
      } else {
        wx.showToast({ title: '网路出错了', icon: 'none' })
      }
    })
  },
  onLoad (options) {
    this.qid = options.id
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#F5F6F8'
    })
    let res = wx.getSystemInfoSync()
    this.windowHeight = res.windowHeight
    this.isAnDrLiuhai = this.GLOBAL.isAnDrLiuhai
    this.isIphoneLiuhai = this.GLOBAL.isIphoneLiuhai
  },
  onShow () {
    let that = this
    let detailApi = api.quesDetail + that.qid
    let commentApi = api.commentApi + that.token
    api.wxRequest(detailApi, 'GET', {}, (res) => {
      if (res.data.status * 1 === 200) {
        that.details = res.data.data
      } else {
        wx.showToast({ title: '详情数据出错了', icon: 'none' })
      }
    })
    api.wxRequest(commentApi, 'GET', {qid: that.qid, page: that.page}, (res) => {
      if (res.data.status * 1 === 200) {
        let commentPage = res.header['X-Pagination-Page-Count']
        that.commentList = res.data.data || []
        that.commentPage = commentPage
      } else {
        wx.showToast({ title: '评论数据出错了', icon: 'none' })
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      path: `/pages/index/index`,
      success () {
        wx.showToast({ title: '分享成功', icon: 'none' })
      },
      fail () {
        wx.showToast({ title: '分享失败', icon: 'none' })
      }
    }
  }
}
</script>

<style scoped>
  .page {
    background:#f5f6f8;position:relative;height:100%;margin-bottom: 80rpx;
  }
  .page-head{
    padding:30rpx 30rpx 26rpx;color:#343434;font-size:60rpx;background:#f5f6f8
  }
  .detail-header{padding: 50rpx 30rpx 0;}
  .andr-liuhai-header{padding-top: 64rpx;}
  .phone-liuhai-header{padding-top: 76rpx;}
  .back-icon{display: block;width: 34rpx;height: 34rpx;}
  .main-head {
    display:flex;justify-content:space-between;padding:60rpx 40rpx 0
  }
  .left-item {
    width:80%;display:flex
  }
  .right-item {
    display:flex
  }
  .avatar-box {
    width:72rpx;height:72rpx;margin-right:20rpx
  }
  .m-avatar {
    display:block;width:100%;height:100%;
    border-radius:50%;border:1px solid #eee
  }
  .user-infos {
    padding-top:12rpx;display:flex
  }
  .infos-head {
    font-size:36rpx;max-width:240rpx;
    overflow:hidden;white-space:nowrap;text-overflow:ellipsis
  }
  .r-share-btn {
    width:44rpx;height:44rpx;margin-top:12rpx;padding: 0;
    background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAACIiIiJiYmMjIyJiYmIiIiIiIiQkJCmpqaIiIidnZ2IiIiJiYmKioqJiYmIiIiIiIiKioqKioqLi4uKioqJiYmQkJCJiYmJiYmJiYmJiYmJiYmJiYmJiYmIiIiJiYmIiIiLquayAAAAIHRSTlMAkOMidNnAFAThCJ3yQvfv8XszHSq4DN3UireyUDuwYyd1dTMAAAF9SURBVEjH7dfZboMwFARQG4ND2JeSPe38/1cWA8okaaMwr1VHAoGsw7UfwBfDpKX1SYMl1ZEDn3jMIe8Ns7H10/ht9IIfKS63x7YFnlLvzJIP/EL7paDHlGTI7ZLjB+dTHu1dzgjJ54duMSaKnVkRF81rnSoGWMWZESAQ1uhDwc6sh9F5lm247hXo7CQ3DVB1EjSzDOdYg7NM6/Emk+Aiy1BSg4sMJ6fBRXogUSBlAgwKpCyAXIGU42FVSKlCShVSqtDEQEQpQJPlvnwr3ZbwIZQCpFQhpQopVUj5Bsoy2xNq8kooyl2CrTOKJL3uXoyksXWUSr6Agyr5rvzLPyb5jReSA03YV06yHICEe5mQUM5z/xTiRmO5ZwuJR1Pe+gQhWQTUKXsTraQNvVvBfmhVugpoNkbowZb0EYB2nrbS95kuQD+uUuw1s7gCsA9zlfpbF0cIkE0ze+pTbl8lHxJM8ZuHWbQF1qVpUzL+O7xNbVnw6X+leF0s8ba8q/cNo9tNT99Xa0EAAAAASUVORK5CYII=') no-repeat;
    background-size:100% 100%;border-radius: 0
  }
    .gender-box {
    width:30rpx;height:30rpx;
    margin:10rpx 0 0 20rpx
    }
    .gender-boy {
    background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAb1BMVEUAAABolO5nle14o/9nlO5ole5olu5plvCEqP9ole5nle5nlO5nlu9nle5ole1ole5nle5nle5nlO5ole9qlfFunvJolO5ole5vnf9ole5ole1olO5nle9plu5smPBtmfBqmfBole1ol+9nlO9nlO3mUSARAAAAJHRSTlMA+PQJ8NZZKgWclY5+6+jQx66IejcT5KMN3IJpXkg0IyG7UU8IBo44AAABCUlEQVRIx63Vx27DMBBF0WGTVS1ZxZK7k8z/f2MWQaA2j5QA3/VZPBAYkOalZ62K8iuLOtpQzv9VaWRCuuFJugn4hGdV3kGD5QWPvbOX5RgPeqXtAPWd192hTgXdQ10JuoT6KOgz1FbQBdRa0PZDS5ygHcItS7VA16Kuge5F3QOdijoFOhJ1BHR8EfAlho+yfvBjS7Dvlf4hnNELrM2OK+aEfL3VDKs3ectmOiN/xk2wMxTooMYdBwoVj1oH7SPhseQR+1ZkxfIqM7TmeWKp01Owr9Gu/GthTa0Yp2ozG+zYn5vMvykOpW7S94Fr/vCVt3WF14gutLObte0o5+3lVO7QJekdWhPv6RfbxpAUjscA0AAAAABJRU5ErkJggg==') no-repeat;
    background-size:100% 100%
    }
    .gender-girl {
    background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAdVBMVEUAAAD6cXHuaWjuaWjzbmz/fHzuamjtamjuaWjuaWjuamjva2nva2nwa2nta2fuamjtamjua2nxbGnybmvuaWjtamjuamjuamjtaWnuamjvaWnybGruaWftamfuaWjuaWjuamfuaWfvamruaWjva2nwbGztaWdNxpRkAAAAJnRSTlMADtV2Gwb26M3AsGxcQZ6Fc0c2EtyrmHlyaVIl6+PHpaOUMJZ8IbNsieoAAAEKSURBVEjHpdTZboMwEIVhY7PbUCBhCWRp03be/xGrqIqUOGcGo/zXnxA6I1DvFlW2MY2togBblXSvrNaeW9NjdSTinJ47S7wgv4LHDb1mObxLgT5G7KNRB0bnUJ+ZQQiWJlC3hOugPjDaQf3BaAP1J6O/mEPiSqj3jM6hThmdwbsTFxq8Y/UCtGW1wwNKE8qTyKP8Et8O3J1v8nGSCXrvbziSlPV07AbNUP09x+ia7Vgen4/eG/EHlxQPuEzUSqP0uYtLmlWdS781+Ug/Er0a7a9nrlDG7oLPmV2cN3c7aJLSQ6vudR6F6e4fzxTWfMNxGqjT2+vXFFqt1ELhLWraoCfVb9C9Om3Qpz8I2qGEjYffIwAAAABJRU5ErkJggg==') no-repeat;
    background-size:100% 100%
    }
  .ellipse-icon {
    width:44rpx;height:44rpx;
    display:inline-block;
    margin:14rpx 0 0 34rpx
  }
  .ques-title{height: 256rpx;display: flex;align-items: center;justify-content: center;
  font-size: 48rpx;color: #343434;padding: 0 20rpx;word-break: break-all;}
  .white-bg{background: #fff;}
  .per-outer{padding-bottom: 24rpx;overflow: hidden;}
  .per-box{height: 74rpx;display: flex;justify-content: space-between;align-items:center;width: 468rpx;
    margin: 0 auto;}
  .green-font{color: #11B591;font-size: 52rpx;width: 114rpx;text-align: center;}
  .purple-font{color: #62559D;font-size: 52rpx;width: 114rpx;text-align: center;}
  .hot-box{width: 180rpx;background: #F4F4F4;display: flex;align-items:center;border-radius: 26rpx;color: #C7C7CC;font-size: 28rpx;}
  .hot-icon {
    width:30rpx;height:30rpx;margin-right:14rpx;margin-left: 50rpx;
    background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAjVBMVEUAAADIyM3IyM3x8fHIyM3Kys7Hx83IyM3IyM3Pz9PPz9Te3t7IyM3IyM3IyM3NzdLIyM3IyM3IyMzIyM3IyM3IyM7Jyc7R0dHIyM3IyM3IyM3IyM3IyM7Jyc7Jyc7Kys/MzM/IyM3IyM3IyM3IyM3IyM3IyM3IyM7Jyc3IyM7Ly8/MzNDIyM3Jyc3Hx8zykL1oAAAALnRSTlMA++0Cdj/415sSDAfx490ZycO+poxfRxWwqqOHcE85LyXo0s26tX98ZFQrH5NZ/XGvYwAAAeFJREFUSMeNldm6gjAMhAtFQAQXXHDDfUfn/R/vpC3HD1oqzE0h/EIyTSMztIovO9ZVewCO15X+QOjekfYg9exGh4p2s070GDimhIdd4IEPXAuXKi060D0AN5n8pgM9I27HMvrCsB3mQyqQM7YGcGilF0StaX3SOm+lr0T1aC2UK+01BvLqCEza7AuI/ijby5/xfGSjNwSPubxMaZPE+oC/sOThAM6eKbq08Az4rya4nwD471Vy8iRiIAWDBnoFqoyXFdBnVspJ0taE5xSOi4o5929HupEOj9zqhnjK94iC5cvNPKbVLnco25vYWocK5uZxdPvf2ylZMWALh5bRWjZaTUsKPeqtmIq3YiN7Z1Z3jx4EvPYpkjKJu/TMMKQ2Fu4KTjOVFiquqEC9IfITkHjyc1thkHZ2E6Yp6lfMf1SfJL8a9KWnKTfappF+pqnsq5U+6O+mks72E6Uf0os86hY9iF6YY8SipW5v78dwGsR6mtwVTWWf0bd66F22jqm+GKHa3MpiijWdbi6yfjOS3kbxq3mMxplRy0SEc71XppADyVA2BCmsWZUHUCWaOkjcD/OovN+eAZl0c/VXSDmndLocJ5DyrYOZb4/QdNkzuyIvqaBO+3/4y6MsfDeYhE9jRP0BN5NLq+fXj/QAAAAASUVORK5CYII=') no-repeat;
    background-size:100% 100%;
  }
  .border-eee{border: 1px solid #eee;}
  .options-group{padding: 0 50rpx 32rpx;display: flex;justify-content: space-between;}
  .ques-option{width: 316rpx;height: 380rpx;position: relative;}
  .option-text{display: flex;align-items: center;justify-content: center;font-size: 40rpx;
    width: 296rpx;padding: 0 10rpx;border-radius: 10rpx;word-break: break-all;}
  .option-img{display: block;width: 100%;height: 100%;border-radius: 10rpx;}
  .comment-area{margin-top: 20rpx;padding: 30rpx 40rpx 22rpx;margin-bottom: 160rpx;}
  .comment-title{color: #343434;font-size: 40rpx;margin-bottom: 34rpx;}
  .comment-list-group {
    padding:0 40rpx;background:#fff
  }
  .comment-list-item {
    margin-bottom:60rpx
  }
  .comment-list-item:last-child {
    padding-bottom:20rpx
  }
  .list-first-comment {
    display:flex;word-break:break-all;
    margin:12rpx 0 32rpx 68rpx;
    color:#343434;font-size:32rpx
  }
  .list-other-comment {
    padding:30rpx;font-size:28rpx;margin-bottom:20rpx;
    border:1px solid #e5e7ed;background:#f5f6f8;
    margin-left:68rpx;color:#666;border-radius:10rpx
  }
  .list-comment-info {
    margin-left:68rpx;font-size:28rpx;
    color:#888;display:flex;justify-content:space-between
  }
  .comment-operate {
    display:flex;justify-content:space-between;
    position:relative
  }
  .list-user {
    display:flex;font-size:28rpx;color:#888
  }
  .comm-user-avatar {
    display:block;width:48rpx;height:48rpx;
    border-radius:50%;margin-right:20rpx
  }
  .comm-user-name {
    margin-top:4rpx
  }
  .comment-time {
    font-size:24rpx
  }
  .comment-icon {
    width:34rpx;height:32rpx;
    display:inline-block;
    margin-right:12rpx
  }
  .good-icon {
    width:30rpx;height:30rpx;
    display:inline-block;
    margin-right:12rpx
  }
  .good-icon-active {
    animation:gdscale .5s ease-out;
    opacity:1
  }
  .comm-like-icon {
    position:absolute;top:2%;left:60%;
    width:30rpx;height:30rpx;
    animation:gdscale .8s ease-out;opacity:0
  }
  @keyframes gdscale {
    0% {
      transform:scale(1.2);
      opacity:1
    }
    100% {
      transform:scale(1.8);
      opacity:0
    }
  }.comm-good-area {
     display:flex
   }
  .comment-icon-area {
    margin-right:40rpx;
    display:flex
  }
  .comment-owner {
    width:28rpx;height:26rpx;
    display:inline-block;
    margin-left:20rpx;margin-top:6px
  }
  .comment-fixed-area {
    position:fixed;left:0;bottom:0;
    padding:14rpx 0;background:#fff;width:100%;overflow:hidden;
    display:flex;justify-content:space-between;
    border-top:1px solid #e5e7ed
  }
  .fade-input {
    width:482rpx;height:72rpx;
    border-radius:10rpx;
    padding-left:30rpx;line-height:72rpx;
    background:rgba(229,231,237,0.3);
    color:#ccc;font-size:28rpx;margin-left:20rpx
  }
  .input-box {
    background:rgba(229,231,237,0.65);margin-left:20rpx;
    border-radius:10rpx;width:520rpx;padding-left:30rpx;display:flex;
    align-items:center
  }
  .comment-input {
    color:#343434;font-size:30rpx;height:72rpx;width:100%
  }
  .ate-box {
    color:#343434;font-size:28rpx;margin-right:4rpx
  }
  .gohome-view {
    padding-right:40rpx;color:#666;font-size:20rpx;text-align:center;padding-top:4rpx
  }
  .comment-total-view {
    color:#666;font-size:20rpx;text-align:center;padding-top:4rpx
  }
  .total-comm-icon {
    display:block;width:38rpx;height:36rpx;margin-bottom:6rpx
  }
  .comm-gohome-icon {
    display:block;width:38rpx;height:36rpx;margin-bottom:6rpx
  }
  .other-comm-item {
    margin-bottom:4rpx;word-break:break-all
  }
  .comm-btn {
    width:118rpx;height:72rpx;color:#fff;font-size:28rpx;
    border-radius:10rpx;line-height:2.6;background:#e1e1e1
  }
  .comm-btn:after {
    border:0
  }
  .comm-red-btn {
    background:#d43d3d
  }
  .red-font {
    color:#d43d3d
  }
  .click-btn {
    background:#d43d3d;color:#fff
  }
  .wxapp-toast-mask {
    opacity:0;width:100%;height:100%;overflow:hidden;
    position:fixed;top:0;left:0;z-index:888
  }
  .wxapp-toast-content-box {
    display:flex;justify-content:center;align-items:center;
    width:100%;height:100%;
    position:fixed;z-index:999;left:50%;top:50%;
    margin-left:-50%;margin-top:-46%
  }
  .wxapp-toast-content {
    width:50%;padding:20rpx;
    background:rgba(0,0,0,0.5);border-radius:10rpx
  }
  .wxapp-toast-content-text {
    height:100%;width:100%;
    color:#fff;font-size:28rpx;text-align:center
  }
  .nomore-text {
    color:#c7c7c7;font-size:24rpx;
    text-align:center;padding:20rpx 0
  }
  .comment-mask{position: fixed;top:0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5)}
  .comment-write-area{
    width: 660rpx;height: 500rpx;background: #fff;border-radius: 8rpx;
    position: fixed;left: 50%;top:50%;margin-left: -330rpx;margin-top: -250rpx;
  }
  .close-icon{position: absolute;right: -26rpx;top: -28rpx;width: 70rpx;height: 70rpx;
    border-radius: 50%;background: #f1f1f1;text-align: center;line-height: 70rpx;font-size: 36rpx;}
  .comment-text-area{display: block;width: 100%;height: 360rpx;padding: 16rpx;}
  .btn-container{border-top: 1px solid #eee;height: 106rpx;display: flex;align-items: center;flex-direction: row-reverse;}
  .comment-btn{margin-right: 20rpx;width: 120rpx;height: 60rpx;background: #d43d3d;color: #fff;
    line-height: 60rpx;text-align: center;border-radius: 8rpx;font-size: 30rpx;}
  .ques-fxi{font-size: 30rpx;color: #343434;padding: 0 56rpx 20rpx;}
  .red-percent{color: #d43d3d;font-size: 34rpx;}
  .voted-thumb-box{
    position: fixed;width: 80rpx;height: 80rpx;top:50%;left: 50%;margin-left: -40rpx;margin-top: -40rpx;
    /*width:440rpx;height:440rpx;position:absolute;*/
  }
  .thumb_up{display: block;width: 100%;height: 100%;animation:thumb2 1s linear;opacity:0;}
  @keyframes thumb2{
    15%{transform:scale(0.4);opacity:1}
    30%{transform:scale(0.8);opacity:1}
    100%{transform:scale(1);opacity:1}
  }
</style>
