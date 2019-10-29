//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    modalName: '',
    token: '',
    data: {
      year: '2019',
      month: '10',
      show: 0
    },
    accountList: [],
    accountListId: '',
    pageSource: '',
    accountTotalOut: '',
    accountTotalIn: '',
    url: '',
    accountId: '',
    returnSource: '',
    index: '',
    imgList: [],
    imgKey: [],
    addjizhang: '',
    addshifu: '',
    addtarget: '',
    adddate: '',
    addremarks: '',
    item_id: '',
    getToken:'',
    accountbookId:''

  },
  //获得记账金额
  jizhang: function(e) {
    this.setData({
      addjizhang: e.detail.value
    })
    console.log(this.data.addjizhang)
  },

  //获得实付金额
  shifu: function(e) {
    this.setData({
      addshifu: e.detail.value
    })
    console.log(this.data.addshifu)
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
      adddate: e.detail.value
    })
  },

  //获得账本备注
  remarks: function(e) {
    this.setData({
      addremarks: e.detail.value
    })
  },

  //获得所有账簿
  getAccountBook:function(e){
    var token=this.data.token
    var url=this.data.url
    wx.request({
      url: url+'/api/book?token='+token,
      method:'get',
      success:(e)=>{
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
        this.getAccountDetails()
        this.getInOut()
      }
    })
  },

  //获得页面加载数据
  getData: function(e) {
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
          accountListId:arr[0].account_id
        })
        console.log(this.data.accountList)
        console.log(this.data.accountListId)
        this.getAccountDetails()
      }
    })
  },

  //获得记账明细-1
  getAccountDetails: function(e) {
    console.log(this.data.accountListId)
    let token = this.data.token
    var url = this.data.url
    wx.request({
      url: url + '/api/record/real?token=' + token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        // account_id: this.data.accountListId
      },
      success: (e) => {
        // console.log(e)
        console.log(e.data.data.list)
        this.setData({
          pageSource: e.data.data.list
        })
        this.onShow()
      }
    })
    // console.log(this.data.accountId)
  },

  //获取记账明细-2
  getAccountDetailsSec: function(e) {
    // var that = this;

    // console.log(e.currentTarget.dataset.accountid)

    // var account_id = e.currentTarget.dataset.accountid
    // this.setData({
    //   accountListId: account_id
    // })
    // console.log(this.data.accountListId)
    // let accountid = this.data.accountId
    var bookid = e.currentTarget.dataset.bookid
    let token = this.data.token
    var url = this.data.url
    console.log(bookid)
    wx.request({
      url: url + '/api/book/set-default?token=' + token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        book_id:bookid
      },
      success: (e) => {
        console.log(e.data)
        // console.log(e.data.data.list)
        // this.setData({
        //   pageSource: e.data.data.list
        // })
        // this.onShow()
        // this.
          this.getAccountDetails()

      }
    })
    // console.log(this.data.pageSource)
  },

  //  获得收支总额
  getAccountTotal: function(e) {
    let token = this.data.token
    var url = this.data.url
    wx.request({
      url: url + '/api/record/account?token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        begin_date: '',
        end_date: '',
        type: 3,
        category_id: '',
        company_name: '',
        excel: 0,
        page: 1
      },
      success: (e) => {
        console.log(e.data)
      }
    })
  },
  
  //页面加载获得数据
  onLoad: function(e) {
    this.setData({
      navH: app.globalData.navHeight,
      url: app.globalData.url,
    })
    app.getToken((token) => {
      console.log(token)
      if(token!=null){
        this.setData({
          token:token
        })
        // this.getData()
        this.getAccountBook()
        // this.getInOut()
      }else{
        this.setData({
          token: ''
        })
        return
      }
    })


  },
  onShow: function() {
    // this.getInOut()
    app.getToken((token) => {
      console.log(token)
      if (token != null) {
        this.setData({
          token: token
        })
        // this.getData()
        // this.getAccountBook()
        this.getInOut()
      } else {
        this.setData({
          token: ''
        })
        return
      }
    })
  },
  // 返回上一页

  navBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  navHome: function() {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  showModal() {
    this.setData({
      modalName: 'DrawerModalL',

    })
  },
  showModal2: function(e) {
    this.setData({
      accountId: e.currentTarget.dataset.accountid,
      accountbookId: e.currentTarget.dataset.accountbook
    })
    console.log(this.data.accountId)
    console.log(this.data.accountbookId)
    this.getAccountBookDetails()
  },

  //获得记账单明细
  getAccountBookDetails: function(e) {
    console.log(this.data.accountId)
    var url = this.data.url
    var token = this.data.token
    var id = this.data.accountId
    wx.request({
      url: url + '/api/record/detail?id=' + id + '&token=' + token,
      method: 'get',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        console.log(e.data)
        var source = e.data.data
        var imgs = e.data.data.items[0].images
        var item_id = e.data.data.items[0].id
        var imgslist = []
        console.log(item_id)
        for (var i in imgs) {
          imgslist.push(imgs[i].original)
        }
        this.setData({
          returnSource: source,
          modalName: 'bottomModal',
          imgList: imgslist,
          item_id: item_id
        })
        console.log(this.data.returnSource)
      }
    })
  },

  //首页收入支出数据 
  getInOut: function(e) {
    console.log(this.data.token)
    var token = this.data.token
    var url = this.data.url
    wx.request({
      url: url + '/api/view/home?token=' + token,
      method: 'get',
      data: {
        page: 1
      },
      success: (e) => {
        console.log(e.data)
        var account = e.data.data.account
        var accountout = account.out
        var accountO = accountout.split('.')
        var accountin = account.in
        var accountI = accountin.split('.')
        this.setData({
          accountTotalOut: accountO,
          accountTotalIn: accountI
        })
      }
    })
  },
  deleteAcoount:function(e){
    wx.showModal({
      title: '尊敬的用户',
      content: '确认删除吗',
      success:(e)=>{
        if(e.confirm==true){
          this.deleteAcoount1()
        }else if(e.cancel==true){
          this.onLoad()
        }
      }
    })
  },

  //删除记账
  deleteAcoount1: function(e) {
    console.log(this.data.accountId)
    var url = this.data.url
    var token = this.data.token
    var id = this.data.accountId
    wx.request({
      url: url + '/api/record/delete?id=' + id + '&token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (e) => {
        console.log(e.data)
        if (e.data.status == true) {
          this.setData({
            modalName: '',
          })
          this.onLoad()
        }

      }
    })
  },
  updateAccountBook:function(e){
    var total_money=this.data.addjizhang //记账金额
    var company_name= this.data.addtarget //交易对象
    var remark= this.data.addremarks
    if (total_money==''){
      wx.showModal({
        content: '记账金额为空',
        showCancel:false
      })
    } else if (company_name==''){
      wx.showModal({
        content: '交易对象为空',
        showCancel: false
      })
    } else if (remark==''){
      wx.showModal({
        content: '备注为空',
        showCancel: false
      })
    }else{
      this.updateAccountBook1()
    }
  },

  //修改记账 step-1
  updateAccountBook1: function(e) {
    var url = this.data.url
    var token = this.data.token
    var id = this.data.accountId
    wx.showLoading({
      title: '修改中...',
      mask:true
    })
    wx.request({
      url: url + '/api/record/update?id=' + id + '&token=' + token,
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        total_money: this.data.addjizhang, //记账金额
        company_name: this.data.addtarget, //交易对象
        remark: this.data.addremarks //备注
      },
      success: (e) => {
        console.log(e.data)
        if(e.data.status==true){
          wx.hideLoading()
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000,
            success:(e)=>{
              this.setData({
                modalName: ''
              })
              this.onLoad()
            }
          })
        }else{
          wx.hideLoading()
          wx.showModal({
            title: '修改失败',
            content: e.data.data,
            showCancel:false
          })
        }
      }
    })
  },
  uploadAccountBook:function(e){
   var money=this.data.addshifu
    var date= this.data.adddate
   if(money==''){
     wx.showModal({
       content: '实付金额为空',
       showCancel:false
     })
   }else if(date==''){
     wx.showModal({
       content: '日期未选',
       showCancel: false
     })
   }else{
     this.uploadAccountBook1()
   }
  },

  //修改记账 step-2
  uploadAccountBook1: function(e) {
    var url = this.data.url
    var token = this.data.token
    // var account_id = this.data.accountListId
    var item_id = this.data.item_id
    console.log(item_id)
    // console.log(account_id)
    wx.showLoading({
      title: '修改中...',
      mask: 'true'
    })
    wx.request({
      url: url + '/api/record/item/update?itemId=' + item_id + '&token=' + token,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        money:this.data.addshifu,
        account_id: this.data.accountbookId,
        date :this.data.adddate
      },
      success:(e)=>{
        console.log(e.data)
        if(e.data.status==true){
            wx.hideLoading()
            wx.showToast({
              title: '点击确认完成',
              icon: 'success',
              duration: 3000,
            })
        }else if(e.data.data!='修改记账单条记录成功'){
          wx.hideLoading()
          wx.showModal({
            title: '修改实付金额失败',
            content: e.data.data,
            showCancel:false
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

  //选择图片
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
  hideModal() {
    this.setData({
      modalName: '',
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var datastring = e.detail.value;
    var datearray = datastring.split('-');

    this.setData({
      data: {
        year: datearray[0],
        month: datearray[1]
      }
    })
    // console.log(datearray[0])
  }
})