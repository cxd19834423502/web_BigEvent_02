$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从input中获取form对象
    var form = layui.form
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
        //自定义一个pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            //还需拿到密码框中的额内容
            //进行批次等于判断
            //判断失败返回一个提示消息
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 4.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
            // 发送ajax
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //提交成功后的处理代码
                layer.msg('注册成功，请登录！');
                //手动切换到登录表单
                $('#link_login').click()
                    // 重置form表单
                $('#form_reg')[0].reset()
            }
        })
    })


    // 5.登录功能
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您,登录成功！")
                localStorage.setItem("token", res.token)
                location.href = "/index.html"

            }




        })
    })





})