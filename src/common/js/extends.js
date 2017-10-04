function formatDate (data, str) {  
	  var o = {   
	    "M+" : data.getMonth()+1,                 //月份   
	    "d+" : data.getDate(),                    //日   
	    "h+" : data.getHours(),                   //小时   
	    "m+" : data.getMinutes(),                 //分   
	    "s+" : data.getSeconds(),                 //秒   
	    "q+" : Math.floor((data.getMonth()+3)/3), //季度   
	    "S"  : data.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(str))   
	    str=str.replace(RegExp.$1, (data.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(str))   
	  str = str.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return str;
}

function URLparse () {
	var obj =  {};
	var search = location.search;
	var searchReg = /[\?&]?\w+=\w+/g;
	search.match(searchReg).forEach((item) => {
		var parse = item.substr(1).split("=");
		obj[parse[0]] = parse[1];
	});
	return obj;
}

export { formatDate , URLparse}