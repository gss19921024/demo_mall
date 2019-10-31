
Component({
    /**
     * 组件的属性列表   父组件传的参数
     */
    properties: {
        timeData: {
            type: Array,
            value: []
        }
    },
    options: {
        addGlobalClass: true, // 允许使用公用css
    },
    /**
     * 组件的初始数据
     */
    data: {
        dayArr: [], //当月天数
        weekArr: ['日', '一 ', '二', '三', '四', '五', '六'],
        nowMonth: null, //当前月

    },

    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * 获取当前月后的 11个月的月份
         */
        getMonth: function () {
            let date, newMonth = 0, getMonth, getYear, monthArr = [], that = this;
            date = new Date();
            getYear = date.getFullYear();
            getMonth = date.getMonth();
            for (let i = 0; i < 12; i++) {
                if (getMonth < 12) {
                    getMonth++;
                    let monthData = {
                        month: that.placeHolder(getMonth),
                        year: getYear,
                        yearMonth: getYear + '-' + that.placeHolder(getMonth),
                        isActive: false
                    }
                    monthArr.push(monthData)
                } else {
                    newMonth++
                    let monthData = {
                        month: that.placeHolder(newMonth),
                        year: getYear + 1,
                        yearMonth: getYear + 1 + '-' + that.placeHolder(newMonth),
                        isActive: false
                    }
                    monthArr.push(monthData)
                }

            };
            monthArr[0].isActive = true

            // console.log(monthArr)
            this.setData({
                monthArr: monthArr,
                newMonth: parseInt(monthArr[0].month, 10)
            })
            // 计算当前月天数
            this.getday(monthArr[0].year, monthArr[0].month)

        },
        /**
         *  获取 选中“月”天数
         */
        getday: function (year, month) {
            let that = this;
            month = parseInt(month, 10);
            let day = new Date(year, month, 0);
            let allDay = day.getDate();
            let dayArr = [];
            for (let i = 1; i < allDay + 1; i++) {
                let date = year + '-' + that.placeHolder(month) + '-' + that.placeHolder(i)
                let dayDatail = {
                    date: date, // 完整时间 ‘2019-08-05’
                    week: new Date(date).getDay(), //星期几
                    day: i, // 几号
                    money: '', // 金额
                    isActive: false //是否选中
                }
                dayArr.push(dayDatail)
            }

            /**
             * 占位
             * 功能：将“天”数对应到“星期”下
             */
            let forNum = dayArr[0].week - 0;
            for (let t = 0; t < forNum; t++) {
                let test = {
                    date: '',
                    week: '',
                    day: '',
                    money: ''
                }
                dayArr.unshift(test)
            }

            this.setData({
                dayArr: dayArr
            })

            this.mergeFn()
        },
        /**
         * 时间补位  小于10加'0'
         *
         * 7 ==> '07'
         */
        placeHolder: function (data) {
            if (data < 10) {
                data = '0' + data
                return data
            } else {
                return data.toString()
            }
        },
        /**
         *
         * 有金额的日期  ----->选择出行日期
         * timeData 接收的参数
         * 合并数据(当前日期匹配的有金额的日期)
         */
        mergeFn: function () {
            let timeData = this.data.timeData
            let dayArr = this.data.dayArr;
            dayArr.forEach(function (item, num) {
                timeData.forEach(function (data, index) {
                    if (item.date === data.date) {
                        item.money = data.money
                    }
                })
            })
            // console.log(dayArr)
            this.setData({
                dayArr: dayArr
            })
        },

        /**
         * 月份点击
         */
        monthClick: function (e) {
            let clickIndex, monthArr;
            clickIndex = e.currentTarget.dataset.index;
            monthArr = this.data.monthArr;
            monthArr.forEach(function (data, index) {
                if (index === clickIndex) {
                    data.isActive = true
                } else {
                    data.isActive = false
                }
            })
            this.setData({
                monthArr: monthArr,
                newMonth: parseInt(monthArr[clickIndex].month, 10),
            })

            this.getday(monthArr[clickIndex].year, monthArr[clickIndex].month)
        },
        /**
         * 日期点击
         */
        _dayClick: function (e) {
            let clickIndex, dayArr;
            clickIndex = e.currentTarget.dataset.index;
            dayArr = this.data.dayArr;
            // console.log(clickIndex)
            if (dayArr[clickIndex].money) {
                dayArr.forEach(function (data, index) {
                    if (index === clickIndex) {
                        data.isActive = true
                    } else {
                        data.isActive = false
                    }
                })
                this.setData({
                    dayArr: dayArr
                })

                // 父组件所需参数

                let param = {
                    calendarDate: dayArr[clickIndex].date,
                    calendarMoney: dayArr[clickIndex].money,
                    calendarMonth: dayArr[clickIndex].date.split('-')[1],
                    calendarDay: dayArr[clickIndex].date.split('-')[2]
                }

                /**
                 * 向父组件传参
                 */
                this.triggerEvent('dayClick', param)
            }

        },

    },

})