$(function(){
    // 鍏煎IE9涓嬬殑placeholder
    function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
    }
    if(!placeholderSupport()){   // 鍒ゆ柇娴忚鍣ㄦ槸鍚︽敮鎸� placeholder
        $(".register-form [placeholder],.login-form [placeholder],.ipt-wrap [placeholder]").each(function(){
            var _this = $(this);
            var _type = $(_this)[0].localName;
            var left = _this.css("padding-left");
            var _top = _this.css("padding-top");
            if(_type == 'input'){
              _this.parent().append('<pre class="placeholder" data-type="placeholder" style="left: ' + left + '">' + _this.attr("placeholder") + '</pre>');
            }else{
              _this.parent().append('<pre class="texplace" data-type="placeholder" style="left: ' + left + ';top:'+_top+'">' + _this.attr("placeholder") + '</pre>');
            }
            if(_this.val() != ""){
                _this.parent().find("pre.placeholder,pre.texplace").hide();
            }
            else{
                _this.parent().find("pre.placeholder,pre.texplace").show();
            }
        }).on("focus", function(){
            $(this).parent().find("pre.placeholder,pre.texplace").hide();
        }).on("blur", function(){
            var _this = $(this);
            if(_this.val() != ""){
                _this.parent().find("pre.placeholder,pre.texplace").hide();
            }
            else{
                _this.parent().find("pre.placeholder,pre.texplace").show();
            }
        });
        // 鐐瑰嚮琛ㄧずplaceholder鐨勬爣绛剧浉褰撲簬瑙﹀彂input
        $("pre.placeholder,pre.texplace").on("click", function(){
            $(this).hide();
            $(this).siblings("[placeholder]").trigger("click");
            $(this).siblings("[placeholder]").trigger("focus");
        });
    }
  })