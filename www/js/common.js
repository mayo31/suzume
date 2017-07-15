$(function(){
  //画面向き判定
  $(window).on("load orientationchange resize", function() {
    if(Math.abs(window.orientation) === 90) {
      $('body').attr('id','landscape');
    }
    else {
      $('body').removeAttr('id');
    };
    var w = $('body').width();
    var h = $(window).height();
    $('section').css('width', w);
    $('#keyboard-area').css('width', w);
    $('#mentsu-input').css('width', w);
    $('#result').css('height', h - 50);
    $('#help').css('height', h - 50);
  });

  //overlay-close
  $('.overlay-close').on('touchstart', function(e){
    e.preventDefault();
  });
  $('.overlay-close').on('touchend', function(e){
    e.preventDefault();
    //一発選択中の立直チェック
    if($('#option-yaku03').is(':checked') && !$('#option-yaku01').is(':checked') && !$('#option-yaku02').is(':checked')){
      alert('「ダブル立直」または「立直」を選択してください');
    } else {$('.overlay').css('display', 'none');}
    //social
    if($('.social-open').length>0){$('.social-open').removeClass('social-open')};
  });

  //social
  $('#social ul button').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('#social ul button').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    if($(this).is('#rating')){window.open('https://play.google.com/store/apps/details?id=jp.fool.m31.suzume&hl=ja', '_system');}
    else if($(this).is('#tweet')){window.open('https://twitter.com/intent/tweet?hashtags=%E9%BA%BB%E9%9B%80%E7%82%B9%E6%95%B0%E8%A8%88%E7%AE%97%E3%82%A2%E3%83%97%E3%83%AAsuzume', '_system');}
    else if($(this).is('#appccloud')){appCCloud.openAdView();};
    $(this).trigger('touched');
  });
  $('#social ul button').on('touched', function(e){
    $('.overlay').css('display', 'none');
  });

  //トップ
  $('h1').on('touchstart', function(e){
    e.preventDefault();
  });
  $('h1').on('touchend', function(e){
    e.preventDefault();
    $(this).trigger('touched');
  });
  $('h1').on('touched', function(e){
    window.location.href = '#';
  });

  //リセット
  $('#reset').on('touchstart', function(e){
    e.preventDefault();
    $(this).css('opacity',0.5);
  });
  $('#reset').on('touchend', function(e){
    e.preventDefault();
    $(this).css('opacity',1);
    $(this).trigger('touched');
  });
  $('#reset').on('touched', function(e){
    $('#oyako01').prop('checked', true);
    $('#hora01').prop('checked', true);
    $('#bakaze01').prop('checked', true);
    $('#jikaze01').prop('checked', true);
    $('#haishi01').prop('checked', true);
    $('#settings-haishi li:nth-child(1) button').replaceWith('<li data-settings="oyako"><button data-oyako="oyako01">親</button></li>');
    $('#settings-haishi li:nth-child(2) button').replaceWith('<li data-settings="hora"><button data-hora="hora01">ロン</button></li>');
    $('#settings-haishi li:nth-child(3) button').replaceWith('<li data-settings="bakaze"><button data-bakaze="bakaze01">場風：東</button></li>');
    $('#settings-haishi li:nth-child(4) button').replaceWith('<li data-settings="jicha"><button data-jicha="jicha01">自家：東</button></li>');
    $('#settings-haishi li:nth-child(6) button').html('面子入力');
    $('.disabled').removeClass('disabled');
    $('*').prop('checked', false).prop('disabled', false);
    resetHaishi();
  });

//ヘルプ
  $('#help-open').on('touchstart', function(e){
    e.preventDefault();
    $(this).attr('class', 'hover');
  });
  $('#help-open').on('touchend', function(e){
    e.preventDefault();
    $(this).removeAttr('class');
    $(this).trigger('touched');
  });
  $('#help-open').on('touched', function(e){
    window.location.href = '#help';
  });

  var h,move;
  //ヘルプアコーディオン
  $('.accordion-list01 dt').on('touchstart', function(e){
    $(this).attr('class', 'hover');
  });
  $('.accordion-list01 dt').on('touchmove', function(e){
    move = true;
    $(this).removeAttr('class');
  });
  $('.accordion-list01 dt').on('touchend', function(e){
    if(move){
      move = false;
      return;
    }
    else {
      $(this).removeAttr('class');
      if($(this).next().prop('clientHeight')==0){
        $(this).next().css('overflow', 'visible');
        $(this).next().css('height', 'auto');
        h = $(this).next().prop('clientHeight') + 'px';
        $(this).next().css('overflow', 'hidden');
        $(this).next().css('height', '0');
        $(this).removeClass('accordion-close');
        $(this).addClass('accordion-open');
        $(this).next().css('height', h);
      }
      else {
        $(this).removeClass('accordion-open');
        $(this).next().css('height', '0');
        $(this).addClass('accordion-close');
      };
    };
  });
});

