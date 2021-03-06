演出=new Object();

演出.準備工作 = function(){
	$("<link>")
		.attr({ rel: "stylesheet",
		type: "text/css",
		href: 演出.自定css
	}).appendTo("head");
	$('#总画面').css('width',解析度[0])
	$('#总画面').css('height',解析度[1])
	if(邊界) $('div').css('border','1px solid #22f');
	演出.換圖('cover','url(static/None.png)',0);
	演出.換圖('bg','url(static/None.png)',0);
	演出.換圖('cg','url(static/None.png)',0);
	演出.換圖('ch','url(static/.png)',0);
	演出.更新()
}


演出.步進更新 = function(){
	send('步進更新');
}

演出.更新 = function(){
	send('更新')
}

演出.信息預處理 = function(data){
	if(!data.bg)
		data.bg='url(static/None.png)';
	else
		data.bg='url('+演出.圖片文件夾+'/'+data.bg+')';
	if(!data.cg)
		data.cg='url(static/None.png)';
	else
		data.cg='url('+演出.圖片文件夾+'/'+data.cg+')';

	if(data.bgm[0]!='None')
		data.bgm[0]=演出.音樂文件夾+'/'+data.bgm[0];
	if(data.name!='') {
		data.name='【'+data.name+'】';
        data.word='「'+data.word+'」';
		$('#name_bg').fadeIn(200);
	}else{
		data.word='　　'+data.word;
		$('#name_bg').fadeOut(200);
	}
}

//得到信息全部改變頁面
演出.改變演出狀態 = function(data) {
	演出.信息預處理(data)
	if(data.choice.length>0){
		演出.處理選項(data.choice);
		return
	}
	if(data.info){
		if(data.info[0]=='cut'){
			data.name=''
			data.word=''
			data.bgm=['None',0]
			演出.插入圖(data.info[1])
		}
		if(data.info[0]=='video')
			演出.放視頻(data.info[1])
		if(data.info[0]=='load')
			演出.load特效()
	}
	演出.換cg(data.cg);
	演出.換bg(data.bg);
	演出.換立繪(data.ch);
	演出.換bgm(data.bgm);
	演出.換人名(data.name);
	演出.換對話(data.word,data.name);
}

演出.選擇之刻=false;
演出.處理選項 = function(choice){
	var tot='';
	for(var i in choice)
		tot+='<button onclick="演出.點選項('+i+');">' +choice[i]+'</botton>';
	$('#choice').html(tot);
	$('#choice').show(250);
	演出.選擇之刻=true
}
演出.點選項 = function (x){
	$('#choice').hide(250);
	send('選',x+'');
	演出.選擇之刻=false
}

演出.插入圖 = function(圖){
	控制.左鍵屏蔽=true;
	$('#cover').css('display','block');
    $('#总画面').fadeOut(1400);
	setTimeout( (function(){ 演出.換圖('cover','url('+演出.圖片文件夾+'/'+圖+')',0);})   , 1500);
    setTimeout( (function(){ 演出.步進更新();                                  })       ,1500);
    setTimeout( (function(){ $('#总画面').fadeIn(1100);                       })       ,1500);
	setTimeout( (function(){ 演出.換圖('cover','url(static/None.png)',1);})             , 4500);
    setTimeout( (function(){ $('#cover').css('animation','');}), 5550);
    setTimeout( (function(){ $('#cover').css('display','none');}), 5600);
    setTimeout( (function(){ 控制.左鍵屏蔽=false;    })                                 , 5600);
}

演出.放視頻 = function(視頻){
	控制.左鍵屏蔽=true;
	var v=$('video');
	v.css('display','block');
	v.attr('src',演出.視頻文件夾+'/'+視頻);
	v[0].addEventListener('ended', function () {  
		演出.步進更新();
		setTimeout( (function(){ v[0].style.display = 'none'; 控制.左鍵屏蔽=false; }) , 500);
	}, false);
	v[0].play();
}

演出.load特效 = function(){
    控制.左鍵屏蔽=true;
    $('#总画面').fadeOut(0);
    $('#总画面').fadeIn(1200);
    setTimeout( (function(){ 控制.左鍵屏蔽=false;    }) , 1000);
}

演出.提示 = function(x){
    $('#提示').html(x);
    $('#提示').fadeIn(300);
    $('#提示').hide(1000);
}

演出.現在cg='None'
演出.換cg = function(cg){
	if(cg===演出.現在cg)
		return;
	演出.現在cg=cg
	演出.換圖('cg',cg,1);
}

//改變立繪
演出.換立繪 = function(text){
	$('#ch').html(text)
}	

演出.現在bg='None'
演出.換bg = function(bg){
	if(bg===演出.現在bg)
		return;
	現在bg=bg
	if(bg==='None')
		bg='url(static/None.png)'
	演出.換圖('bg',bg,1.4);
}

演出.換人名 = function(text) {
	$('#name').html(text);
	$('#history').append(text+'<br/>');
}

演出.換對話 = function (text,name) {
    if (name)
        $('#word').逐字打印(text,true);
    else
        $('#word').逐字打印(text);
    $('#history').append(text+'<br/><br/>');
}

演出.當前曲名='None'
演出.換bgm = function(bgm){
	var 曲名=bgm[0],音量=bgm[1];
	var au=$('#bgm');
	if(演出.當前曲名==曲名) return;
	演出.當前曲名=曲名
	if(演出.當前曲名=='None'){
		au.stop()
		au.animate({volume: 0}, 2000);
		setTimeout( (function(){ au.attr('src',演出.當前曲名); }) , 2000);
	}else{
		au.stop()
        au.attr('src',演出.當前曲名);
        au.animate({volume: 0}, 0);
		au.animate({volume: 音量}, 2000);
	}
}
//改變圖像，通用
演出.換圖 = function(dst,img_b,time){
	var frame='A'+Math.ceil(Math.random()*999999).toString();
	var img_a;
	dst='#'+dst;
	img_a=$(dst).attr('my_img');
	
    if (time>0){
	   $(dst).css('animation','');
	   $('#style').append('@keyframes '+frame+'{ 0%{background-image:'+img_a+';}100%{background-image:'+img_b+';} }\n');
	   $(dst).css('animation',frame+' '+time.toString()+'s');	
	}
    $(dst).css('background-image',img_b);
	
	$(dst).attr('my_img',img_b);
}
