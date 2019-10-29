const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    nickname:'',
    avatar_url:'',
    show:0,
    logout:1,
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //账簿数量
  getAccountBook: function (e) {
    var token = this.data.token
    var url = this.data.url
    wx.request({
      url: url + '/api/book?token=' + token,
      method: 'get',
      success: (e) => {
        console.log(e.data)
        var dataList = e.data.data;
        var arr = []
        for (let i in dataList) {
          arr.push(dataList[i])
        }
        this.setData({
          accountList: arr.length,
        })
        console.log(this.data.accountList)
      }
    })
  },

  //记账数量
  getAccountDetails: function (e) {
    console.log(this.data.accountListId)
    let token = this.data.token
    var url = this.data.url
    wx.request({
      url: url + '/api/record/real?token=' + token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        // account_id: this.data.accountListId
      },
      success: (e) => {
        // console.log(e)
        console.log(e.data.data.list)
        this.setData({
          pageSource: e.data.data.list.length
        })
        this.onShow()
      }
    })
    // console.log(this.data.accountId)
  },

  onLoad: function (options) {
    this.setData({
      url:app.globalData.url
    })
    app.getToken((token) => {
      console.log(token)
      if(token!=null){
        this.setData({
          token: token,
          show:1,
          logout:0
        })
      }
      this.getAccountDetails()
      this.getAccountBook()
      this.getData()
    })
  },
  getData:function(){
    var token=this.data.token
    var url=this.data.url
    console.log(token)
    console.log(url)
    wx.request({
      url: url+'/api/user/profile?token='+token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        console.log(e.data)
        this.setData({
          nickname: e.data.data.nickname,
          avatar_url: e.data.data.avatar_url
        })
      }
    })
  },
  clearToken:function(){
    var token = this.data.token
    var url = this.data.url
    wx.request({
      url: url+'/api/user/logout?token='+token,
      method: "get",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        console.log(e.data)
        var userToken=e.data.data
        wx.setStorage({
          key: 'token',
          data: userToken,
        })
        wx.navigateTo({
          url: '/pages/index4/index4',
        })
      },
      
    })
  }

})