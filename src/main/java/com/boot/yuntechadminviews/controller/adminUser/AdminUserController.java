package com.boot.yuntechadminviews.controller.adminUser;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: skwen
 * @ClassName: AdminUserController
 * @Description: controller
 * @Date: 2020-03-27
 */
@Controller

public class AdminUserController {
    @RequestMapping("adminUser/index")
    public String index() {
        return "adminUser/index";
    }
    @RequestMapping("adminUser/listLoginRecord")
    public String listLoginRecord() {
        return "adminUser/listLoginRecord";
    }
    @RequestMapping("adminUser/listMessage")
    public String listMessage() {
        return "adminUser/listMessage";
    }
    @RequestMapping("/adminUser/modifyInfo")
    public String modifyInfo() {
        return "adminUser/modifyInfo";
    }

    @RequestMapping("/adminUser/modifyPassword")
    public String modifyPassword() {
        return "adminUser/modifyPassword";
    }
}
