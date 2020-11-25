//开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
    // 测试环境开发地址
    // 生产环境服务器地址
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url
})