// pages/addbook/addbook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname:'',
    token:'',
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      url: app.globalData.url
    })
    app.getToken((token) => {
      console.log(token)
      if (token != null) {
        that.setData({
          token: token
        })
        // this.getType()
        // this.getData()
      } else {
        that.setData({
          token: ''
        })
        return
      }

    })

  },

  //获取账簿名称
  bookName:function(e){
    this.setData({
      bookname:e.detail.value
    })
    console.log(this.data.bookname)
  },

  //添加账簿
  addAccountBook:function(e){
   var name=this.data.bookname
   if(name==''){
     wx.showModal({
       content: '账簿名为空',
       showCancel:false
     })
   }else{
     this.addAccountBook1()
   }
  },
  
  addAccountBook1:function(e){
    var token=this.data.token
    var url=this.data.url
    wx.showLoading({
      title: '添加中...',
      mask: true
    })
    wx.request({
      url: url +'/api/book/create?token='+token,
      method:'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        name:this.data.bookname
      },
      success:(e)=>{
        console.log(e.data)
        if(e.data.status==true){
          wx.hideLoading()
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 2000,
            success:(e)=>{
              wx.navigateTo({
                url: '/pages/accountsets/account',
              })
            }
          })
        } else{
          wx.hideLoading()
          wx.showModal({
            title: '添加失败',
            content: e.data.data,
            showCancel:false,
            success:(res)=>{
              wx.navigateTo({
                url: '/pages/accountsets/account',
              })
            }
          })
          return
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