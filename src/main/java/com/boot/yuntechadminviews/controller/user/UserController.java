package com.boot.yuntechadminviews.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: UserController
 * @Description: controller
 * @Date: 2020-03-30
 */
@Controller

public class UserController {
    @RequestMapping("user/listUser")
    public String listUser() {
        return "user/listUser";
    }

    @RequestMapping("user/listLoginRecord")
    public String listLoginRecord() {
        return "user/listLoginRecord";
    }

    @RequestMapping("user/listMessage")
    public String listMessage() {
        return "user/listMessage";
    }

    @RequestMapping("user/editUser")
    public String editUser() {
        return "user/editUser";
    }

    @RequestMapping("user/listTransaction")
    public String listTransaction() {
        return "user/listTransaction";
    }
    @RequestMapping("user/listCertification")
    public String listCertification() {
        return "user/listCertification";
    }
    @RequestMapping("user/listBindingLine")
    public String listBindingLine() {
        return "user/listBindingLine";
    }


}
