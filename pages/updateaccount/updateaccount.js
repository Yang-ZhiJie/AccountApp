// pages/accountbook/accountbook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    url: '',
    index: '',
    picker: ['请选择', '现金', '银行', '支付平台', '其它'],
    accountname: '',
    accountmoney: '',
    pickerId: '',
    accountremarks: '',
    oldname:'',
    oldmoney:'',
    oldtype:'',
    oldremarks:'',
    accountid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var oldAccount = wx.getStorageSync('accountSource');
    console.log(oldAccount)
    // var oldname= oldAccount.name;
    // 
    that.setData({
      navH: app.globalData.navHeight,
      url: app.globalData.url,
      accountid:oldAccount.id,
      oldname: oldAccount.name,
      oldmoney:oldAccount.initial_balance,
      oldtype:oldAccount.type,
      oldremarks:oldAccount.remark
    })
    console.log(this.data.accountid)
    
    // console.log(this.data.url)
  },
  //获得picker索引值
  pickerChange: function (e) {
    this.setData({
      pickerId: e.detail.value,
      index: e.detail.value
    })
  },

  //获取账本名称
  accountName: function (e) {
    this.setData({
      accountname: e.detail.value
    })
  },

  //获得账本初始金额
  accountMoney: function (e) {
    this.setData({
      accountmoney: e.detail.value
    })
  },

  //获得账本备注信息
  accountRemarks: function (e) {
    this.setData({
      accountremarks: e.detail.value
    })
  },
  updateAccount: function (e) {
    var token = this.data.token
    var url = this.data.url
    var id=this.data.accountid
    wx.request({
      url: url + '/api/account/update?id='+id+'&token='+token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        name: this.data.accountname,
        type: this.data.pickerId,
        // initial_balance: this.data.accountmoney,
        remark: this.data.accountremarks,
        sort: 10
      },
      success: (e) => {
        console.log(e.data)
        wx.navigateBack({
          url:'/pages/accountsets/account'
        })
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
    app.getToken((token) => {
      console.log(token)
      this.setData({
        token: token
      })
      // this.getData()
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
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
})