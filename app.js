/*
2018.3.20
应用程序的启动（入口）文件
 */

//加载express模块
var express =  require('express');

//加载模板处理模块
var swig = require('swig');

//创建app应用 => NodeJS Http.createServer();
var app = express();

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀,第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是view，第二个参数是目录
app.set('views', './views')
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

app.use('/admin', require('/routers/admin'));
app.use('/api', require('/routers/api'));
app.use('/', require('/routers/main'));

/*
 *  首页
 *  req request对象
 *  res response对象
 *  next 函数

app.get('/', function (req, res, next) {
    //res.send('<h1>欢迎光临我的博客！</h1>');

       *读取views目录下的指定文件，解析并返回给客户端
       * 第一个参数：表示模板的文件，相当于views目录 views/index.htmml
       * 第二个参数：传递给模板使用的数据

    res.render('index');

});


app.get('/main.css', function (req, res, next) {
    res.setHeader('content-type', 'text/css');
    res.end("body {background: red;}");
});
*/


//监听http请求
app.listen(8081);

/*
*用户发送http请求 -> url -> 解析路由 ->找到匹配的规则 -> 指定绑定函数，返回对应内容至用户
* /public -> 静态 -> 直接读取指定目录下的文件，返回给用户 -> 动态 -> 处理业务员逻辑，加载模板 ->
 */
