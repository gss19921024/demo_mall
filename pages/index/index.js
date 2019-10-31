const app = getApp()
Page({
    data: {
        userInfo: {}
    },
    onLoad: function () {
        console.log(1222)
        var that = this;
        // 判断是否已经授权
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
                    wx.getUserInfo({
                        success: (res) => {
                            wx.setStorageSync('userInfo', res.userInfo);
                            console.log(222222, wx.getStorageSync('userInfo')) //存的基本信息
                            console.log(333333, wx.getStorageSync('userInfo').nickName) // 取我要的信息
                        }
                    })
                } else {//未授权，跳到授权页面
                    wx.redirectTo({
                        url: '../authorize/authorize',//授权页面
                    })
                }
            }
        })
    },
    toDatas:function () {
        wx.navigateTo({
            url: '../datas/datas',//授权页面
        })
    }
})