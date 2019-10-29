// pages/accounttype/accounttype.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    way: ['支出', '收入'],
    token: '',
    url: '',
    accounttype: '',
    scrollLeft: 0,
    typeid: '',
    typenum: '',
    typename: ''
  },
  delType:function(e){
    this.setData({
      typeid: e.currentTarget.dataset.typeid
    })
    wx.showModal({
      title: '尊敬的用户',
      content: '确认删除吗',
      success:(e)=>{
        if(e.confirm==true){
          this.delType1()
        }else if(e.cancel==true){
          this.onLoad()
        }
      }
    })
  },

  //删除类别
  delType1: function(e) {
    
    var token = this.data.token
    var url = this.data.url
    var id = this.data.typeid
    wx.request({
      url: url + '/api/category/delete?id=' + id + '&token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        console.log(e.data)
        if (e.data.status == true) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          this.onLoad()
        }

      }
    })
  },

  getType: function() {
    var token = this.data.token
    var url = this.data.url
    // console.log(url)
    // console.log(token)
    wx.request({
      url: url + '/api/category?token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        type: 2,
        dataType: 1
      },
      success: (e) => {
        // console.log(e.data)
        var type = e.data.data
        var accountType = []
        for (var i in type) {
          accountType.push(type[i])
        }
        this.setData({
          accounttype: accountType
        })
        // console.log(this.data.accounttype)
      }
    })
  },

  //获得类型
  typenum: function(e) {
    this.setData({
      typenum: e.detail.value
    })
    console.log(this.data.typenum)
  },
  //获取类别名
  typename: function(e) {
    this.setData({
      typename: e.detail.value
    })
  },

  //添加类别
  addType: function(e) {
    var token = this.data.token
    var url = this.data.url
    wx.request({
      url: url + '/api/category/create?token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        parent_id: 0,
        type: this.data.typenum,
        name: this.data.typename,
        sort: 10
      },
      success: (e) => {
        console.log(e.data)
        if (e.data.status == true) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            modalName: ''
          })
          this.onLoad()
        }
      }
    })
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    var selectid = this.data.TabCur;
    var token = this.data.token
    var url = this.data.url
    if (selectid + 1 == 1) {
      wx.request({
        url: url + '/api/category?token=' + token,
        method: 'post',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          type: 2,
          dataType: 1
        },
        success: (e) => {
          // console.log(e.data)
          var type = e.data.data
          var accountType = []
          for (var i in type) {
            accountType.push(type[i])
          }
          this.setData({
            accounttype: accountType
          })
          console.log(this.data.accounttype)
        }
      })
    } else if (selectid + 1 == 2) {
      wx.request({
        url: url + '/api/category?token=' + token,
        method: 'post',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          type: 1,
          dataType: 1
        },
        success: (e) => {
          // console.log(e.data)
          var type = e.data.data
          var accountType = []
          for (var i in type) {
            accountType.push(type[i])
          }
          this.setData({
            accounttype: accountType
          })
          console.log(this.data.accounttype)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      url: app.globalData.url
    })
    app.getToken((token) => {
      if(token!=null){
        this.setData({
          token: token
        })
        this.getType()
      }else{
        this.setData({
          token: ''
        })
        return
      }

    })
  },

  //显示隐藏modal
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
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