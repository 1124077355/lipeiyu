//xf.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    moteData: [], // 中继数据
    listAnimation: {} // 列表动画
  },

  // 页面加载
  onLoad: function () {
    var _this = this;
    wx.request({
      url: app.serverUrl + "baseWeChat/getApDetail",
      method: 'GET',
      success: function (res) {
        if (res.data) {
          // 为每一个学年设置是否显示当前学年学费详情的标志open, false表示不显示
          var list = res.data.reverse();
          console.log("000 "+list)
          for (var i = 0, len = list.length; i < len; ++i) {
            list[i].open = false;
          }
          list[0].open = false;
          _this.setData({
            remind: '',
            moteData: list
          });
        } else {
          _this.setData({
            remind: res.data.message || '未知错误'
          });
        }

      },

      fail: function (res) {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
      }
    });
  },

  // 展示中继详情
  slideDetail: function (e) {

    var id = e.currentTarget.id,
      list = this.data.moteData;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].uid == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      moteData: list
    });
  }
});