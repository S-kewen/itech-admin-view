package com.boot.yuntechadminviews.controller.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: HomeController
 * @Description: controller
 * @Date: 2020-03-27
 */
@Controller

public class HomeController {
    @RequestMapping("/home/console")
    public String console() {
        return "home/console";
    }
}
