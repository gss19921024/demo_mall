const app = getApp()
Page({
    data: {
        userInfo: {},
        notice:[
            {title: '这是第一条数据啊'},
            {title: '这是第二条数据啊'},
            {title: '这是第三条数据啊'},
            {title: '这是第四条数据啊'},
            {title: '这是第五条数据啊'}
        ]
    },
    onLoad: function () {

    },
    toDatas:function () {
        wx.navigateTo({
            url: '../datas/datas'
        })
    }
})