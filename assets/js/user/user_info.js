$(function() {
    //自定义验证规则
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度为1~6位之间'
            }
        }
    })


    // 用户渲染
    initUserInfo()
        // 导出layer
    var layer = layui.layer
        // 封装函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            succecc: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //   成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单
    $('#btnReset').on('click', function(e) {
        // 阻止重置
        e.preventDefault()
            // 重新渲染函数
        initUserInfo()
    })
})