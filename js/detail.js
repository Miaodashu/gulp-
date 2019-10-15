$(function ($) {
  // 收藏 点击收藏 icon切换空心实心
  $('.shou-cang').click(function () {
    // $(this).children('.iconfont').attr()
    if ($(this).children('.iconfont').attr('class') == 'iconfont iconshoucang1') {
      $(this).children('.iconfont').attr('class', 'iconfont iconshoucang')
    } else {
      $(this).children('.iconfont').attr('class', 'iconfont iconshoucang1')
    }
  })
  // 关注 icon切换空心实心
  $('.guan-zhu').click(function () {
    if ($(this).children('.iconfont').attr('class') == 'iconfont icongz_s') {
      $(this).children('.iconfont').attr('class', 'iconfont icongz_n')
    } else {
      $(this).children('.iconfont').attr('class', 'iconfont icongz_s')
    }
  })
  // 购买数量事件   增加
  $('.operation').on('click', '.add', function () {
    console.log($('.my-input').val())
    $('.my-input').val(function () {
      if (this.value >= 99) {
        // console.log('不能超过五', this.value)
        layer.open({
          title: '提示'
          , content: '最大购买数为99个'
        });
        return this.value
      } else {
        return Number(this.value) + 1
      }
    })
  })
  // 购买数量事件   减少
  $('.operation').on('click', '.sub', function () {
    console.log($('.my-input').val())
    $('.my-input').val(function () {
      if (this.value == 0) {
        // console.log('不能超过五', this.value)
        // layer.open({
        //     title: '提示'
        //     ,content: '最大购买数为99个'
        //   }); 
        return 0
      } else {
        return Number(this.value) - 1
      }
    })
  })
  // 购买数量限制  最大为99 最小为1 不为数字让它默认为1
  $('.my-input').change(function () {
    if ($(this).val() > 99) {
      layer.msg('最大购买数为99个');
      $(this).val(99)
    } else if ($(this).val() < 0) {
      $(this).val(1)
    } else if (!Number($(this).val())) {
      $(this).val(1)
    }
    console.log($(this).val())
  });

  //============ 更多优惠卷选择事件==========//
  // 鼠标移入更多优惠卷事件
  $('.coupons-more').hover(
    function () {
      $(this).addClass('show')
      $('.coupons-more .iconfont').addClass('iconnav_ic_pointzk').removeClass('iconnav_ic_pointnormal')
    },
    function () {
      $(this).removeClass('show')
      $('.coupons-more .iconfont').removeClass('iconnav_ic_pointzk').addClass('iconnav_ic_pointnormal')
    }
  );
  // 更多优惠卷下拉列表 点击领取优惠券
  // 优惠卷点击事件  已领取未领取
  $('.coupons-list').on('click', '.coupons-item', function(){
    $(this).addClass('active')
  })
  $('.coupons-ul').on('click', '.coupons-li .coupons-btn', function () {
    $(this).parent('.coupons-li').addClass('hot')
    $(this).text('已领取')
  })
  // 选择sku 属性等事件
  $('.check-list').on("click", '.check-item', function () {
    // 排除禁用按钮
    if ($(this).attr('class').indexOf('disabled') < 0) {
      $(this).siblings().removeClass('hot')
      $(this).addClass('hot')
    }
  });
  /* ================ 附加情况选下拉选择事件========== */
  $('.addition').on("click", '.addition-valueBox', function (e) {
    e.stopPropagation();
    // 判断下拉面板中是否有选中的，如果有 点击vuleBox 即边框内的文字就取消已经勾选的并去掉选中样式, 并将文字提示回复为第一个
    // 如果没有就默认选中第一个；
    if($(this).parent('.addition-check-item').attr('class').indexOf('hot') > 0) {
      console.log('存在 hot')
      $(this).parent('.addition-check-item').removeClass('hot').removeClass('show')
      $(this).next(".addition-card").children(".select-item").children('input').prop('checked', false)
      let oneInput = $(this).next(".addition-card").children(".select-item")[0]
      let text = $(oneInput).children('span').text()
      $(this).children('span.select-value').text(text)
    } else {
      console.log('不存在 hot')
      let oneInput = $(this).next(".addition-card").children(".select-item")[0]
      let text = $(oneInput).children('span').text()
      $(oneInput).children('input').prop('checked', true)
      $(this).children('span.select-value').text(text)
      $(this).parent('.addition-check-item').addClass('hot').addClass('show')
    }
  });
  // 鼠标移入显示隐藏下拉框
  $(".addition .addition-check-item").hover(
    function () {
      $(this).addClass('show')
      $(this).children('.addition-valueBox').children(".iconfont").addClass('iconshishangjiantou-').removeClass('iconxiajiantou1');
    },
    function () {
      $(this).removeClass('show')
      $(this).children('.addition-valueBox').children(".iconfont").removeClass('iconshishangjiantou-').addClass('iconxiajiantou1');
    }
  );
  /**--==================================== */
  // 下拉框内的单选按钮选择事件 
  $('.addition-card').on('click', '.select-item', function () {
    console.log('选中的radio的值', $(this).children('input').val())
    $(this).children('input').prop('checked', true).end().siblings(".select-item").children('input').prop('checked', false)
    let text = $(this).children('span').text()
    $(this).parents('.addition-check-item').children('.addition-valueBox').children('span.select-value').text(text)
    $(this).parents('.addition-check-item').addClass('hot').removeClass('show').children(".iconfont").removeClass('iconshishangjiantou-').addClass('iconxiajiantou1');
    
  })
  // 导航条下拉框选择事件
  $(".selecet-box").hover(
    function () {
      $(this).children(".select-card").removeClass("hidden");
      $(this).children(".iconfont").addClass('iconshishangjiantou-').removeClass('iconxiajiantou1');
      $(this).addClass('show')
    },
    function () {
      $(this).children(".select-card").addClass("hidden");
      $(this).children(".iconfont").removeClass('iconshishangjiantou-').addClass('iconxiajiantou1');
      $(this).removeClass('show')
    }
  );
  $('.select-card').on('click', '.select-item', function () {
    let value = $(this, 'a').text()
    $(this).parents(".select-card").addClass("hidden");
    $(this).parents('.selecet-box').children('span.select-value').text(value)
  })
  // 服务标签提示
  $('.serve-list').on('mouseenter', '.serve-item', function () {
    var that = this;
    layer.tips(`<p style='color:#565656'>提示:</p><span style='color:#878787'>这里显示的是提示内容，鼠标移入之后急速退款文字变成链接色同时显示这个浮窗，具体内容在这个横向范围内上下伸缩边框即可</span>`, that, { tips: [3, '#fff'] });//弹出框加回调函数
  });
});