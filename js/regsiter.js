$(function(){
  getImgCode(telephone='')
  $('.btn-loading').hide();
  var codeTimer = null; // 每隔 60s可以获取验证码
  $('.wrap-register').off('click', '.block-btn').on('click', '.block-btn', function(){
      // 提交
      var telephone = $('#telephone').val().trim();
      var telephoneResult = checkTelNumber(telephone);
      var password = $('#password').val().trim();
      var rePassword = $('#rePassword').val().trim();
      var _this = $(this);
      // 校验手机号非空
      if(!telephoneResult){
          return;
      }
      // 校验图片验证码非空
      var imgCode = $('#imgCode').val().trim();
      var imgCodeResult = checkImgCodeVal(imgCode);
      if(!imgCodeResult){
          return;
      }
      // 校验手机验证码非空
      var code = $('#verifyCode').val().trim();
      if(!code){
          $('#verifyCode').addClass('error').focus(function(){
              $(this).removeClass('error').siblings('.error-txt').text('');
          }).siblings('.error-txt').text('请输入验证码');
          return;
      }
      else {
          $('#verifyCode').siblings('.error-txt').text('');
      }
      // 校验密码非空
      if(!password){
          $('#password').addClass('error').focus(function(){
              $(this).removeClass('error').siblings('.error-txt').text('');
          }).siblings('.error-txt').text('请设置登录密码');
          return;
      }
      else {
          $('#password').siblings('.error-txt').text('');
      }
      var pwdReg=/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*.,@()\/?<>{}''"";:]+$)[\da-zA-Z!#$%^&*.,@()\/?<>{}''"";:]{6,18}$/;
      // 校验密码格式是否正确，正则为：6-18位字母和数字，区分大小写
      if(!pwdReg.test(password)){
          $('#password').addClass('error').focus(function(){
              $(this).removeClass('error').siblings('.error-txt').text('');
          }).siblings('.error-txt').text('6-18位，由字母（区分大小写）、数字或者英文字符组成');
          return;
      }
      else {
          $('#password').siblings('.error-txt').text('');
      }
      // 校验重复密码非空
      if(!rePassword){
          $('#rePassword').addClass('error').focus(function(){
              $(this).removeClass('error').siblings('.error-txt').text('');
          }).siblings('.error-txt').text('请再次输入你的密码');
          return;
      }
      else {
          $('#rePassword').siblings('.error-txt').text('');
      }
      // 校验设置密码与重复密码是否一致
      if(password!==rePassword){
          $('#rePassword').addClass('error').focus(function(){
              $(this).removeClass('error').siblings('.error-txt').text('');
          }).siblings('.error-txt').text('两次输入的密码不一致');
          return;
      }
      else {
          $('#rePassword').siblings('.error-txt').text('');
      }

      // 保存注册信息
      var info = {
          'telephone': telephone,
          'code': code,
          'password': password
      }
      $('.btn-loading').show();
      _this.attr('disabled', 'disabled');
      $.post("https://xdymember.dgg188.cn/login/register_do.html",info,function (result) {
          if(result.code==200){
              guagua.layer.success(result.msg)
              window.location.href = "/login.html";
          }else{

              $('.btn-loading').hide();
              getImgCode(telephone);
              _this.removeAttr('disabled');
              guagua.layer.danger(result.msg);
              return;
          }
      })
  }).off('click', '.change-picture').on('click', '.change-picture', function(){
      // 【此处编写代码】 更新图形验证码
      getImgCode(telephone);
  }).off('click', '.code-btn').on('click', '.code-btn', function(){
      if(!codeTimer){
          // 校验手机号
          // 手机验证码
          var telephone = $('#telephone').val().trim();
          var telephoneResult = checkTelNumber(telephone);
          var imgKey = $("#imageCode").attr('data-id');
          if(!telephoneResult){
              return;
          }
          var imgCode = $('#imgCode').val().trim();
          var imgCodeResult = checkImgCodeVal(imgCode);
          // 校验图片验证码非空
          if(!imgCodeResult){
              return;
          }
          checkImgCode(telephone,imgCode,codeTimer,imgKey)
      }
  });
});
// 手机号码校验
function checkTelNumber(telephone){
  var phoneReg = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/i; //手机号正则表达式
  var telephone = telephone || $('#telephone').val().trim();
  var isValidTelNumber = phoneReg.test(telephone)
  if (telephone && isValidTelNumber){
      $('#telephone').siblings('.pass-icon').show().siblings('.error-txt').text('');
      return true
  } else {
      var warnText = telephone ? '请输入有效的手机号' : '请输入手机号';
      var passIconDom = $('#telephone').siblings('.pass-icon');
      $('#telephone').addClass('error').focus(function(){
          $(this).removeClass('error').siblings('.error-txt').text('');
      }).siblings('.error-txt').text(warnText);
      if (passIconDom.css('display') !== 'none') {
          passIconDom.hide()
      }
      return false
  }
}
// 图形验证码验证
function checkImgCodeVal(imgCode){
  var imgCode = imgCode || $('#imgCode').val().trim();
  if(!imgCode || imgCode.length < 4){
      $('#imgCode').addClass('error').focus(function(){
          $(this).removeClass('error').siblings('.error-txt').text('');
      }).siblings('.error-txt').text('图形验证码错误');
      return false
  }
  else {
      $('#imgCode').siblings('.error-txt').text('');
      return true
  }
}
//请求图形验证码接口
function getImgCode(telephone){
  $.get("/public_controller/findimgcode.html?mobile="+telephone,function (result) {
      if(result.code==200){
          $("#imageCode").attr('src',result.data.codeData);
          $("#imageCode").attr('data-id',result.data.imgKey);
          $('.img-code-box .error-txt').text('');
      }else{
          $('.img-code-box .error-txt').text(result.msg);
      }
  })
}
//  获取手机验证码
function checkImgCode(telephone,imgCode,codeTimer,imgKey){
  $.get("/public_controller/sendsms.html?telephone="+telephone+'&imgCode='+imgCode+'&smsType=SMS_REGISTER_PC'+'&imgKey='+imgKey,function (result) {
      if(result.code==200){
          var count = 59;
          codeTimer = setInterval(function(){
              if(count===0){
                  $('.code-btn').text('获取验证码').removeClass('disabled');
                  clearInterval(codeTimer);
                  codeTimer = null;
              }
              else {
                  $('.code-btn').addClass('disabled').text('重新发送（'+count+'）');
              }
              count--;
          }, 1000);
          // $('.imgcode-popup').hide();
      }else if(result.code==201){
          var count = result.data.time;
          codeTimer = setInterval(function(){
              if(count===0){
                  $('.code-btn').text('获取验证码').removeClass('disabled');
                  clearInterval(codeTimer);
                  codeTimer = null;
              }
              else {
                  $('.code-btn').addClass('disabled').text('重新发送（'+count+'）');
              }
              count--;
          }, 1000);
      }else{
          getImgCode(telephone);
          guagua.layer.danger(result.msg)
      }
  });
}