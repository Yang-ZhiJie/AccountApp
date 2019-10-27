// pages/setaccount/setaccount.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountList:[],
    accountListId:'',
    accountId:''
  },

  getData: function (e) {
    //获得token
    // console.log(this.data.token)
    var token = this.data.token
    var url = this.data.url
    wx.request({
      url: url + '/api/account?token=' + token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },

      success: (e) => {
        console.log(e.data)
        var dataList = e.data.data;
        var arr = []
        for (let i in dataList) {
          arr.push(dataList[i])
        }
        this.setData({
          accountList: arr,
          accountListId: arr[0].id
        })
        console.log(this.data.accountList)
        console.log(this.data.accountListId)
        // this.getAccountDetails()
      }
    })
  },

  //删除账户
  deleteAccount: function (e) {
    console.log('1111')
    this.setData({
      accountId: e.currentTarget.dataset.accountid
    })
    console.log(this.data.accountId)
    var token = this.data.token
    var id = this.data.accountId
    var url = this.data.url
    wx.request({
      url: url + '/api/account/delete?id=' + id + '&token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        // console.log(e)
        this.onShow()
      }
    })
    //  console.log(this.data.accountId)
  },

  // 修改账户
  updateAccount: function (e) {
    var token = this.data.token
    var id = e.currentTarget.dataset.accountid
    var url = this.data.url
    // var pages = getCurrentPages();
    wx.request({
      url: url + '/api/account/detail?id=' + id + '&token=' + token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        // console.log(e.data)
        var accountSource = e.data.data
        console.log(accountSource)
        wx.setStorageSync('accountSource', accountSource)
        wx.navigateTo({
          url: '/pages/updateaccount/updateaccount',
        })
        // var source=wx.getStorageSync('accountSource')
        // console.log(source)
      }
    })
    // console.log(e)
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
      this.getData()
    })
  },

  //添加账户
  goaddaccount:function(){
    wx.navigateTo({
      url: '/pages/accountbook/accountbook',
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
    app.getToken((token) => {
      console.log(token)
      this.setData({
        token: token
      })
      this.getData()
    })
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
  showModal2: function (e) {
    this.setData({
      getbookid: e.currentTarget.dataset.bookid,
      modalName: e.currentTarget.dataset.target
    })
    console.log(this.data.getbookid)
    console.log(this.data.modalName)
    // this.getAccountBookDetails()
  },

  hideModal() {
    this.setData({
      modalName: '',
    })
  },
  //ListTouch触摸开始
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
})