package com.boot.yuntechadminviews.controller.recharge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: skwen
 * @ClassName: RechargeController
 * @Description: controller
 * @Date: 2020-04-04
 */
@Controller

public class RechargeController {
    @RequestMapping("recharge/listCard")
    public String listCard() {
        return "recharge/listCard";
    }
    @RequestMapping("recharge/listRechargeRecord")
    public String listRechargeRecord() {
        return "recharge/listRechargeRecord";
    }
    @RequestMapping("recharge/addCard")
    public String addCard() {
        return "recharge/addCard";
    }
}
