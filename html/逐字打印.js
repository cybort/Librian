﻿待打印文字=''
!function (e) {
	function 循环(e){
		if(待打印文字){
			while((待打印文字[0]=='<')||(待打印文字[0]=='/')){	//屏蔽html字符……
				e.attr('f',e.attr('f')+待打印文字[0])
				待打印文字=待打印文字.slice(1)
			}
			e.attr('f',e.attr('f')+待打印文字[0])
			待打印文字=待打印文字.slice(1)
			e.html(e.attr('f'))
			setTimeout(function () {
				循环(e)
			}, 設置.內容.文字速度)
		}
		else{
			$('#嘀').attr('src','');
		}
	}
	e.fn.逐字打印 = function (n,嘀=false) { 
        d = e(this)
        if(設置.內容.文字速度==0){
            待打印文字=''
            d.empty()
            d.attr('f','')
            d.html(n)
            return
        }
		if(嘀)
			$('#嘀').attr('src','./static/嘀.mp3');
		待打印文字=n
		d.empty()
		d.attr('f','')
		循环(d)
	}
}
(jQuery);
