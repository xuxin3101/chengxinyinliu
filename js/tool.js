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

function getindex() {
	var page = getpara().page
	if (page == undefined)
		page = ""
	http.get("./api/getindex.php?page=" + page, function (err, result) {
		var data = result;
		if (typeof data == 'string')
			data = JSON.parse(data.trim());
		var container = document.getElementById("container");


		for (var idx in data) {
			var tmp = document.createElement("div");
			tmp.style = "color:#f5c951;text-align:center;display:inline-block;height:31rem;width:27rem;margin-left:2rem;";
			var a = document.createElement("a");
			a.href = "detail.html?id=" + data[idx].id
			a.title = data[idx].title
			a.target = target = '_self'
			var img = document.createElement("img");
			var p = document.createElement("p");
			p.innerHTML = data[idx].title
			img.src = data[idx].logo
			img.className = "cover-image"
			img.alt = data[idx].title
			a.appendChild(img)
			a.appendChild(p)
			tmp.appendChild(a)
			container.appendChild(tmp)
		}
		getpage();



	})
}

function getdetail() {
	var id = getpara().id
	http.post({
		url: "./api/getdetail.php",
		data: "id=" + id,
		timeout: 1000
	}, function (err, result) {
		var data = result
		if (typeof data == 'string')
			data = JSON.parse(data.trim());
		var content = document.getElementById("content");
		var logo = document.getElementById("logo");
		var time = document.getElementById("time");
		var cishu = document.getElementById("cishu");
		var title = document.getElementById("title");
		document.title = data.title
		cishu.innerHTML = data.cishu
		title.innerHTML = data.title
		time.innerHTML = data.time
		logo.src = data.logo;
		var co = data.content.split("\n");
		for (var idx in co) {
			var tmp = document.createElement("div")
			tmp.innerHTML = co[idx] + "<br/>"
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

function gettuijian() {
	http.get("./api/gettuijian.php", function (err, result) {
		var data = result
		if (typeof data == 'string')
			data = JSON.parse(data.trim());
		var tuijian = document.getElementById("tuijian");
		for (var idx in data) {
			var tmp = document.createElement("div");
			tmp.style = "product-hot-list col-md-12 col-sm-4 col-xs-4 text-center margin-bottom-10"
			var a = document.createElement("a");
			a.href = "detail.html?id=" + data[idx].id
			a.title = data[idx].title
			a.target = target = '_self'
			a.className = "img"
			var img = document.createElement("img");
			var p = document.createElement("p");
			p.innerHTML = data[idx].title
			img.src = data[idx].logo
			img.className = "img-responsive"
			img.style = "height:250px"
			img.alt = data[idx].title
			a.appendChild(img)
			a.appendChild(p)
			tmp.appendChild(a)
			tuijian.appendChild(tmp)
		}


	})
}

function getpage() {
	var opage = getpara().id
	if (opage == undefined)
		opage = 1
	http.get("./api/getpage.php", function (err, result) {
		var data = result
		if (typeof data == 'string')
			data = JSON.parse(data.trim())
		var container = document.getElementById("container");
		var page = data.shuliang / 23;

		var div = document.createElement("div");
		div.className = "met_pager"
		var index = document.createElement("a");
		index.innerHTML = "首页"
		index.href = "index.html"
		if (opage != 1) {
			var back = document.createElement("a");
			back.innerHTML = "首页"
			back.href = "index.html?page=" + parseInt(opage - 1)
			div.appendChild(next)
		}

		var endpage = document.createElement("a");
		endpage.innerHTML = "尾页"
		var end = page + 1
		endpage.href = "index.html?page=" + parseInt(end)
		div.appendChild(index)
		var i = opage
		if (opage + 10 <= page + 1) {
			page = opage + 10
		} else {
			page = opage
		}

		for (; i <= page; i++) {
			var a = document.createElement("a");
			a.innerHTML = i
			var tmp = i;
			a.href = "index.html?page=" + tmp
			div.appendChild(a)
		}
		if (opage != parseInt(end)) {
			var next = document.createElement("a");
			next.innerHTML = "下一页"
			next.href = "index.html?page=" + parseInt(opage + 1)
			div.appendChild(next)
		}

		div.appendChild(endpage)
		container.appendChild(div)

	})
}

function serach() {
	var keyword = getpara().keyword
	http.post({
		url: "./api/search.php",
		data: "keyword=" + keyword,
		timeout: 1000
	}, function (err, result) {
		var data = result
		if (typeof data == 'string')
			data = JSON.parse(data.trim())
		var container = document.getElementById("container");
		for (var idx in data) {
			var li = document.createElement("li");
			var div1 = document.createElement("div");
			div1.className = "media media-lg"
			var div2 = document.createElement("div");
			div2.className = "media-left"
			var a1 = document.createElement("a");
			a1.href = "detail.html?id=" + data[idx].id
			var img = document.createElement("img");
			img.className = "media-object"
			img.src = data[idx].logo
			a1.appendChild(img)
			div2.appendChild(a1)
			div1.appendChild(div2)
			var div3 = document.createElement("div");
			div3.className = "media-body"
			var h4 = document.createElement("h4");
			h4.className = "media-heading"
			var a2 = document.createElement("a");
			a2.href = "detail.html?id=" + data[idx].id
			a2.innerHTML = data[idx].title
			h4.appendChild(a2)
			div3.appendChild(h4)
			var p = document.createElement("p");
			p.className = "info"
			var span1 = document.createElement("span");
			span1.innerHTML = data[idx].time
			var span2 = document.createElement("span");
			span2.className = "margin-left-10"
			span2.innerHTML = "信诚"
			var span3 = document.createElement("span");
			span3.className = "margin-left-10"
			var i = document.createElement("i");
			i.className = "icon wb-eye margin-right-5"
			i.innerHTML = data[idx].cishu
			span3.appendChild(i)
			p.appendChild(span1)
			p.appendChild(span2)
			p.appendChild(span3)
			div3.appendChild(p)
			div1.appendChild(div3)
			li.appendChild(div1)
			container.appendChild(li)
		}

	})
}

function searchdemo() {
	var id = getpara().id
	var shanng = document.getElementById("shang")
	var xia = document.getElementById("xia")
	http.post({
		url: "./api/getdemodetail.php",
		data: "id=" + id,
		timeout: 1000
	}, function (err, result) {
		var data = result
		if (typeof data == 'string')
			data = JSON.parse(data.trim());
		var time = document.getElementById("time");
		var cishu = document.getElementById("cishu");
		var title = document.getElementById("title");
		var video = document.getElementById("video");
		document.title = data.title
		cishu.innerHTML = data.count
		title.innerHTML = data.title
		time.innerHTML = data.time
		video.src = data.link

	})
	var tmpid = id + 1
	http.post({
		url: "./api/getdemodetail.php",
		data: "id=" + tmpid,
		timeout: 1000
	}, function (err, result) {
		var data = result
		if (typeof data == 'string')
			data = JSON.parse(data.trim());
		if (data == null) {
			xia.innerHTML = "下一篇：没有了"
		} else {
			xia.innerHTML = "下一篇：" + data.title
		}

	})
	var shangid = id - 1
	if (shangid == 0)
		shang.innerHTML = "上一篇：没有了"
	else {
		http.post({
			url: "./api/getdemodetail.php",
			data: "id=" + shangid,
			timeout: 1000
		}, function (err, result) {
			var data = result
			if (typeof data == 'string')
				data = JSON.parse(data.trim());
			if (data == null) {
				shang.innerHTML = "上一篇：没有了"
			} else {
				shang.innerHTML = "上一篇：" + data.title
			}

		})
	}

}
function getskilldetail() {
	var id = getpara().id
	http.post({
		url: "./api/getskilldetail.php",
		data: "id=" + id,
		timeout: 1000
	}, function (err, result) {
		var data = result
		if (typeof data == 'string')
			data = JSON.parse(data.trim());
		var content = document.getElementById("content");
		var logo = document.getElementById("logo");
		var time = document.getElementById("time");
		var cishu = document.getElementById("cishu");
		var title = document.getElementById("title");
		document.title = data.title
		cishu.innerHTML = data.cishu
		title.innerHTML = data.title
		time.innerHTML = data.time
		logo.src = data.logo;
		var co = data.content.split("\n");
		for (var idx in co) {
			var tmp = document.createElement("div")
			tmp.innerHTML = co[idx] + "<br/>"
			content.appendChild(tmp)
		}
	})

}

