// pages/addaccount/addaccount.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    TabCur: 0,
    way: ['支出', '收入'],
    scrollLeft: 0,
    gridCol: 4,
    skin: false,
    token: '',
    url: '',
    accounttype: '',
    date: '点击选择',
    index: null,
    imgList: [],
    imgKey: [],
    addjizhang: '',
    addshifu: '',
    addtarget: '',
    // adddate:'',
    addremarks: '',
    accountId: [],
    accountList: [],
    // picker:[],
    picker: '',
    pickerIndex: '',
    bookId: '',
    typeId:''
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
  gridchange: function(e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function(e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function(e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  //获取支出收入类别
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
  //获得账本信息
  getData: function(e) {
    //获得token
    // console.log(this.data.token)
    var url = this.data.url
    var token = this.data.token
    wx.request({
      url: url + '/api/account?token=' + token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        console.log(e.data)

        var dataList = e.data.data;
        console.log(dataList)
        var accountbookId = []
        for (let i in dataList) {
          this.data.accountList.push(dataList[i].name)
          accountbookId.push(dataList[i].id)
        }

        this.setData({
          picker: this.data.accountList,
          accountId: accountbookId
        })
        console.log(this.data.picker)
        console.log(this.data.accountId)
      }

    })

  },
  //获取picker索引值
  PickerChange: function(e) {
    this.setData({
      pickerIndex: e.detail.value
    })
    // console.log(this.data.pickerIndex)
    this.setAccountId()
  },
  //赋值accountId
  setAccountId: function() {
    var accountIndex = this.data.pickerIndex
    var arrId = this.data.accountId
    this.setData({
      bookId: arrId[accountIndex]
    })
    // for(var i in arrId){
    console.log(this.data.bookId)
    // }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      navH: app.globalData.navHeight,
      url: app.globalData.url,
      // accontId:app.globalData.accountId
    })
    // console.log(this.data.accountId)
    app.getToken((token) => {
      if(token!=null){
        that.setData({
          token: token
        })
        this.getType()
        this.getData()
      }else{
        that.setData({
          token: ''
        })
        return
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

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      typeId: e.currentTarget.dataset.typeid
    })
    // console.log(this.data.typeId)
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  chooseImage() {
    wx.chooseImage({
      count: 4, //默认9
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
              var imgsourse = JSON.parse(e.data)
              // imgsourse.data.file.fileKey
              var keyList = []
              keyList.push(imgsourse.data.file.fileKey)
              this.setData({
                imgKey: keyList
              })
              // console.log(this.data.imgKey)
            }
          })
        }
      }
    });
  },
  //获得记账金额
  jizhang: function(e) {
    this.setData({
      addjizhang: e.detail.value
    })
  },

  //获得实付金额
  shifu: function(e) {
    this.setData({
      addshifu: e.detail.value
    })
  },

  //获得交易对象
  addTarget: function(e) {
    this.setData({
      addtarget: e.detail.value
    })
  },

  //获得记账时间
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  //获得账本备注
  remarks: function(e) {
    this.setData({
      addremarks: e.detail.value
    })
  },

  //添加记账
  uploadAccountBook() {
    var token = this.data.token
    var url = this.data.url
    var accountid = app.globalData.accontId
    // console.log(accountid)
    wx.showLoading({
      title: '添加中...',
      mask:'true'
    })
    wx.request({
      url: url + '/api/record/create?token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        total_money: this.data.addjizhang,
        money: this.data.addshifu,
        account_id: this.data.bookId,
        category_id: this.data.typeId,
        date: this.data.date,
        company_name: this.data.addtarget,
        remark: this.data.addremarks,
        image_keys: this.data.imgKey
      },
      success:(e)=>{
        console.log(e.data)
        if(e.data.status==true){
          setTimeout(()=>{
            wx.hideLoading()
            this.setData({
              modalName: ''
            })
          },3000)
          
        }
        // this.onShow()
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '尊敬的用户',
      content: '确定要删除吗？',
      cancelText: '再想想',
      confirmText: '删除',
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
})