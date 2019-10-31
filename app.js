import requestUrl from './utils/util.js'

App({
    onLaunch: function () {
        this.checkout()
    },
    //检验code
    checkout: function () {
        wx.checkSession({
            success: function() {
                //session_key 未过期，并且在本生命周期一直有效
                console.log("未过期",wx.getStorageSync('token'))
            },
            fail: function() {
                //session_key 已经失效，需要重新执行登录流程
                console.log("过期了",wx.getStorageSync('token'))
                wx.login({
                    success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        if (res.code) {
                            console.log('code', res.code)
                            requestUrl.requestUrl({
                                url: "/user/wxapp/login",
                                params: {
                                    code: res.code,
                                    type: '2'
                                }
                            }).then((res) => {
                                wx.setStorageSync('openId', res.data.data.openid);
                                wx.setStorageSync('token', res.data.data.token);
                            }).catch((errorMsg) => {
                                console.log(errorMsg)
                            })
                        }
                    }
                })
            }
        })
    },
    globalData: {
        userInfo: "",//用户信息
        openId: "",//登录用户的唯一标识
        appid: 'wxe7c4ac8324f60b85',//appid
        AppSecret: '36664aed140798ec8a5aacbc77b18ff8',//secret秘钥
        token: ''
    },
    onHide: function () {//小程序退出时触发的事件
        console.log("小程序完全退出了")
    }
})