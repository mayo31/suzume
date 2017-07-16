//牌姿リセット
function resetHaishi(){
  $('#haishi').removeAttr('class');
  $('#haishi').html('');
};

//牌姿の中でdata-haiが空の牌を探す
function currentHai(){
  if($('#haishi ul:not([data-mentsu="atama"])').length > 3){$('#mentsu-input button:not(#atama)').attr('class', 'disabled')}
  else{$('#mentsu-input button:not(#atama)').removeClass('disabled')};
  
  if(! $('#haishi [data-mentsu="atama"]').length){$('#atama').removeClass('disabled')}
  
  $('#currentHai').removeAttr('id');
  var hList = $('#haishi [data-hai]');
  var len = hList.length;
  for (var i = 0; i < len; i++) {
    if(hList[i].dataset.hai==''){
      hList[i].id = 'currentHai';
      break;
    }
  };
  if($('#currentHai').is('[data-mentsu*="shuntsu"] li')){$('#keyboard [data-hai*="d0"]').attr('class', 'disabled')};
}

$(function(){
  

//面子削除・ドラ設定
  var dr = true;
  var re = false;
  var de = false;

  $('body').on('touchstart', '#haishi[class="mentsu-input"] li', function(e){
  	this.touchX = event.changedTouches[0].pageX;
  	this.touchY = event.changedTouches[0].pageY;
  });
  $('body').on('touchmove', '#haishi[class="mentsu-input"] li', function(e){
    e.stopPropagation();
  	moveX = this.touchX - event.changedTouches[0].pageX;
		moveY = this.touchY - event.changedTouches[0].pageY;
    if(moveX<1&&moveY<1) {
      $(this).parent().removeAttr('style');
      dr = true;
      re = false;
  	}
    else if(moveX<2&&moveY>70) {
      $(this).parent().css('transform', 'scale(0.4)');
      $(this).parent().css('opacity', '0.2');
      dr = false;
      re = true;
      de = true;
		}
    else {
      $(this).parent().removeAttr('style');
      dr = false;
      re = false;
    };
  });
  $('body').on('touchend', '#haishi[class="mentsu-input"] li', function(e){
    e.stopPropagation();
    if(re){
      if($('#key-enter.disabled').length>0){
        alertModal("順子の入力が途中です");
        $(this).parent().removeAttr('style');
      }
      else {
        $(this).parent().remove();
        keyRemove();
        currentHai();
      };
    }
    else if(de){
      de = false;
      return;
    }
    else if(dr){
      var dora = $(this).hasClass('dora');
      var red = $(this).hasClass('red');
      var five = '';
      if($(this).is('[data-hai*="d05"]')){five = -1} else {five = $(this).data('hai').indexOf('05')};
      var hai = $('#haishi [data-hai*="' + $(this).data('hai').slice($(this).data('hai').indexOf('0')-1,3) + '"]');
      if(five==-1&&!dora){
  		  hai.addClass('dora');
      }
      else if(five==-1&&dora){
        hai.removeClass('dora');
      }
      else if(five>-1&&!dora&&!red){
        hai.addClass('dora');
      }
      else if(five>-1&&dora&&!red){
        $(this).addClass('red');
        hai.removeClass('dora');
      }
      else if(five>-1&&!dora&&red){
        hai.addClass('dora');
      }
      else if(five>-1&&dora&&red){
        hai.removeClass('dora');
        hai.removeClass('red');
      };
      $(this).removeAttr('style');
    };
    dr = true;
    re = false;
  });
  //ほか
  $('body').on('touchstart', '#haishi:not([class="mentsu-input"]) li', function(e){
    this.touchX = event.changedTouches[0].pageX;
  	this.touchY = event.changedTouches[0].pageY;
  });
  $('body').on('touchmove', '#haishi:not([class="mentsu-input"]) li', function(e){
    e.stopPropagation();
  	moveX = this.touchX - event.changedTouches[0].pageX;
		moveY = this.touchY - event.changedTouches[0].pageY;
    if(moveX<1&&moveY<1) {
      $(this).parent().removeAttr('style');
      dr = true;
      re = false;
		}
    else {
      $(this).parent().removeAttr('style');
      dr = false;
      re = false;
    };
  });
  $('body').on('touchend', '#haishi:not([class="mentsu-input"]) li', function(e){
    e.stopPropagation();
    if(dr){
      var dora = $(this).hasClass('dora');
      var red = $(this).hasClass('red');
      var five = '';
      if($(this).is('[data-hai*="d05"]')){five = -1} else {five = $(this).data('hai').indexOf('05')};
      var hai = $('#haishi [data-hai*="' + $(this).data('hai').slice($(this).data('hai').indexOf('0')-1,3) + '"]');
      if(five==-1&&!dora){
    	  hai.addClass('dora');
      }
      else if(five==-1&&dora){
        hai.removeClass('dora');
      }
      else if(five>-1&&!dora&&!red){
        hai.addClass('dora');
      }
      else if(five>-1&&dora&&!red){
        $(this).addClass('red');
        hai.removeClass('dora');
      }
      else if(five>-1&&!dora&&red){
        hai.addClass('dora');
      }
      else if(five>-1&&dora&&red){
        hai.removeClass('dora');
        hai.removeClass('red');
      };
      $(this).removeAttr('style');
    };
    dr = true;
    re = false;
    currentHai();
  });

  //親子
  $('[data-settings="oyako"]').on('touchstart', function(e){
    e.preventDefault();
    $('[data-oyako]').attr('class', 'hover');
  });
  $('[data-settings="oyako"]').on('touchend', function(e){
    e.preventDefault();
    if($('[data-oyako]').data('oyako')=='oyako01'){
      $('[data-settings="oyako"]').html('<button data-oyako="oyako02">子</button>');
    }
    else {
      $('[data-settings="oyako"]').html('<button data-oyako="oyako01">親</button>');
    }
  });

  //和了
  $('[data-settings="hora"]').on('touchstart', function(e){
    e.preventDefault();
    $('[data-hora]').attr('class', 'hover');
  });
  $('[data-settings="hora"]').on('touchend', function(e){
    e.preventDefault();
    if($('[data-hora]').data('hora')=='hora01'){
      $('[data-settings="hora"]').html('<button data-hora="hora02">ツモ</button>');
    }
    else {
      $('[data-settings="hora"]').html('<button data-hora="hora01">ロン</button>');
    }
  });

  //場風
  $('[data-settings="bakaze"]').on('touchstart', function(e){
    e.preventDefault();
    $('[data-bakaze]').attr('class', 'hover');
  });
  $('[data-settings="bakaze"]').on('touchend', function(e){
    e.preventDefault();
    switch ($('[data-bakaze]').data('bakaze')){
      case 'bakaze01':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze02">場風：南</button>');break;
      case 'bakaze02':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze03">場風：西</button>');break;
      case 'bakaze03':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze04">場風：北</button>');break;
      case 'bakaze04':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze01">場風：東</button>');break;
    }
  });

  //自家
  $('[data-settings="jicha"]').on('touchstart', function(e){
    e.preventDefault();
    $('[data-jicha]').attr('class', 'hover');
  });
  $('[data-settings="jicha"]').on('touchend', function(e){
    e.preventDefault();
    switch ($('[data-jicha]').data('jicha')){
      case 'jicha01':$('[data-settings="jicha"]').html('<button data-jicha="jicha02">自家：南</button>');break;
      case 'jicha02':$('[data-settings="jicha"]').html('<button data-jicha="jicha03">自家：西</button>');break;
      case 'jicha03':$('[data-settings="jicha"]').html('<button data-jicha="jicha04">自家：北</button>');break;
      case 'jicha04':$('[data-settings="jicha"]').html('<button data-jicha="jicha01">自家：東</button>');break;
    }
  });

  //役設定
  $('[data-yaku="yaku00"]').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('[data-yaku="yaku00"]').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    $('#option-yaku').css('display', 'block');
  });

  $('[data-yaku]:not([data-yaku$="0"])').on('touchstart', function(e){
    $(this).addClass('hover');
    if($(this).prev().is(':checked')){
      $(this).prev().prop('checked', false);
    }
    else {
      $(this).prev().prop('checked', true);
    }
  });
  $('[data-yaku]:not([data-yaku$="0"])').on('touchmove', function(e){
    e.preventDefault();
  });
  $('[data-yaku]:not([data-yaku$="0"])').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    var arr = [];
    var domArr = [];
    $('[name="option-yaku"]').prop('disabled', false);
    if($('#option-yaku09').is(':checked')){
      $('li:nth-child(n+1):nth-child(-n+8) input').prop('checked', false).prop('disabled', true);
    } else if($('#option-yaku08').is(':checked')){
      $('li:nth-child(n+1):nth-child(-n+7) input').prop('checked', false).prop('disabled', true);
      $('li:nth-child(9) input').prop('checked', false).prop('disabled', true);
    } else {
      if($('#option-yaku07').is(':checked')){arr.push('04','05','06','08','09')};
      if($('#option-yaku06').is(':checked')){arr.push('04','05','07','08','09')};
      if($('#option-yaku05').is(':checked')){arr.push('04','06','07','08','09')};
      if($('#option-yaku04').is(':checked')){arr.push('05','06','07','08','09')};
      if($('#option-yaku03').is(':checked')){arr.push('08','09')};
      if($('#option-yaku02').is(':checked')){arr.push('01','08','09')};
      if($('#option-yaku01').is(':checked')){arr.push('02','08','09')};
      $.each(arr,function(i,value){
        var id = '#option-yaku' + arr[i];
        domArr.push($(id));
      });
      domArr = $.unique(domArr);
      $.each(domArr,function(i,value){
        domArr[i].prop('checked', false).prop('disabled', true);
      });
    }
  });
  $('[data-yaku]:not([data-yaku$="0"])').on('click', function(e){
    e.preventDefault();
  });

  //牌姿ベース選択
  $('[data-settings="haishi"] > [data-haishi*="haishi0"]').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('[data-settings="haishi"] > [data-haishi*="haishi0"]').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    $('#setting-haishi').css('display', 'block');
  });
    
  $('#haishi-list [data-haishi*="haishi0"]').on('touchstart', function(e){
    e.preventDefault();
    var d = $(this).data('haishi');
    if(d == 'haishi01'){
      if($('#haishi01').prop('checked')==false){
        $('#haishi').replaceWith('<div id="haishi" class="mentsu-input"></div>');
        $('#keyboard .disabled').removeAttr('class');
      }
      else {
        html = $('#haishi').html();
        $('#haishi').replaceWith('<div id="haishi" class="mentsu-input">' + html + '</div>');
      };
      $('#haishi01').replaceWith('<input type="radio" name="haishi" id="haishi01" checked>');
    }
    else if(d == 'haishi02'){
      $('#haishi02').replaceWith('<input type="radio" name="haishi" id="haishi02" checked>');
    }
    else if(d == 'haishi03'){
      $('#haishi03').replaceWith('<input type="radio" name="haishi" id="haishi03" checked>');
    }
    else if(d == 'haishi04'){
      $('#haishi04').replaceWith('<input type="radio" name="haishi" id="haishi04" checked>');
    };
  });
  $('#haishi-list [data-haishi*="haishi0"]').on('touchend', function(e){
    e.preventDefault();
    var dSet = $('[data-settings="haishi"] > [data-haishi*="haishi0"]');
    var d = $(this).data('haishi');
    //1対子4面子
    if(d == 'haishi01'){
      dSet.attr('data-haishi', 'haishi01').html('4面子1雀頭');
      $('#mentsu-input').css('display', 'block');
      $('#keyboard-area').css('display', 'block');
    }
    //七対子
    else if(d == 'haishi02'){
      dSet.attr('data-haishi', 'haishi02').html('七対子');
      resetHaishi();
      chitoi();
    }
    //国士無双
    else if(d == 'haishi03'){
      dSet.attr('data-haishi', 'haishi03').html('国士無双');
      resetHaishi();
      $('#haishi').addClass('kokushi');
      $('#kokushi-atama [data-hai]').removeAttr('class');
      kokushi();
    }
    //国士無双13面待ち
    else if(d == 'haishi04'){
      dSet.attr('data-haishi', 'haishi04').html('国士無双13門張');
      resetHaishi();
      $('#haishi').addClass('kokushi');
      kokushi13();
   };
   $(this).trigger('touched');
  });
  $('#haishi-list [data-haishi*="haishi0"]').on('touched', function(e){
    e.preventDefault();
    $('#setting-haishi').css('display', 'none');
  });
  //面子入力
  $('#mentsu-input button').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');    
  });
  $('#mentsu-input button').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');    
  });
  $('#atama').on('touchend', function(e){
    e.preventDefault();
    var li = '<ul data-mentsu="atama"><li data-hai=""></li><li data-hai=""></li></ul>';
    $('#haishi').append(li);
    $('#atama').attr('class', 'disabled');
    currentHai();
  });
  $('#kotsu01').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="kotsu"]').length){
      case 0:li = '<ul data-mentsu="kotsu01"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kotsu02"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kotsu03"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kotsu04"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kotsu02').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="kotsu"]').length){
      case 0:li = '<ul data-mentsu="kotsu01"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kotsu02"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kotsu03"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kotsu04"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kotsu03').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="kotsu"]').length){
      case 0:li = '<ul data-mentsu="kotsu01"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kotsu02"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kotsu03"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kotsu04"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kotsu04').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="kotsu"]').length){
      case 0:li = '<ul data-mentsu="kotsu01"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kotsu02"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kotsu03"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kotsu04"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#shuntsu01').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="shuntsu"]').length){
      case 0:li = '<ul data-mentsu="shuntsu01"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="shuntsu02"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="shuntsu03"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="shuntsu04"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#shuntsu02').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="shuntsu"]').length){
      case 0:li = '<ul data-mentsu="shuntsu01"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="shuntsu02"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="shuntsu03"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="shuntsu04"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kan01').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="ankan"]').length){
      case 0:li = '<ul data-mentsu="ankan01"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="ankan02"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="ankan03"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="ankan04"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kan02').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="minkan"]').length){
      case 0:li = '<ul data-mentsu="kan01"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kan02"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kan03"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kan04"><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
   };
    currentHai();
  });
  $('#kan03').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="minkan"]').length){
      case 0:li = '<ul data-mentsu="kan01"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kan02"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kan03"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kan04"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kan04').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="minkan"]').length){
      case 0:li = '<ul data-mentsu="kan01"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kan02"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kan03"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kan04"><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kakan01').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="kakan"]').length){
      case 0:li = '<ul data-mentsu="kakan01"><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kakan02"><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kakan03"><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kakan04"><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kakan02').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="kakan"]').length){
      case 0:li = '<ul data-mentsu="kakan01"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kakan02"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kakan03"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kakan04"><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li><li data-hai=""></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
  $('#kakan03').on('touchend', function(e){
    e.preventDefault();
    var li = '';
    switch ($('#haishi [data-mentsu*="kakan"]').length){
      case 0:li = '<ul data-mentsu="kakan01"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 1:li = '<ul data-mentsu="kakan02"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 2:li = '<ul data-mentsu="kakan03"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      case 3:li = '<ul data-mentsu="kakan04"><li data-hai=""></li><li data-hai=""></li><li data-hai="" class="landscape"></li><li data-hai="" class="landscape"></li></ul>';$('#haishi').append(li);break;
      default: break;
    };
    currentHai();
  });
});

//七対子
function chitoi(){
  $('.disabled').removeAttr('class');
  $('#haishi').replaceWith('<div id="haishi" class="chitoi mentsu-input"></div>');
  $('#haishi').append('<ul><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li><li data-hai=""></li></ul>');
  $('#keyboard-area').css('display', 'block');
  currentHai();
}

//国士無双あがり牌・雀頭選択
function kokushi(){
  $('#kokushi-hora').css('display', 'block');
  //あがり牌
  $('#kokushi-list-hora li').on('touchstart', function(e){
    e.preventDefault();
  });
  $('#kokushi-list-hora li').on('touchend', function(e){
    e.preventDefault();
    $(this).trigger('touched');
  });
  $('#kokushi-list-hora li').on('touched', function(e){
    e.preventDefault();
    var d = '',hai = '',li = '';
    d = $(this).data('hai');
    hai = '[data-hai="' + d + '"]';
    $('#kokushi-list-atama').find($(hai)).attr('class', 'disabled');
    $('#haishi').html($('#kokushi-list-hora').html());
    $('#haishi').find($(hai)).remove();
    li = '<li data-hai="' + d + '"></li>';
    $('#haishi').append(li);
    $('#kokushi-hora').css('display', 'none');
    $('#kokushi-atama').css('display', 'block');
    kokushiAtama();
  });
}

function kokushiAtama(){
  //雀頭
  $('#kokushi-list-atama li').on('touchstart', function(e){
    e.preventDefault();
  });
  $('#kokushi-list-atama li').on('touchend', function(e){
    e.preventDefault();
    $(this).removeAttr('class');
    $(this).trigger('touched');
    $('#kokushi-list-atama').find($('.disabled')).removeAttr('class');
  });
  $('#kokushi-list-atama li').on('touched', function(e){
    e.preventDefault();
    var d = '',hai = '',li = '';
    $(this).removeAttr('class');
    d = $(this).data('hai');
    hai = '[data-hai="' + d + '"]';
    $('#haishi').find($(hai)).remove();
    li = '<li data-hai="' + d + '" data-mentsu="atama"></li>';
    li += li;
    $('#haishi').prepend(li);
    $('#kokushi-atama').css('display', 'none');
  });  
}

//国士無双13門張あがり牌選択
 function kokushi13(){
  $('#kokushi13').css('display', 'block');
  $('#kokushi13 li').on('touchstart', function(e){
    e.preventDefault();
  });
  $('#kokushi13 li').on('touchend', function(e){
    e.preventDefault();
    var d = '',hai = '',li = '';
    $('#haishi').html($('#kokushi-list').html());
    d = $(this).data('hai');
    hai = '[data-hai="' + d + '"]';
    li = '<li data-hai="' + d + '"></li>';
    $('#haishi').append(li);
    $('#kokushi13').css('display', 'none');
  });
}