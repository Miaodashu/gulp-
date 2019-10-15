/*//------------------------- 数据增量增长的特效 -----------------------------*/
var flag = false
var $numberBox = $('.hot-product')
var $boxTop = $numberBox.offset().top
$(window).scroll( function() { 
    if ($(window).scrollTop() >= $boxTop - 100) {
        // 在1500ms内完成 总时间 $(window).scrollTop() >= 10 && $(window).scrollTop() < 1000
        // 每一次数字变化的周期是10ms
        // 就是说一共会变化150次
        // 每一次加的数字就是总的数字/次数150
        if (!flag) {
          flag = true
          $('.number').each(function () {
            var e = $(this)
            var num = e.attr('data-num') * 1
            var count = num / 30
            var n = 0
            var timer = setInterval(function () {
              n += count
              e.text(n.toFixed(0))
              if (e.text() >= num) {
                clearInterval(timer)
                e.text(num)
              }
            }, 50);
          })
        }
      }
 } );
 /*//------------------------- 数据增量增长的特效 end -----------------------------*/

/**优惠券点击领取 */
var $coupon = $('.coupon-btn')
console.log($('.coupon-li').not( $(".use")));

$('.coupon-li').hover(function(){
    if ($(this).hasClass('use')) {
        return
    } else {
        $(this).addClass('hover')
    }
    
}, function(){
    $(this).removeClass('hover')
})
$coupon.click(function(){
    console.log($('.coupon-li').not( $(".use")));
    $(this).parents('.coupon-li').addClass('use')
    $(this).text('已领取')
})