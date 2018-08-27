var http = {};
http.quest = function (option, callback) {
	var url = option.url;
	var method = option.method;
	var data = option.data;
	var timeout = option.timeout || 0;

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 400) {
				var result = xhr.responseText;
				try {
					result = JSON.parse(xhr.responseText);
				} catch (e) {}
				callback && callback(null, result);
			} else {
				callback && callback('status: ' + xhr.status);
			}
		}
	}.bind(this);
	xhr.open(method, url, true);
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	if (typeof data === 'object') {
		try {
			data = JSON.stringify(data);
		} catch (e) {}
	}
	xhr.send(data);
	xhr.ontimeout = function () {
		callback && callback('timeout');
		console.log('%c连%c接%c超%c时', 'color:red', 'color:orange', 'color:purple', 'color:green');
	};
};

http.get = function (url, callback) {
	var option = url.url ? url : {
		url: url
	};
	option.method = 'get';
	this.quest(option, callback);
};

http.post = function (option, callback) {
	option.method = 'post';
	this.quest(option, callback);
};
function getindex(){
	http.get("./api/getindex.php",function(err,result){
		var data= result;
		if(typeof data=='string')
		data=JSON.parse(data.trim());
		var container=document.getElementById("container");
		for(var idx in data){
			var tmp=document.createElement("div");
			tmp.style="color:#f5c951;text-align:center;display:inline-block;height:31rem;width:27rem;margin-left:2.5rem;";
			var a=document.createElement("a");
			a.href="detail.html?id="+data[idx].id
			a.title=data[idx].title
			a.target=target='_self' 
			var img=document.createElement("img");
			var p=document.createElement("p");
			p.innerHTML=data[idx].title
			img.src=data[idx].logo
			img.className="cover-image"
			img.alt=data[idx].title
			a.appendChild(img)
			a.appendChild(p)
			tmp.appendChild(a)
			container.appendChild(tmp)
		}
	
	

	})
}
function getdetail(){
	var id=getpara().id
	http.post({url:"./api/getdetail.php",data:"id="+id,timeout:1000},function(err,result){
		var data=result
		if(typeof data=='string')
		data=JSON.parse(data.trim());
		var content=document.getElementById("content");
		var logo=document.getElementById("logo");
		var time=document.getElementById("time");
		time.innerHTML=data.time
		logo.src=data.logo;
		var co=data.content.split("\n");
		for (var idx in co) {
			var tmp = document.createElement("div")
			tmp.innerHTML = co[idx]+"<br/>"
			content.appendChild(tmp)
		}
	})

}
function getpara() {
	var url = location.search
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
function gettuijian(){
	http.get("./api/gettuijian.php",function(err,result){
		var data=result
		if(typeof data=='string')
		data=JSON.parse(data.trim());
		var tuijian=document.getElementById("tuijian");
		for(var idx in data){
			var tmp=document.createElement("div");
			tmp.style="product-hot-list col-md-12 col-sm-4 col-xs-4 text-center margin-bottom-10"
			var a=document.createElement("a");
			a.href="detail.html?id="+data[idx].id
			a.title=data[idx].title
			a.target=target='_self' 
			a.className="img"
			var img=document.createElement("img"); 
			img.src=data[idx].logo
			img.className="img-responsive"
			img.style="height:250px"
			img.alt=data[idx].title
			a.appendChild(img)
			tmp.appendChild(a)
			tuijian.appendChild(tmp)
		}


	})
}