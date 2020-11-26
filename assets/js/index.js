$(function() {
    // 1. 获取用户信息
    getUserInof()
        // 2. 退出功能
    var layer = layui.layer
    $('#logoout').on('click', function() {
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function(index) {
            //   清空本地token
            localStorage.removeItem('token')
                // 页面跳转
            location.href = "/login.html"
                // 关闭询问框
            layer.close(index);
        });
    })
})


function getUserInof() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     //重新登录，因为token过期时间12小时
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res) {
            console.log(res);
            //判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功,渲染用户头像信息
            renderAvatar(user.data)
        }
    })
}

//封装用户头像渲染函数 (用户头像：renderAvatar)
function renderAvatar(user) {
    // 1.用户名（昵称优先，没有昵称用usernme）
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
        // 用户头像
    if (user.user_pic !== null) {
        //   有头像，显示图片头像，文字头像隐藏
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        // 没有头像，隐藏图片头像，显示文字头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }

}