//时间处理
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//封装请求
const server = 'https://api.it120.cc/saboori';//正式域名
const requestUrl = ({url, params, success, method = "post"}) => {
    wx.showLoading({
        title: '加载中',
    });
    let headerPost = {'content-type': 'application/x-www-form-urlencoded'}
    let headerGet = {'content-Type': 'application/json'}
    return new Promise((resolve, reject) => {
        wx.request({
            url: server + url,
            method: method,
            data: params,
            header: method = 'post' ? headerPost : headerGet,
            success: (res) => {
                wx.hideLoading();
                // if (sessionId == "" || sessionId == null) {
                //     wx.setStorageSync('sid', res.data.info.sessionId)//  如果本地没有就说明第一次请求 把返回的 sessionId 存入本地
                // }
                if (res['statusCode'] == 200) {
                    resolve(res)//异步成功之后执行的函数
                } else {
                    wx.showToast({
                        title: res.data.msg || '请求出错',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    })
                    reject(res.ErrorMsg);
                }
            },
            fail: (res) => {
                wx.hideLoading();
                wx.showToast({
                    title: res.data.msg || '',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                })
                reject('网络出错');
            },
            complete: function () {
                wx.hideLoading()
            }
        })
    })
}
module.exports = {
    formatTime: formatTime,
    requestUrl: requestUrl
}
