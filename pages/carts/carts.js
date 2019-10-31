Page({
    data: {
        src:"/images/logo.jpg",
        // 搜索框样式
        searchColor: "rgba(0,0,0,0.4)",
        searchSize: "15",
        searchName: "搜索商品",
    },
    gotoShow: function() {
        console.log(111)
        var _this = this
        wx.chooseImage({
            count: 9, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                // success
                console.log(res)
                _this.setData({
                    src: res.tempFilePaths
                })
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
})