package com.boot.yuntechadminviews.controller.school;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: ExpressController
 * @Description: controller
 * @Date: 2020-04-02
 */
@Controller

public class SchoolController {
    @RequestMapping("school/listYuntechExpress")
    public String listYuntechExpress() {
        return "school/listYuntechExpress";
    }
}

