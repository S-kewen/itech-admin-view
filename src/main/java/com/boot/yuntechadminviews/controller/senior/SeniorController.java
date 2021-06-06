package com.boot.yuntechadminviews.controller.senior;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: SeniorController
 * @Description: controller
 * @Date: 2020-04-05
 */
@Controller

public class SeniorController {
    @RequestMapping("senior/listMessageQueue")
    public String listMessageQueue() {
        return "senior/listMessageQueue";
    }
    @RequestMapping("senior/seeMessageQueue")
    public String seeMessageQueue() {
        return "senior/seeMessageQueue";
    }
}
