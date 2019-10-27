// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    token:'',
    feedbackcontent:''
  },

  //获得反馈内容
  textareaAInput:function(e){
    this.setData({
      feedbackcontent:e.detail.value
    })
    console.log(this.data.feedbackcontent)
  },

  //提交反馈意见
  uploadFeedBack:function(){
    var token=this.data.token
    var url=this.data.url
    wx.showLoading({
      title: '反馈中...',
      mask:'true'
    })
    wx.request({
      url: url +'/api/feedback/add?token='+token,
      method:'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        content: this.data.feedbackcontent
      },
      success:(e)=>{
        console.log(e.data)
        if(e.data.status==true){
          setTimeout(function(){
            wx.hideLoading()
            wx.showToast({
              title: '反馈成功',
              icon: 'success',
              duration: 2000
            })
          },3000)
          wx.navigateTo({
            url: '/pages/index4/index4',
          })
        }else{
          wx.showToast({
            title: '反馈失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
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
      console.log(token)
      this.setData({
        token: token
      })
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