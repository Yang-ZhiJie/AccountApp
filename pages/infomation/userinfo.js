// pages/infomation/userinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    token:'',
    nickname:'',
    newnickname:'',
    imgs:'',
    imgList: [],
    imgKey:[]
  },

  //获取个人信息
  getuserinfo:function(e){
    var url=this.data.url
    var token=this.data.token
    wx.request({
      url: url +'/api/user/profile?token='+token,
      method:'get',
      success:(e)=>{
        console.log(e.data)
        this.setData({
          nickname:e.data.data.nickname,
          imgs: e.data.data.avatar_url
        })
      }
    })
  },
  //获得昵称
  
  getnickname: function(e) {
      this.setData({
        newnickname: e.detail.value
      })
      console.log(this.data.nickname)
    },

  //上传图片
  chooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
          var token = this.data.token;
          var url = this.data.url;
          var imgUrl = res.tempFilePaths[0]
          wx.uploadFile({
            url: url + '/api/upload/image?token=' + token,
            filePath: imgUrl,
            name: 'file',
            success: (e) => {
              console.log(JSON.parse(e.data))
              var imgsourse = JSON.parse(e.data)
              // imgsourse.data.file.fileKey
              var keyList = []
              keyList.push(imgsourse.data.file.fileKey)
              this.setData({
                imgKey: keyList
              })
              console.log(this.data.imgKey)
            }
          })
        }
      }
    });
  },
  //修改个人信息
  updateUserInfo:function(e){
    var token = this.data.token;
    var url = this.data.url;
    wx.request({
      url: url +'/api/user/profile/update?token='+token,
      method:'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        nickname:this.data.newnickname,
        avatar:this.data.imgKey
      },
      success:(e)=>{
        console.log(e.data)
        if (e.data.status==true){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          // this.navBack()
          wx.navigateTo({
            url: '/pages/index4/index4',
          })
        }
      }
    })
  },

  //预览图片
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  //删除图片
  DelImg(e) {
    wx.showModal({
      title: '尊敬的用户',
      content: '确定取消吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
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
      // console.log(this.data.token)
      this.getuserinfo()
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

  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})