package com.boot.yuntechadminviews.controller.express;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: ExpressController
 * @Description: controller
 * @Date: 2020-04-02
 */
@Controller

public class ExpressController {
    @RequestMapping("express/listExpressTaker")
    public String listExpressTaker() {
        return "express/listExpressTaker";
    }
    @RequestMapping("express/listExpressScore")
    public String listExpressScore() {
        return "express/listExpressScore";
    }
    @RequestMapping("express/listExpressIntegral")
    public String listExpressIntegral() {
        return "express/listExpressIntegral";
    }
    @RequestMapping("express/seeExpressTaker")
    public String seeExpressTaker() {
        return "express/seeExpressTaker";
    }

}

