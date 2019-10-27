// pages/password/setpassword.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newpassword:'',
    oldpassword:'',
    token:'',
    url:''
  },

  //获得新密码
  newPassWord: function (e) {
    this.setData({
      newpassword: e.detail.value
    })
  },

  //获得旧密码
  oldPassWord: function (e) {
    this.setData({
      oldpassword: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
      url: app.globalData.url
    })
    app.getToken((token) => {
      // console.log(token)
      this.setData({
        token: token
      })
      console.log(this.data.token)
    })
  },

  //修改密码
  updateUserPassword:function(e){
    var token=this.data.token
    var url=this.data.url
    wx.request({
      url: url +'/api/user/password?token='+token,
      method:'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        password:this.data.oldpassword,
        new_password:this.data.newpassword
      }, 
      success:(e)=>{
        if(e.data.status==true){
          wx.clearStorage(token)
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})