<template>
  <div class="page" :style="{height:windowHeight+'px'}">
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
        <div class="r-share-btn" @click="gotoShare"></div>
        <!--<img v-if="isMy" src="../../images/d_more.png" class="ellipse-icon" @click="gotoDelete" />-->
      </div>
    </div>
    <div class="ques-title white-bg">{{details.question}}</div>
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
      token: '',
      windowHeight: ''
    }
  },

  methods: {
    gotoOthers () {},
    gotoShare () {}
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
  },
  onShow () {
    let that = this
    let detailUrl = api.quesDetail + that.qid
    api.wxRequest(detailUrl, 'GET', {}, (res) => {
      if (res.data.status * 1 === 200) {
        that.details = res.data.data
      } else {
        wx.showToast({ title: '网路出错了', icon: 'none' })
      }
    })
  }
}
</script>

<style scoped>
  .page {
    background:#f5f6f8;position:relative;height:100%
  }
  .page-head{
    padding:20rpx 30rpx 26rpx;color:#343434;font-size:60rpx;background:#f5f6f8
  }
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
    width:44rpx;height:44rpx;margin-top:12rpx;
    background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAACIiIiJiYmMjIyJiYmIiIiIiIiQkJCmpqaIiIidnZ2IiIiJiYmKioqJiYmIiIiIiIiKioqKioqLi4uKioqJiYmQkJCJiYmJiYmJiYmJiYmJiYmJiYmJiYmIiIiJiYmIiIiLquayAAAAIHRSTlMAkOMidNnAFAThCJ3yQvfv8XszHSq4DN3UireyUDuwYyd1dTMAAAF9SURBVEjH7dfZboMwFARQG4ND2JeSPe38/1cWA8okaaMwr1VHAoGsw7UfwBfDpKX1SYMl1ZEDn3jMIe8Ns7H10/ht9IIfKS63x7YFnlLvzJIP/EL7paDHlGTI7ZLjB+dTHu1dzgjJ54duMSaKnVkRF81rnSoGWMWZESAQ1uhDwc6sh9F5lm247hXo7CQ3DVB1EjSzDOdYg7NM6/Emk+Aiy1BSg4sMJ6fBRXogUSBlAgwKpCyAXIGU42FVSKlCShVSqtDEQEQpQJPlvnwr3ZbwIZQCpFQhpQopVUj5Bsoy2xNq8kooyl2CrTOKJL3uXoyksXWUSr6Agyr5rvzLPyb5jReSA03YV06yHICEe5mQUM5z/xTiRmO5ZwuJR1Pe+gQhWQTUKXsTraQNvVvBfmhVugpoNkbowZb0EYB2nrbS95kuQD+uUuw1s7gCsA9zlfpbF0cIkE0ze+pTbl8lHxJM8ZuHWbQF1qVpUzL+O7xNbVnw6X+leF0s8ba8q/cNo9tNT99Xa0EAAAAASUVORK5CYII=') no-repeat;
    background-size:100% 100%
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
</style>
