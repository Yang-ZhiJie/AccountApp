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
    textcode: '',
    password: '',
    success:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
  },  
  // 获取手机号
  phoneNum: function (e) {
    console.log('111')
    this.setData({
      phonenum: e.detail.value
    })

    console.log(this.data.phonenum);
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
    })
  },
  // 获得图形code与api进行对比验证
  imgCode: function (e) {
    this.setData({
      imgcode: e.detail.value
    })
    // console.log(this.data.imgcode);
  },
  //获得密码
  passWord: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  goLogin1:function(e){
    var mobile=this.data.phonenum
    var password=this.data.password
    if (mobile==''){
      wx.showModal({
        content: '手机号为空',
        showCancel:false
      })
    } else if (password==''){
      wx.showModal({
        content: '密码为空',
        showCancel: false
      })
    }else{
      this.goLogin()
    }
  },

  goLogin: function (e) {
    wx.showLoading({
      title: '登录中',
      mask:true
    })
    wx.request({
      url: 'http://jizhang-api-dev.it266.com/api/user/token/mobile',
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        mobile: this.data.phonenum,
        password: this.data.password,
        // captcha_code: this.data.imgcode,
        // captcha_key: this.data.imgkey
      },
      success: (e) => {
        console.log(e.data)
        if(e.data.status==true){
          wx.hideLoading()
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          var userToken = e.data.data.token;
          wx.setStorage({
            key: 'token',
            data: userToken,
          })
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }else{
          wx.hideLoading()
          wx.showModal({
            title: '登录失败',
            content: e.data.data,
            showCancel:false
          })
          // this.onShow()
        }
      }
    })
  },
})