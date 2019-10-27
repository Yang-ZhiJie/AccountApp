//app.js
App({

  onLaunch: function (options) {
    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
      }, fail(err) {
        console.log(err);
      }
    })
      
  },
  getToken(cb){
    wx.getStorage({
      key: 'token',
      success: res => {
        cb(res.data)
      }, fail(err) {
        console.log("获取token失败")
      }

    })
    
  },
  getData: function (e) {
    //获得token
    console.log(this.data.token)
    wx.request({
      url: 'http://jizhang-api-dev.it266.com/api/account?token=' + this.data.token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        // console.log(e.data)

        var dataList = e.data.data;
        var arr = []
        for (let i in dataList) {
          arr.push(dataList[i].name)

        }
        this.setData({
          accountList: arr
        })

        console.log(this.data.accountList)
        this.onLoad()
      }

    })

  },
  globalData: {
    navHeight: 0,
    //token:'',
    //abc:'123',
    show:0,
    
    url:'http://jizhang-api-dev.it266.com',
    accountId:'',
    PageCur:''
  },
})