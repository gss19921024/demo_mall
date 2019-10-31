import requestUrl from '../../utils/util.js'

Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function (options) {
    },
    bindGetUserInfo: function (e) {//点击的“拒绝”或者“允许
        if (e.detail.userInfo) {//点击了“允许”按钮，
            var that = this;
            requestUrl.requestUrl({//将用户信息传给后台数据库
                url: "/user/modify",
                params: {
                    token: wx.getStorageSync('token'),
                    // openId: globalOpenId,//用户的唯一标识
                    nick: e.detail.userInfo.nickName,//微信昵称
                    avatarUrl: e.detail.userInfo.avatarUrl,//微信头像
                    province: e.detail.userInfo.province,//用户注册的省
                    city: e.detail.userInfo.city//用户注册的市
                }
            }).then((data) => {

                wx.switchTab({
                    url: '../index/index',
                })
            }).catch((errorMsg) => {
                console.log(errorMsg)
            })
        } else {

            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {

                    }
                }
            })
        }
    }

})