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