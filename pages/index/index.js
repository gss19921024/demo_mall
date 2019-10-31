const app = getApp()
Page({
    data: {
        userInfo: {}
    },
    onLoad: function () {

    },
    toDatas:function () {
        wx.navigateTo({
            url: '../datas/datas'
        })
    }
})