var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  response.statusCode = 200;
  const filePath = path === "/" ? "/index.html" : path;
  const index = filePath.lastIndexOf("."); //找到filePath地址中的最后一个'.' ， lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
  const suffix = filePath.substring(index); //获取filePath地址中的后缀
  //suffix 是英文后缀的意思
  const fileType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpg",
  }; //列举的一些后缀类型
  response.setHeader(
    "Content-Type",
    "${fileType[suffix] || 'text/html'};charset=utf-8"
  ); //  如果不是以上的后缀，就是认为是 'text/html'
  let content;
  try {
    Content = fs.readFileSync(`./public${filePath}`); //用${filePath}代替原先的   /+地址
  } catch (error) {
    content = "文件不存在";
    response.statusCode = 404;
  }
  response.write(Content);

  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
