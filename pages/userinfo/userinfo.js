// pages/userinfo/userinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenum: '',
    imgsurl: '',
    imgcode: '',
    imgkey: '',
    textcode: '',
    password: '',
    token:'',
    url:''
  },

  //获取新的手机号码
  phoneNum: function (e) {
    console.log('111')
    this.setData({
      phonenum: e.detail.value
    })

    console.log(this.data.phonenum);
  },

  //获得密码
  passWord: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 获得图形验证码
  getImgs: function (e) {

    wx.request({
      url: "http://jizhang-api-dev.it266.com/api/captcha",
      method: "get",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        console.log(e.data)
        this.setData({
          imgsurl: e.data.data.url,
          imgkey: e.data.data.key
        })
        console.log(this.data.imgsurl)
      },
      fail: () => {

      }
    })
  },

  // 获得图形code与api进行对比验证
  imgCode: function (e) {
    this.setData({
      imgcode: e.detail.value
    })
    // console.log(this.data.imgcode);
  },

  // 获取手机验证码
  getPhoneNum(e) {
    wx.request({
      url: 'http://jizhang-api-dev.it266.com/api/sms/verify',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        mobile: this.data.phonenum,
        captcha_code: this.data.imgcode,
        captcha_key: this.data.imgkey
      },
      success: (e) => {
        console.log(e.data)
      },
    })
  },

  //获得手机验证吗
  getTextCode: function (e) {
    this.setData({
      textcode: e.detail.value
    })
  },

  //修改手机号码
  updateUserInfo:function(){
    var url=this.data.url
    var token=this.data.token
    console.log(token)
    wx.request({
      url: url +'/api/user/mobile?token='+token,
      method:'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        password:this.data.password,
        mobile:this.data.phonenum,
        verify:this.data.textcode
      },
      success:(e)=>{
        console.log(e.data)
        if(e.data.status==true){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          wx.clearStorage(token)
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    // var that = this;
    this.setData({
      navH: app.globalData.navHeight,
      url:app.globalData.url
    })
    app.getToken((token) => {
      console.log(token)
      this.setData({
        token: token
      })
      // console.log(this.data.token)
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