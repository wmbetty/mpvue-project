import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/details/main', 'pages/publish/main', 'pages/friend/main', 'pages/mine/main', 'pages/feedback/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#d43d3d',
      navigationBarTitleText: '选象',
      navigationBarTextStyle: 'white',
      navigationStyle: 'custom'
    },
    tabBar: {
      'color': '#343434',
      'selectedColor': '#d43d3d',
      'list': [{
        'pagePath': 'pages/index/main',
        'iconPath': 'static/images/tab/home1.png',
        'selectedIconPath': 'static/images/tab/home2.png',
        'text': '首页'
      }, {
        'pagePath': 'pages/publish/main',
        'iconPath': 'static/images/tab/camera1.png',
        'selectedIconPath': 'static/images/tab/camera2.png',
        'text': '发布'
      }, {
        'pagePath': 'pages/friend/main',
        'iconPath': 'static/images/tab/friend1.png',
        'selectedIconPath': 'static/images/tab/friend2.png',
        'text': '找人'
      }]
    }
  }
}
