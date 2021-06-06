package com.boot.yuntechadminviews.controller.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: SystemController
 * @Description: controller
 * @Date: 2020-03-27
 */
@Controller

public class SystemController {
    @RequestMapping("system/addFeedback")
    public String addFeedback() {
        return "system/addFeedback";
    }
    @RequestMapping("system/listNotice")
    public String listNotice() {
        return "system/listNotice";
    }
    @RequestMapping("system/addNotice")
    public String addNotice() {
        return "system/addNotice";
    }
    @RequestMapping("system/editNotice")
    public String editNotice() {
        return "system/editNotice";
    }
    @RequestMapping("system/listMessageBoard")
    public String listMessageBoard() {
        return "system/listMessageBoard";
    }
    @RequestMapping("system/listFeedback")
    public String listFeedback() {
        return "system/listFeedback";
    }
    @RequestMapping("system/listSystemLog")
    public String listSystemLog() {
        return "system/listSystemLog";
    }
}
