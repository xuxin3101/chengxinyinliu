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
		for(var idx in data){
			var container=document.getElementById("container");
			var tmp=document.createElement("div");
			tmp.style="color:#f5c951;text-align:center;display:inline-block;height:31rem;width:27rem;";
			var a=document.createElement("a");
			a.href="detail?id="+data[idx].id
			a.title=data[idx].title
			a.target=target='_self' 
			var img=document.createElement("img");
			img.src=data[idx].logo
			img.className="cover-image"
			img.alt=data[idx].title
			a.appendChild(img)
			tmp.appendChild(a)
			container.appendChild(tmp)
		}
	
	

	})
}