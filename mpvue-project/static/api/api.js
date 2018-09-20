// 接口

// const http = 'https://fabu.choosen.79643.com/'
const http = `https://choosen.79643.com/`
const login = `${http}v1/member/login`
const questop = `${http}v1/questions/top?access-token=`
const noTopQues = `${http}v1/questions?access-token=`
const myQuest = `${http}v1/questions/my-question?access-token=`
const joinQuest = `${http}v1/questions/join-question?access-token=`
const chooseAnswer = `${http}v1/choose?access-token=`
const watchQues = `${http}v1/watch?access-token=`
const publish = `${http}v1/questions?access-token=`
const quesDetail = `${http}v1/questions/`
const voteCount = `${http}v1/message/vote-count?access-token=`
const noticeCount = `${http}v1/message/notice-count?access-token=`
const noticeMsg = `${http}v1/message/notice-msg?access-token=`
const voteMsg = `${http}v1/message/vote-msg?access-token=`
const userInfo = `${http}v1/member/user-info?access-token=`
const myInfo = `${http}v1/member/info?access-token=`
const othersInfo = `${http}v1/member/other-info?access-token=`
const msgUnreadTotal = `${http}v1/message/total-count?access-token=`
const myChooseTagApi = `${http}v1/choose/my-choose?access-token=`
const readNoticeApi = `${http}v1/message/read-notice?access-token=`
const readVoteApi = `${http}v1/message/read-vote?access-token=`
const otherPublishQues = `${http}v1/questions/others-question?access-token=`
const feedback = `${http}v1/feed?access-token=`
const deleMyQues = `${http}v1/questions/`
const shareFriends = `${http}v1/share/share-friend`
const shareMoment = `${http}v1/share/share-circle?access-token=`
const posterApi = `${http}v1/questions/share-code?access-token=`
const uploadApi = `${http}v1/questions/upload-images?access-token=`
const userBaseApi = `${http}v1/basis/user-basis?access-token=`
const showBaseApi = `${http}v1/member/show-basis?access-token=`
const commentApi = `${http}v1/comment?access-token=`
const praiseApi = `${http}v1/comment/praise?access-token=`
const commentUnreadApi = `${http}v1/message/comment-notice-none-count?access-token=`
const commMsgListApi = `${http}v1/message/comment-notice?access-token=`
const commReadApi = `${http}v1/message/read-comment-notice?access-token=`
const shareApi = `${http}v1/share/share-generate?access-token=`
const categoryListApi = `${http}v1/category?access-token=`
const cateDetailsApi = `${http}v1/category/`
const cateQuesApi =  `${http}v1/category/question?access-token=`

function wxRequest (url, method, data = {}, callback) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type': 'application/x-www-form-urlencoded'
    },
    success: (res) => {
      callback(res)
    },
    fail: (res) => {
      console.log(res)
    }
  })
}

function getToken () {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        let reqData = {}
        let code = res.code
        if (code) {
          reqData.code = code
          wxRequest(login, 'POST', reqData, (res) => {
            resolve(res)
          })
        }
      }
    })
  })
}

module.exports = {
  loginApi: login,
  questions: questop,
  noTopQues: noTopQues,
  my_question: myQuest,
  my_join: joinQuest,
  u_answer: chooseAnswer,
  publishApi: publish,
  quesDetail: quesDetail,
  voteUnreadApi: voteCount,
  noticeUnreadApi: noticeCount,
  noticeMsg: noticeMsg,
  voteMsg: voteMsg,
  userInfo: userInfo,
  othersInfo: othersInfo,
  msgUnreadTotal: msgUnreadTotal,
  watchQuesApi: watchQues,
  myChooseTagApi: myChooseTagApi,
  readNoticeApi: readNoticeApi,
  readVoteApi: readVoteApi,
  otherPublishQues: otherPublishQues,
  myInfo: myInfo,
  feedback: feedback,
  deleMyQues: deleMyQues,
  shareFriends: shareFriends,
  shareMoment: shareMoment,
  posterApi: posterApi,
  uploadApi: uploadApi,
  userBaseApi: userBaseApi,
  showBaseApi: showBaseApi,
  getToken: getToken,
  commentApi: commentApi,
  praiseApi: praiseApi,
  commentUnreadApi: commentUnreadApi,
  commMsgListApi: commMsgListApi,
  commReadApi: commReadApi,
  shareApi: shareApi,
  wxRequest: wxRequest,
  categoryListApi: categoryListApi,
  cateDetailsApi: cateDetailsApi,
  cateQuesApi: cateQuesApi
}
