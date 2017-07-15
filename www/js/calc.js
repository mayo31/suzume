var tmp,calcCnt,atama,oyako,hora,bakaze,jicha,src,hai,dora,yaku,moreHai,kanchan,penchan,yakuhai,
fu,fuResult,tr,fan,fanResult,mentsuType,haiType,shuntsu,ipeiko,ipeikoArr,san,sanArr,sanArrA,sanArrB,sanArrC,sanArrD,
ittsuA01,ittsuA02,ittsuA03,ittsuB01,ittsuB02,ittsuB03,ittsuC01,ittsuC02,ittsuC03,
a1,a2,a3,a4,a5,a6,a7,a8,a9,b1,b2,b3,b4,b5,b6,b7,b8,b9,c1,c2,c3,c4,c5,c6,c7,c8,c9,
mangan,haneman,baiman,sanbaiman,yakuman,score,scoreKey,scoreName,scoreResult,scoreOya,scoreKo;


$(function(){
  
  $('#calc').on('touchstart', function(e){
    e.preventDefault();
    $(this).attr('class', 'hover');
  });
  $('#calc').on('touchend', function(e){
    e.preventDefault();
    $(this).removeAttr('class');

    //設定
    oyako = $('[data-oyako]').data('oyako').substr(5,2);
    hora = $('[data-hora]').data('hora').substr(4,2);
    bakaze = $('[data-bakaze]').data('bakaze').substr(6,2);
    jicha = $('[data-jicha]').data('jicha').substr(5,2);
    
    if($('#haishi .landscape').length<1&&hora==='02'){$('#option-yaku37').prop('checked', true);}
    else{$('#option-yaku37').prop('checked', false);}

    if(!$('#haishi li').length){
      alert("面子を設定してください");
    }
    else if($('#haishi [data-hai=""]').length > 0){
      alert("未入力の牌があります");
    }
    else if($('#haishi ul:last-child').is('[data-mentsu*="kan"]')){
      alert("右端をあがり牌にしてください（槓子であがれません）");
    }
    else if($('.chitoi').length>0&&$('#option-yaku04').prop('checked')===true){
      alert("搶槓であがれません（七対子）");
    }
    else if($('.chitoi').length>0&&$('#option-yaku05').prop('checked')===true){
      alert("嶺上開花であがれません（七対子）");
    }
    else if($('[class*="kokushi"]').length>0&&$('#option-yaku04').prop('checked')===true){
      alert("搶槓であがれません（国士無双）");
    }
    else if($('[class*="kokushi"]').length>0&&$('#option-yaku05').prop('checked')===true){
      alert("嶺上開花であがれません（国士無双）");
    }
    else if($('#haishi [data-mentsu*="kan"]').length<1&&$('#option-yaku05').prop('checked')===true){
      alert("嶺上開花であがれません（槓子がありません）");
    }
    else if($('[class*="kokushi"]').length>0&&$('#haishi03').prop('checked')===true&&$('#haishi [data-mentsu="atama"]').length<1){
      alert("雀頭が設定されていません");
    }
    else if($('.chitoi').length<1&&$('[class*="kokushi"]').length<1&&$('#haishi[class="mentsu-input"] ul:not([data-mentsu="atama"])').length < 4){
      alert("面子が足りません");
    }
    else if($('.chitoi').length<1&&$('[class*="kokushi"]').length<1&&!$('#haishi[class="mentsu-input"] [data-mentsu="atama"]').length){
      alert("雀頭がありません");
    }
    else if($('#haishi .landscape').length>0&&$('#option-yaku01').prop('checked')===true){
      alert("ダブル立直はかけられません（鳴きあり）");
    }
    else if($('#haishi .landscape').length>0&&$('#option-yaku02').prop('checked')===true){
      alert("立直はかけられません（鳴きあり）");
    }
    else if($('#haishi .landscape').length>0&&$('#option-yaku08').prop('checked')===true){
      alert("天和であがれません（鳴きあり）");
    }
    else if($('#haishi .landscape').length>0&&$('#option-yaku09').prop('checked')===true){
      alert("地和であがれません（鳴きあり）");
    }
    else if(oyako==='01'&&$('#option-yaku09').prop('checked')===true){
      alert("親はあがれません（地和）");
    }
    else if(oyako==='02'&&$('#option-yaku08').prop('checked')===true){
      alert("子はあがれません（天和）");
    }
    else if(hora==='01'&&$('#option-yaku05').prop('checked')===true){
      alert("ロンであがれません（嶺上開花）");
    }
    else if(hora==='01'&&$('#option-yaku06').prop('checked')===true){
      alert("ロンであがれません（海底摸月）");
    }
    else if(hora==='01'&&$('#option-yaku08').prop('checked')===true){
      alert("ロンであがれません（天和）");
    }
    else if(hora==='01'&&$('#option-yaku09').prop('checked')===true){
      alert("ロンであがれません（地和）");
    }
    else if(hora==='02'&&$('#option-yaku04').prop('checked')===true){
      alert("ツモであがれません（搶槓）");
    }
    else if(hora==='02'&&$('#option-yaku07').prop('checked')===true){
      alert("ツモであがれません（河底撈魚）");
    }
    else{
      $(this).trigger('touched');
    }
   });
  $('#calc').on('touched', function(e){
    e.preventDefault();
    $('#haishi ul:last-child .landscape').removeClass('landscape');
    if(hora==='01'&&$('#haishi .landscape').length<1){$('#haishi ul:last-child li:last-child').addClass('landscape').addClass('landscape-re');}
    $('[id^="option-yaku"]:nth-of-type(n+10)').prop('checked',false);
    $('#result-haishi-table').html('');
    $('#result-yaku-table').html('');
    if($('#haishi.kokushi').length>0){calcKokushi();}
    else{
      calc();
    }
    $('.landscape-re').removeClass('landscape').removeClass('landscape-re');
    if(yaku===true){
      window.location.href = '#result';
    }
  });
});

function calc(){
  //初期化
  $('#option-yaku10').prop('checked', false);
  $('#option-yaku11').prop('checked', true);
  $('#option-yaku12').prop('checked', true);
  $('#option-yaku13').prop('checked', false);
  $('#option-yaku14').prop('checked', true);
  $('#option-yaku15').prop('checked', false);
  $('#option-yaku16').prop('checked', false);
  $('#option-yaku17').prop('checked', false);
  $('#option-yaku18').prop('checked', false);
  $('#option-yaku19').prop('checked', false);
  $('#option-yaku20').prop('checked', true);
  $('#option-yaku21').prop('checked', false);
  $('#option-yaku22').prop('checked', true);
  $('#option-yaku23').prop('checked', false);
  $('#option-yaku24').prop('checked', false);
  $('#option-yaku25').prop('checked', true);
  $('#option-yaku26').prop('checked', false);        
  $('#option-yaku27').prop('checked', true);
  $('#option-yaku28').prop('checked', false);
  $('#option-yaku29').prop('checked', false);
  $('#option-yaku30').prop('checked', false);
  $('#option-yaku31').prop('checked', false);
  $('#option-yaku32').prop('checked', true);
  $('#option-yaku33').prop('checked', true);
  $('#option-yaku34').prop('checked', true);
  $('#option-yaku35').prop('checked', true);
  $('#option-yaku36').prop('checked', false);
  //37不要
  $('#option-yaku38').prop('checked', false);
  $('#option-yaku39').prop('checked', false);
  $('#option-yaku40').prop('checked', false);

  $('#option-yaku10').data('fan', 0);
  $('#option-yaku16').data('fan', 2);
  $('#option-yaku19').data('fan', 2);
  $('#option-yaku20').data('fan', 2);
  $('#option-yaku24').data('fan', 3);
  $('#option-yaku25').data('fan', 3);
  $('#option-yaku27').data('fan', 6);

  yaku = true;
  mangan = false;
  haneman = false;
  baiman = false; 
  sanbaiman = false;
  yakuman = false;
  
  yakuhai = 0;
  moreHai = false;
  kanchan = false;
  penchan = false;

  fuResult = 20;
  fu = 0;

  //役判定
  $('#haishi [data-hai]').each(function(){
    hai = $(this).data('hai');
    if($('#haishi [data-hai*="'+ hai +'"]').length>4){
      moreHai = true;
    }
    else if($(this).is('[data-hai*="d0"]')){
      $('#option-yaku12').prop('checked', false);
      $('#option-yaku25').prop('checked', false);
      $('#option-yaku33').prop('checked', false);
      $('#option-yaku35').prop('checked', false);
      if(!$(this).is('[data-hai*="d06"]')){$('#option-yaku34').prop('checked', false);}
    }
    else{
      $('#option-yaku32').prop('checked', false);
      if(!$(this).is('[data-hai*="c02"]')&&!$(this).is('[data-hai*="c03"]')&&!$(this).is('[data-hai*="c04"]')&&!$(this).is('[data-hai*="c06"]')&&!$(this).is('[data-hai*="c08"]')){$('#option-yaku34').prop('checked', false);}
      switch($(this).data('hai').substr(1,2)){

        case '01':$('#option-yaku12').prop('checked', false);break;
        case '02':
        case '03':
        case '04':
        case '05':
        case '06':
        case '07':
        case '08':$('#option-yaku22').prop('checked', false);$('#option-yaku33').prop('checked', false);break;
        case '09':$('#option-yaku12').prop('checked', false);break;
      }
    }
  });

  if(!$('#haishi').hasClass('chitoi')){
    hai = $('[data-mentsu="atama"] li:first-child').data('hai');
    atama = hai.substr(1,2);
    $('#haishi ul').each(function(){
      //チャンタ判定
      if($(this).find('[data-hai*="01"]').length<1&&$(this).find('[data-hai*="09"]').length<1){
        $('#option-yaku25').prop('checked', false);
        if($(this).find('[data-hai*="d0"]').length<1){$('#option-yaku20').prop('checked', false);}
      }
      if($(this).is('[data-mentsu="atama"]')){
        //雀頭の役牌・風牌判定
        tr = '<tr><th>雀頭</th><td><ul data-mentsu="atama">' + $('#haishi [data-mentsu="atama"]').html() + '</ul></td><td>';
        if($('[data-mentsu="atama"] [data-hai*="d0"]').length>0){
          fu = 2;
          switch(atama){
            case bakaze:
              if(bakaze==jicha){
                fu += 2;
                tr += '連風牌</td><td>4符</td></tr>';
              }
              else{
                tr += '場風牌</td><td>2符</td></tr>';
              }
              $('#option-yaku11').prop('checked', false);
              break;
            case jicha:
              tr += '自風牌</td><td>2符</td></tr>';
              $('#option-yaku11').prop('checked', false);
              break;
            case "05":
            case "06":
            case "07":
              tr += '役牌</td><td>2符</td></tr>';
              $('#option-yaku11').prop('checked', false);
              break;
            default:
              fu -= 2;
              tr += '客風牌</td><td>0符</td></tr>';
              break;
          }
        }
        else {
          tr += '数牌</td><td>0符</td></tr>';
          fu = 0;
        }
        $('#result-haishi-table').prepend(tr);
      }
      else {
        haiType = '中張牌';
        switch($(this).data('mentsu').substr(0,3)){
          case 'kot':
            if($(this).is(':last-child')&&hora==='01'){
              mentsuType = '明刻'; fu = 2;
            }
            else {
              if($(this).find($('.landscape')).length > 0){
                mentsuType = '明刻'; fu = 2;
              }
              else{
                mentsuType = '暗刻'; fu = 4;
              }
            }
            break;
          case 'shu':
            shuntsu = true;
            mentsuType = '順子';
            fu = 0;
            break;
          case 'ank':
            mentsuType = '暗槓';
            fu = 16;
            break;
          case 'kan':
            mentsuType = '明槓';
            fu = 8;
            break;
          case 'kak':        
            mentsuType = '加槓';
            fu = 8;
            break;
        }
        if($(this).children().eq(1).is('[data-hai*="d0"]')||$(this).children().eq(1).is('[data-hai*="01"]')||$(this).children().eq(1).is('[data-hai*="09"]')){fu *= 2; haiType = 'ヤオ九牌';}
        if(shuntsu){haiType = '&nbsp;'; shuntsu = false;}
        tr = '<tr><th>' + mentsuType + '</th><td><ul data-mentsu="' + $(this).data('mentsu') + '">' + $(this).html() + '</ul></td><td>' + haiType + '</td><td>' + fu + '符</td></tr>';
        $('#result-haishi-table').append(tr);
      }
      fuResult += fu;
      tr = '';      
    });

    //四喜和
    if($('#haishi [data-hai*="d01"]').length>=2&&$('#haishi [data-hai*="d02"]').length>=2&&$('#haishi [data-hai*="d03"]').length>=2&&$('#haishi [data-hai*="d04"]').length>=2){
      $('#option-yaku31').prop('checked', true);
    }
    //大三元・小三元
    if($('#haishi [data-hai*="d05"]').length>1&&$('#haishi [data-hai*="d06"]').length>1&&$('#haishi [data-hai*="d07"]').length>1){
      switch($('#haishi [data-mentsu="atama"] :first-child').data('hai').substr(0,3)){
        case 'd05':if($('#haishi [data-hai*="d06"]').length>2&&$('#haishi [data-hai*="d07"]').length>2){$('#option-yaku21').prop('checked', true);}break;
        case 'd06':if($('#haishi [data-hai*="d05"]').length>2&&$('#haishi [data-hai*="d07"]').length>2){$('#option-yaku21').prop('checked', true);}break;
        case 'd07':if($('#haishi [data-hai*="d05"]').length>2&&$('#haishi [data-hai*="d06"]').length>2){$('#option-yaku21').prop('checked', true);}break;
        default:
          if($('#haishi [data-hai*="d05"]').length>2&&$('#haishi [data-hai*="d06"]').length>2&&$('#haishi [data-hai*="d07"]').length>2){
            $('#option-yaku30').prop('checked', true);
          }
          break;
      }
    }
    //対々和
    if($('#haishi [data-mentsu*="shuntsu"]').length>0){
      $('#option-yaku14').prop('checked', false);
    }
    //三色同刻
    if($('#haishi [data-mentsu*="shuntsu"]').length<2){
      var doko,dokoA,dokoB,dokoC;
      $('#haishi ul:not([data-mentsu*="shuntsu"]) [data-hai]').each(function(){
        doko = $(this).data('hai').substr(1,2);
        dokoA = '#haishi [data-hai*="a' + doko + '"]';
        dokoB = '#haishi [data-hai*="b' + doko + '"]';
        dokoC = '#haishi [data-hai*="c' + doko + '"]';
        if(!$('[data-mentsu="atama"] :first-child').is(dokoA)&&!$('[data-mentsu="atama"] :first-child').is(dokoB)&&!$('[data-mentsu="atama"] :first-child').is(dokoC)){
          if($(dokoA).length>2&&$(dokoB).length>2&&$(dokoC).length>2){
            $('#option-yaku17').prop('checked', true);
          }
        }
      });
    }
    //一気通貫
    if($('#haishi [data-mentsu*="shuntsu"]').length>2){
      $('#haishi [data-mentsu*="shuntsu"]').each(function(){
        $.each($(this).children(), function(){
          switch($(this).data('hai')){
            case "a01":a1 = true;break;
            case "a02":a2 = true;break;
            case "a03":a3 = true;break;
            case "a04":a4 = true;break;
            case "a05":a5 = true;break;
            case "a06":a6 = true;break;
            case "a07":a7 = true;break;
            case "a08":a8 = true;break;
            case "a09":a9 = true;break;
            case "b01":b1 = true;break;
            case "b02":b2 = true;break;
            case "b03":b3 = true;break;
            case "b04":b4 = true;break;
            case "b05":b5 = true;break;
            case "b06":b6 = true;break;
            case "b07":b7 = true;break;
            case "b08":b8 = true;break;
            case "b09":b9 = true;break;
            case "c01":c1 = true;break;
            case "c02":c2 = true;break;
            case "c03":c3 = true;break;
            case "c04":c4 = true;break;
            case "c05":c5 = true;break;
            case "c06":c6 = true;break;
            case "c07":c7 = true;break;
            case "c08":c8 = true;break;
            case "c09":c9 = true;break;
          }
        });
        if(a1&&a2&&a3){ittsuA01=true;}
        if(a4&&a5&&a6){ittsuA02=true;}
        if(a7&&a8&&a9){ittsuA03=true;}
        if(b1&&b2&&b3){ittsuB01=true;}
        if(b4&&b5&&b6){ittsuB02=true;}
        if(b7&&b8&&b9){ittsuB03=true;}
        if(c1&&c2&&c3){ittsuC01=true;}
        if(c4&&c5&&c6){ittsuC02=true;}
        if(c7&&c8&&c9){ittsuC03=true;}
        a1=a2=a3=a4=a5=a6=a7=a8=a9=b1=b2=b3=b4=b5=b6=b7=b8=b9=c1=c2=c3=c4=c5=c6=c7=c8=c9 = false;
      });
      if(ittsuA01&&ittsuA02&&ittsuA03){$('#option-yaku19').prop('checked', true);}
      else if(ittsuB01&&ittsuB02&&ittsuB03){$('#option-yaku19').prop('checked', true);}
      else if(ittsuC01&&ittsuC02&&ittsuC03){$('#option-yaku19').prop('checked', true);}
      else{$('#option-yaku19').prop('checked', false);}
      ittsuA01=ittsuA02=ittsuA03=ittsuB01=ittsuB02=ittsuB03=ittsuC01=ittsuC02=ittsuC03 = false;
    }
    //一盃口・二盃口
    if($('#haishi [data-mentsu*="shuntsu"]').length>1){
      ipeikoArr = [];
      $('#haishi [data-mentsu*="shuntsu"]').each(function(){
        ipeiko = [];
        $(this).children().each(function(){
          ipeiko.push($(this).data('hai').substr(0,3));
        });
        //比較する
        $.each(ipeikoArr,function(){
          if($.inArray(ipeiko[0],$(this))>=0&&$.inArray(ipeiko[1],$(this))>=0&&$.inArray(ipeiko[2],$(this))>=0){
            if($('#option-yaku13').prop('checked')===true){
              $('#option-yaku26').prop('checked', true);
              $('#option-yaku13').prop('checked', false);
            }
            else if($('#option-yaku26').prop('checked')===false) {
              $('#option-yaku13').prop('checked', true);
            }
          }
        });
        ipeikoArr.push(ipeiko);
      });
      if($('#haishi .landscape').length>0&&hora==='02'){
        $('#option-yaku13').prop('checked',false);
        $('#option-yaku26').prop('checked',false);        
      }
      else if($('#haishi .landscape:not(.landscape-re)').length>0&&hora==='01'){
        $('#option-yaku13').prop('checked',false);
        $('#option-yaku26').prop('checked',false);        
      }
  }
    //三色同順
    if($('#haishi [data-mentsu*="shuntsu"]').length>2){
      sanArr = [];
      $('#haishi [data-mentsu*="shuntsu"]').each(function(){
        san = [];
        $(this).children().each(function(){
          san.push($(this).data('hai').substr(1,2));
        });
        a1 = "#haishi [data-mentsu*='shuntsu']:has([data-hai='a" + san[0] + "']):has([data-hai='a" + san[1] + "']):has([data-hai='a" + san[2] + "'])";
        b1 = "#haishi [data-mentsu*='shuntsu']:has([data-hai='b" + san[0] + "']):has([data-hai='b" + san[1] + "']):has([data-hai='b" + san[2] + "'])";
        c1 = "#haishi [data-mentsu*='shuntsu']:has([data-hai='c" + san[0] + "']):has([data-hai='c" + san[1] + "']):has([data-hai='c" + san[2] + "'])";
        if($(a1).length>0&&$(b1).length>0&&$(c1).length>0){
          $('#option-yaku16').prop('checked', true);
        }
     });
    }
    a1=b1=c1 = false;
   //九連宝燈
  if($('#haishi [data-hai*="01"]').length<3||$('#haishi [data-hai*="09"]').length<3||$('#haishi [data-hai*="02"]').length<1||$('#haishi [data-hai*="03"]').length<1||$('#haishi [data-hai*="04"]').length<1||$('#haishi [data-hai*="05"]').length<1||$('#haishi [data-hai*="06"]').length<1||$('#haishi [data-hai*="07"]').length<1||$('#haishi [data-hai*="08"]').length<1){
      $('#option-yaku35').prop('checked', false);
    }
    //三暗刻・四暗刻、役牌
    if($('#haishi [data-mentsu*="kotsu"]').length > 0||$('#haishi [data-mentsu*="kan"]').length > 0){
      $('#option-yaku11').prop('checked', false);
      if($('#haishi [data-hai*="d01"]').length>2){
        if(jicha==='01'&&bakaze==='01'){$('#option-yaku40').prop('checked', true);}
        else if(jicha==='01'){$('#option-yaku38').prop('checked', true);}
        else if(bakaze==='01'){$('#option-yaku39').prop('checked', true);}
      }
      if($('#haishi [data-hai*="d02"]').length>2){
        if(jicha==='02'&&bakaze==='02'){$('#option-yaku40').prop('checked', true);}
        else if(jicha==='02'){$('#option-yaku38').prop('checked', true);}
        else if(bakaze==='02'){$('#option-yaku39').prop('checked', true);}
      }
      if($('#haishi [data-hai*="d03"]').length>2){
        if(jicha==='03'&&bakaze==='03'){$('#option-yaku40').prop('checked', true);}
        else if(jicha==='03'){$('#option-yaku38').prop('checked', true);}
        else if(bakaze==='03'){$('#option-yaku39').prop('checked', true);}
      }
      if($('#haishi [data-hai*="d04"]').length>2){
        if(jicha==='04'&&bakaze==='04'){$('#option-yaku40').prop('checked', true);}
        else if(jicha==='04'){$('#option-yaku38').prop('checked', true);}
        else if(bakaze==='04'){$('#option-yaku39').prop('checked', true);}
      }
      if($('#haishi [data-hai*="d05"]').length>2){yakuhai+=1;$('#option-yaku10').prop('checked', true);}
      if($('#haishi [data-hai*="d06"]').length>2){yakuhai+=1;$('#option-yaku10').prop('checked', true);}
      if($('#haishi [data-hai*="d07"]').length>2){yakuhai+=1;$('#option-yaku10').prop('checked', true);}
      $('#option-yaku10').data('fan', yakuhai);
      switch($('#haishi [data-mentsu*="kotsu"]').length){
        case 1:
          if($('#haishi [data-mentsu*="kotsu"] .landscape').length<2&&$('#haishi [data-mentsu*="ankan"]').length===2){
            $('#option-yaku15').prop('checked', true);          
          }
          break;
        case 2:
          if($('#haishi [data-mentsu*="kotsu"] .landscape').length<2&&$('#haishi [data-mentsu*="ankan"]').length===1){
            $('#option-yaku15').prop('checked', true);          
          }
          else if($('#haishi [data-mentsu*="kotsu"] .landscape').length<1&&$('#haishi [data-mentsu*="ankan"]').length===2){
            $('#option-yaku28').prop('checked', true);          
          }
          break;
        case 3:
          if($('#haishi [data-mentsu*="ankan"]').length===1){
            $('#option-yaku28').prop('checked', true);          
          }
          else if($('#haishi [data-mentsu*="kotsu"] .landscape').length<1){
            $('#option-yaku15').prop('checked', true);
          }
          break;
        case 4:
          if($('#haishi [data-mentsu*="kotsu"] .landscape').length<1){
            $('#option-yaku28').prop('checked', true);
          }
          else if($('#haishi [data-mentsu*="kotsu"] .landscape-re').length>0){
            $('#option-yaku15').prop('checked', true);
          }
          else if(hora==='02'&&$('#haishi [data-mentsu*="kotsu"] .landscape').length===1){
            $('#option-yaku15').prop('checked', true);
          }
          else if(hora==='01'&&$('#haishi [data-mentsu*="kotsu"] .landscape').length===1){
            if($('#haishi [data-mentsu="atama"]').is(':last-child')){
              $('#option-yaku15').prop('checked', true);
            }
          }
          break;
      }
      if($('#option-yaku28').prop('checked')===true&&hora==="01"){
          $('#option-yaku14').prop('checked', true);
          $('#option-yaku15').prop('checked', true);
          $('#option-yaku28').prop('checked', false);       
      }
    }
    //三槓子・四槓子
    if($('#haishi [data-mentsu*="kan"]').length > 0){
      $('#option-yaku11').prop('checked', false);
      switch($('#haishi [data-mentsu*="kan"]').length){
        case 3:
          $('#option-yaku23').prop('checked', true);
          if($('#haishi [data-mentsu*="kotsu"]').length>0&&$('#haishi [data-mentsu*="ankan"]').length===3){
            $('#option-yaku28').prop('checked', true);
          }
          break;
        case 4:
          $('#option-yaku36').prop('checked', true);
          if($('#haishi [data-mentsu*="ankan"]').length===4){
            $('#option-yaku28').prop('checked', true);
          }
          break;
      }
    }

    //聴牌判定
    if($('#haishi ul:last-child').is('[data-mentsu*="kotsu"]')){
      tr = '<tr><th>聴牌</th><td>&nbsp;</td><td>双碰</td><td>0符</td></tr>';
      $('#option-yaku11').prop('checked',false);
      fu = 0;
    }
    else if($('#haishi ul:last-child').is('[data-mentsu="atama"]')){
      tr = '<tr><th>聴牌</th><td>&nbsp;</td><td>単騎</td><td>2符</td></tr>';
      $('#option-yaku11').prop('checked',false);
      fu = 2;
    }
    else if($('#haishi ul:last-child').is('[data-mentsu*="shuntsu"]')){
      switch($('#haishi ul:last-child :last-child').data('hai').substr(1,2)){
        case '01':
          fu = 0;
      		break;
  			case '02':
    			if($('#haishi ul:last-child [data-hai*="01"]').length>0&&$('#haishi ul:last-child [data-hai*="03"]').length>0){
  					kanchan = true;
  					fu = 2;
  				}
  				break;
  			case '03':
  				if($('#haishi ul:last-child [data-hai*="02"]').length>0&&$('#haishi ul:last-child [data-hai*="04"]').length>0){
  					kanchan = true;
  					fu = 2;
  				}
    			else if($('#haishi ul:last-child [data-hai*="01"]').length>0&&$('#haishi ul:last-child [data-hai*="02"]').length>0){
  					penchan = true;
  					fu = 2;
  				}
  				break;
  			case '04':
    			if($('#haishi ul:last-child [data-hai*="03"]').length>0&&$('#haishi ul:last-child [data-hai*="05"]').length>0){
  					kanchan = true;
  					fu = 2;
  				}
  				break;
  			case '05':
    			if($('#haishi ul:last-child [data-hai*="04"]').length>0&&$('#haishi ul:last-child [data-hai*="06"]').length>0){
  					kanchan = true;
  					fu = 2;
  				}
  				break;
  			case '06':
    			if($('#haishi ul:last-child [data-hai*="05"]').length>0&&$('#haishi ul:last-child [data-hai*="07"]').length>0){
  					kanchan = true;
  					fu = 2;
  				}
  				break;
  			case '07':
    			if($('#haishi ul:last-child [data-hai*="06"]').length>0&&$('#haishi ul:last-child [data-hai*="08"]').length>0){
  					kanchan = true;
  					fu = 2;
  				}
      		else if($('#haishi ul:last-child [data-hai*="08"]').length>0&&$('#haishi ul:last-child [data-hai*="09"]').length>0){
  					penchan = true;
  					fu = 2;
  				}
  				break;
  			case '08':
    			if($('#haishi ul:last-child [data-hai*="07"]').length>0&&$('#haishi ul:last-child [data-hai*="09"]').length>0){
  					kanchan = true;
  					fu = 2;
  				}
  				break;
  			case '09':
          fu = 0;
          break;
  		}
    }
  	if(kanchan){tr = '<tr><th>聴牌</th><td>&nbsp;</td><td>嵌張</td><td>2符</td></tr>';$('#option-yaku11').prop('checked',false);}
    else if(penchan){tr = '<tr><th>聴牌</th><td>&nbsp;</td><td>辺張</td><td>2符</td></tr>';$('#option-yaku11').prop('checked',false);}
  	$('#result-haishi-table').append(tr);
  	fuResult += fu;
  	tr = '';

    //符テーブル書き出し
    if($('#option-yaku11').prop('checked')===true&&$('#option-yaku37').prop('checked')===true&&hora==='02'){
      tr+='<tr><th>平和ツモ</th><td colspan="3">20符</td></tr>';
    }
    else if($('#option-yaku11').prop('checked')===true&&$('#option-yaku37').prop('checked')===false&&$('.landscape:not(.landscape-re)').length>0){
      tr+='<tr><th>鳴き平和</th><td colspan="3">30符</td></tr>';
      fuResult += 10;
    }
    else {
      if($('.landscape:not(.landscape-re)').length<1&&hora==='01'){tr+='<tr><th>門前ロン</th><td colspan="3">10符</td></tr>';fuResult += 10;}
      else if($('#option-yaku11').prop('checked')===false&&hora==='02'){tr+='<tr><th>ツモ</th><td colspan="3">2符</td></tr>';fuResult += 2;}
      tr += '<tr><th>副底</th><td colspan="3">20符</td></tr>';
    }
    $('#result-haishi-table').append(tr);
    tr += '<tfoot><tr><th>計</th><td colspan="3">' + fuResult + '符</td></tr></tfoot>';
    fu = fuResult;
    $('#result-haishi-table').append(tr);
    fuResult = Math.ceil(fuResult/10) * 10;
    tr += '<tfoot><tr><th>結果</th><td colspan="3">' + fuResult + '符</td></tr></tfoot>';
    $('#result-haishi-table').append(tr);
    tr = '';
  }
  else if(!$('#haishi').hasClass('kokushi')) {
    $('#option-yaku11').prop('checked', false);
    $('#option-yaku14').prop('checked', false);
    $('#option-yaku15').prop('checked', false);
    $('#option-yaku18').prop('checked', true);
    $('#option-yaku20').prop('checked', false);
    $('#option-yaku22').prop('checked', false);
    $('#option-yaku25').prop('checked', false);
    $('#option-yaku35').prop('checked', false);
    fuResult = 25;
    tr = '<tr><th>七対子一律</th><td colspan="3">25符</td></tr>';
    $('#result-haishi-table').append(tr);
    tr = '<tfoot><tr><th>計</th><td colspan="3">25符</td></tr></tfoot>';
    $('#result-haishi-table').append(tr);
    tr = '';
  }

  //清一色・混一色
  if($('#haishi [data-hai*="a0"]').length>0){
    if($('#haishi [data-hai*="b0"]').length>0||$('#haishi [data-hai*="c0"]').length>0){$('#option-yaku27').prop('checked', false);}
    else if($('#haishi [data-hai*="d0"]').length>0){$('#option-yaku27').prop('checked', false);$('#option-yaku24').prop('checked', true);}
  }
  else if($('#haishi [data-hai*="b0"]').length>0){
    if($('#haishi [data-hai*="c0"]').length>0){$('#option-yaku27').prop('checked', false);}
    else if($('#haishi [data-hai*="d0"]').length>0){$('#option-yaku27').prop('checked', false);$('#option-yaku24').prop('checked', true);}
  }
  else if($('#haishi [data-hai*="c0"]').length>0){
    if($('#haishi [data-hai*="d0"]').length>0){$('#option-yaku27').prop('checked', false);$('#option-yaku24').prop('checked', true);}
  }
  
  //字一色
  if($('#haishi li:not([data-hai*="d0"])').length<1){
    $('#option-yaku27').prop('checked', false);
  }

  //混老頭・混全帯ヤオ九
  if($('#haishi [data-hai*="d0"]').length<1){
    $('#option-yaku20').prop('checked', false);
    $('#option-yaku22').prop('checked', false);
  }
  if($('#option-yaku22').prop('checked')===true){
    $('#option-yaku20').prop('checked', false);
  }

  //食い下がり・門前チェック
  if(hora==='02'&&$('#haishi .landscape').length>0){
    $('#option-yaku16').data('fan', 1);
    $('#option-yaku19').data('fan', 1);
    $('#option-yaku20').data('fan', 1);
    $('#option-yaku24').data('fan', 2);
    $('#option-yaku25').data('fan', 2);
    $('#option-yaku27').data('fan', 5);
    $('#option-yaku11').prop('checked',false);
  }
  else if(hora==='01'&&$('.landscape:not(.landscape-re)').length>0){
    $('#option-yaku16').data('fan', 1);
    $('#option-yaku19').data('fan', 1);
    $('#option-yaku20').data('fan', 1);
    $('#option-yaku24').data('fan', 2);
    $('#option-yaku25').data('fan', 2);
    $('#option-yaku27').data('fan', 5);
    $('#option-yaku11').prop('checked',false);
  }

  //役満複合除外
  $.each($('[data-fan="13"]'), function(){
      if($(this).is(':checked')){
        $('[data-fan]:not([data-fan="13"])').prop('checked',false);
      }
    });

  scores();
}

function calcKokushi(){
  $('input[id*="option-yaku"]').prop('checked', false);
  $('#option-yaku29').prop('checked', true);
  tr = '<tfoot><tr><th>計</th><td colspan="3">0符</td></tr></tfoot>';
  $('#result-haishi-table').append(tr);
  tr = '';
  scores();
}

function scores(){
  //役テーブル書き出し
  
fan = 0;
  $('[id*="option-yaku"]:checked').each(function(){
    if($(this).data('fan')!='13'){
      tr += '<tr><th>' + $(this).attr('value') + '</th><td>' + $(this).data('fan') + '飜</td></tr>';
    }
    else {
      tr += '<tr><th>' + $(this).attr('value') + '</th><td>役満</td></tr>';
    }
    fan += Number($(this).data('fan'));
    $('#result-yaku-table').append(tr);
    tr = '';
  });
  
  dora = 0;
  if($('#haishi .dora').length>0){
    dora += $('#haishi .dora').length;
  }
  if($('#haishi .red').length>0){
    dora += $('#haishi .red').length;
  }
  if(dora>0){
    tr = '<tr><th>ドラ</th><td>' + dora + '飜</td></tr>';
    fan += dora;
    $('#result-yaku-table').append(tr);
    tr = '';
  }

  switch(fan){
    case 0:
    case 1:
    case 2:break;
    case 3:if(fuResult>=70){mangan=true;}break;
    case 4:if(fuResult>=40){mangan=true;}break;
    case 5:mangan=true;break;
    case 6:
    case 7:haneman=true;break;
    case 8:
    case 9:
    case 10:baiman=true;break;
    case 11:
    case 12:sanbaiman=true;break;
    default:yakuman=true;break;
  }

  if(moreHai){
    alert('5つ以上存在する牌があります');
    yaku = false;
  }
  else if($('[name="option-yaku"]:checked').length<1){
    alert("役がありません");
    yaku = false;
  }
  else{
    yaku = true;
  }

  if(yaku){
    if(yakuman){fanResult = '<tfoot><tr><th>計</th><td>（役満）' + fan + '飜</td></tr></tfoot>';}
    else if(sanbaiman){fanResult = '<tfoot><tr><th>計</th><td>（三倍満）' + fan + '飜</td></tr></tfoot>';}
    else if(baiman){fanResult = '<tfoot><tr><th>計</th><td>（倍満）' + fan + '飜</td></tr></tfoot>';}
    else if(haneman){fanResult = '<tfoot><tr><th>計</th><td>（跳満）' + fan + '飜</td></tr></tfoot>';}
    else if(mangan){fanResult = '<tfoot><tr><th>計</th><td>（満貫）' + fan + '飜</td></tr></tfoot>';}
    else{fanResult = '<tfoot><tr><th>計</th><td>' + fan + '飜</td></tr></tfoot>';}
    $('#result-yaku-table').append(fanResult);
  
    //点数表示
    $('#result-scores').html('');
  
    $.getJSON('data/json/score.json', function(data) {
      if(yakuman===true){scoreKey = 'yakuman';}
      else if(sanbaiman===true){scoreKey = 'sanbaiman';}
      else if(baiman===true){scoreKey = 'baiman';}
      else if(haneman===true){scoreKey = 'haneman';}
      else if(mangan===true){scoreKey = 'mangan';}
      else{
        scoreKey = fan + '_' + fuResult;
      }
      scoreName = data[scoreKey].name;
      if(oyako == '01'){
        scoreResult = data[scoreKey].resultOya;
      }
      else{
        scoreResult = data[scoreKey].result;
      }
      scoreOya = data[scoreKey].oya;
      scoreKo = data[scoreKey].ko;
      
      score = '';
      score += '<span>' + scoreName + '</span>';
      score += '<strong>' + scoreResult + '</strong>';
      if(oyako == '01'){
        score += '<span>' + scoreOya + '</span>';    
      }
      else{
        score += '<span>' + scoreKo + '</span>';    
      }
      $('#result-scores').append(score);
    });
  }
}
