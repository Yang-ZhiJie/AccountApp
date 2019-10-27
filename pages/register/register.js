// pages/login/login.js
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
    username: '',
    textcode: '',
    password: '',
    show:0
  },
  // 获取手机号
  phoneNum: function(e) {
    console.log('111') 
      this.setData({
        phonenum: e.detail.value
      })
    
    console.log(this.data.phonenum);
  },
  // 获得图形验证码
  getImgs: function(e) {

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
  imgCode: function(e) {
    this.setData({
      imgcode: e.detail.value
    })
    // console.log(this.data.imgcode);
  },
  //获得用户名
  nickName: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  //获得密码
  passWord: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //获得手机验证吗
  getTextCode: function(e) {
    this.setData({
      textcode: e.detail.value
    })
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
  //手机号注册
  goRegister: function(e) {
    wx.request({
      url: 'http://jizhang-api-dev.it266.com/api/user/register',
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      // mobile 手机号码
      // verify 短信验证码
      // password 密码
      // nickname 昵称 可选参数
      data: {
        mobile: this.data.phonenum,
        verify: this.data.textcode,
        password: this.data.password,
        nikename: this.data.username
      },
      success: (e) => {
        console.log(e.data)
        if(e.data.status==true){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          })
          this.setData({
            show:1
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
  }
})