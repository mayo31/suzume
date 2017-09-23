var pre ='';

function chitoiDelete(){
  var l='',child='',key='';
  var html = $('#haishi').html();
  $('#haishi').html(html);
  l = $('#haishi li:not([data-hai=""])').length - 1;
  if(l>0){
    child = '#haishi li:nth-child(n+' + l + ')';
    key = '#keyboard li[data-hai*="' + $(child).data('hai') + '"]';
    $(child).attr('data-hai', '').removeClass('dora').removeClass('red');
    $(key).removeAttr('class');
  }
  currentHai();
}

function keyDelete(){
  var l='',child='',key='';
  var html = $('#haishi').html();
  $('#haishi').html(html);
  currentHai();
  if($('#currentHai').is('#haishi ul:last-child li:last-child')){
    $('#currentHai').attr('data-hai', '').removeClass('dora').removeClass('red');
    $('#currentHai').siblings().attr('data-hai', '').removeClass('dora').removeClass('red');
  }
  else if($('#currentHai').length){
    $('#currentHai').parent().prev().children().attr('data-hai', '').removeClass('dora').removeClass('red');
  }
  else if(!$('#currentHai').length){
    $('#haishi > ul:last-child > li').attr('data-hai', '').removeClass('dora').removeClass('red');
  }
  
  if($('#currentHai').data('mentsu')!=='shuntsu'){
    $('#keyboard [data-hai*="d0"]').removeAttr('class');
  }
}

$(function(){
  var haishiArr = [];
  $('#keyboard-close').on('touchstart', function(e){
      e.preventDefault();
      $('#mentsu-input').css('display', 'none');
      $('#keyboard-area').css('display', 'none');
      $('#haishi').css('bottom', '0');
  });
  
  $('#key-enter').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('#key-enter').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    $(this).trigger('touched');
  });
  $('#key-enter').on('touched', function(e){
    e.preventDefault();
    $('#mentsu-input').css('display', 'none');
    $('#keyboard-area').css('display', 'none');
    $('#haishi').css('bottom', '0');
  });

  $('#key-delete').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('#key-delete').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    if($('#haishi.chitoi').length){
      chitoiDelete();
    }
    else {
      keyDelete();
    }
    $(this).trigger('touched');
  });
  $('#key-delete').on('touched', function(e){
    e.preventDefault();
    currentHai();
  });

  $('#keyboard > [data-hai]').on('touchstart', function(e){
    e.preventDefault();
    if(! $('#currentHai').length){
      $(this).removeClass('key-hover');
      alertModal('入力できる面子がありません');
      return false;
    }
    $(this).addClass('key-hover');
  });
    
  $('#keyboard > [data-hai]').on('touchend', function(e){
    e.preventDefault();
		$(this).removeClass('key-hover');
		$(this).trigger('touched');
  });
    
	$('#keyboard > [data-hai]').on('touched',function(e){
    e.preventDefault();
    var key = $(this).data('hai');
    //七対子
    if($('.chitoi').length){
        $('#currentHai').attr('data-hai', key);
        $('#currentHai').next().attr('data-hai', key);
      var hai = '.chitoi [data-hai="' + key + '"]';
      if($(hai).length > 0){
        $(this).attr('class', 'disabled');
      }
      else {
        $(this).removeAttr('class');
      }
    }
    else {
      var parent = $('#currentHai').parent();
      var  keyNum = '';
      
      //雀頭
      if(parent.is('[data-mentsu*="atama"]')||parent.is('[data-mentsu*="ko"]')||parent.is('[data-mentsu*="kan"]')){
          $('#currentHai').parent().children().attr('data-hai', key);
      }
      //順子（あがり牌）
      else if(parent.is('[data-mentsu*="shuntsu"]:last-child')){        
        $('#currentHai').attr('data-hai', key);
        switch ($('[data-mentsu*="shuntsu"] li').index($('#currentHai'))){
          case 0:
          case 3:
          case 6:
          case 9:
            $('#keyboard > li').attr('class', 'disabled');
            keyNum = key.indexOf('0');
            switch (key.substr(keyNum,2)){
              case '01': $(this).next().removeClass();$(this).nextAll(':eq(1)').removeClass();break;
              case '02': $(this).prev().removeClass();$(this).next().removeClass();$(this).nextAll(':eq(1)').removeClass();break;
              case '03':
              case '04':
              case '05':
              case '06':
              case '07':
                $(this).prevAll(':eq(1)').removeClass();$(this).prev().removeClass();$(this).next().removeClass();$(this).nextAll(':eq(1)').removeClass();break;
              case '08': $(this).prev().removeClass();$(this).prevAll(':eq(1)').removeClass();$(this).next().removeClass();break;
              case '09': $(this).prev().removeClass();$(this).prevAll(':eq(1)').removeClass();break;
            }
            break;
          case 1:
          case 4:
          case 7:
          case 10:
            pre = $('#currentHai').prev().attr('data-hai').substr(1,2);
            $('#keyboard > li').attr('class', 'disabled');
            keyNum = key.indexOf('0');
            switch (key.substr(keyNum,2)){
              case '01':
                if(pre === '03'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                }
                else{
                  $('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'));
                }
                keyRemove();
                break;
              case '02':
                if(pre === '01'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                  keyRemove();
                }
                else if(pre === '03'){
                  $(this).prev().removeClass();$(this).nextAll(':eq(1)').removeClass();
                }
                else if(pre === '04'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                  keyRemove();
                }
                break;
              case '03':
                if(pre === '01'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                  keyRemove();
                }
                else if(pre === '02'){
                  $(this).prevAll(':eq(1)').removeClass();$(this).next().removeClass();
                }
                else if(pre === '04'){
                  $(this).prev().removeClass();$(this).nextAll(':eq(1)').removeClass();
                }
                else if(pre === '05'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                  keyRemove();
                };
                break;
              case '04':
                if(pre === '02'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                  keyRemove();
                }
                else if(pre === '03'){
                  $(this).prevAll(':eq(1)').removeClass();$(this).next().removeClass();
                }
                else if(pre === '05'){
                  $(this).prev().removeClass();$(this).nextAll(':eq(1)').removeClass();
                }
                else if(pre === '06'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                  keyRemove();
                }
                break;
              case '05':
                if(pre === '03'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                  keyRemove();
                }
                else if(pre === '04'){
                  $(this).prevAll(':eq(1)').removeClass();$(this).next().removeClass();
                }
                else if(pre === '06'){
                  $(this).prev().removeClass();$(this).nextAll(':eq(1)').removeClass();
                }
                else if(pre === '07'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                  keyRemove();
                }
                break;
              case '06':
                if(pre === '04'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                  keyRemove();
                }
                else if(pre === '05'){
                  $(this).prevAll(':eq(1)').removeClass();$(this).next().removeClass();
                }
                else if(pre === '07'){
                  $(this).prev().removeClass();$(this).nextAll(':eq(1)').removeClass();
                }
                else if(pre === '08'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                  keyRemove();
                }
                break;
              case '07':
                if(pre === '05'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                  keyRemove();
                }
                else if(pre === '06'){
                  $(this).prevAll(':eq(1)').removeClass();$(this).next().removeClass();
                }
                else if(pre === '08'){
                  $(this).prev().removeClass();$(this).nextAll(':eq(1)').removeClass();
                }
                else if(pre === '09'){
                  $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));
                  keyRemove();
                }
                break;
              case '08':
                if(pre === '06'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                  keyRemove();
                }
                else if(pre === '07'){
                  $(this).prevAll(':eq(1)').removeClass();$(this).next().removeClass();
                }
                else if(pre === '09'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                  keyRemove();
                }
                break;
              case '09':
                if(pre === '07'){
                  $('#currentHai').next().attr('data-hai', $(this).prev().data('hai'));
                }
                else{
                  $('#currentHai').next().attr('data-hai', $(this).prevAll(':eq(1)').data('hai'));
                }
                keyRemove();
                break;
            }
            break;
          case 2:
          case 5:
          case 8:
          case 11:keyRemove();break;
        }
      }
      //順子
      else if(parent.is('[data-mentsu*="shuntsu"]')){        
        $('#currentHai').attr('data-hai', key);
        switch ($('[data-mentsu*="shuntsu"] li').index($('#currentHai'))){
          case 0:
          case 3:
          case 6:
          case 9:
            $('#keyboard > li').attr('class', 'disabled');
            keyNum = key.indexOf('0');
            switch (key.substr(keyNum,2)){
              case '01': $('#currentHai').next().attr('data-hai', $(this).next().data('hai'));$('#currentHai').nextAll(':eq(1)').attr('data-hai', $(this).nextAll(':eq(1)').data('hai'));$('#keyboard > li').attr('class', '');break;
              case '02': $(this).prev().removeClass();$(this).next().removeClass();break;
              case '03':
              case '04':
              case '05':
              case '06':
              case '07':
                $(this).prevAll(':eq(1)').removeClass();$(this).prev().removeClass();$(this).next().removeClass();break;
              case '08': $(this).prev().removeClass();$(this).prevAll(':eq(1)').removeClass();break;
              case '09': $('#currentHai').next().attr('data-hai', $(this).prevAll(':eq(1)').data('hai'));$('#currentHai').nextAll(':eq(1)').attr('data-hai', $(this).prev().data('hai'));$('#keyboard > li').attr('class', '');break;
            }
            break;
          case 1:
          case 4:
          case 7:
          case 10:
            pre = $('#currentHai').prev().attr('data-hai').substr(1,2);
            keyNum = key.indexOf('0');
            switch (key.substr(keyNum,2)){
              case '01':
                if(pre == '03'){$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))} else{$('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'))};keyRemove();break;
              case '02':
                if(pre == '03'){$('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'))} else {$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))};keyRemove();break;
              case '03':
                if(pre == '01'){$('#currentHai').attr('data-hai', $(this).prev().data('hai'));$('#currentHai').next().attr('data-hai', $(this).data('hai'))} else if(pre == '04'){$('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'))} else{$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))};keyRemove();break;
              case '04':
                if(pre == '02'){$('#currentHai').attr('data-hai', $(this).prev().data('hai'));$('#currentHai').next().attr('data-hai', $(this).data('hai'))} else if(pre == '05'){$('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'))} else{$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))};keyRemove();break;
              case '05':
                if(pre == '03'){$('#currentHai').attr('data-hai', $(this).prev().data('hai'));$('#currentHai').next().attr('data-hai', $(this).data('hai'))} else if(pre == '06'){$('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'))} else{$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))};keyRemove();break;
              case '06':
                if(pre == '04'){$('#currentHai').attr('data-hai', $(this).prev().data('hai'));$('#currentHai').next().attr('data-hai', $(this).data('hai'))} else if(pre == '07'){$('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'))} else{$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))};keyRemove();break;
              case '07':
                if(pre == '05'){$('#currentHai').attr('data-hai', $(this).prev().data('hai'));$('#currentHai').next().attr('data-hai', $(this).data('hai'))} else if(pre == '08'){$('#currentHai').next().attr('data-hai', $(this).nextAll(':eq(1)').data('hai'))} else{$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))};keyRemove();break;
              case '08':
                if(pre == '07'){$('#currentHai').next().attr('data-hai', $(this).next().data('hai'))} else{$('#currentHai').next().attr('data-hai', $(this).prev().data('hai'))};keyRemove();break;
            }
            break;
          case 2:
          case 5:
          case 8:
          case 11:
            break;
        };
      };
    };
    currentHai();
  });
  
});

function keyRemove(){$('#keyboard > li').removeClass();}

