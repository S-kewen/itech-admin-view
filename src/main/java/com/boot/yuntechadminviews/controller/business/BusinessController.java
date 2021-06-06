package com.boot.yuntechadminviews.controller.business;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: BusinessController
 * @Description: controller
 * @Date: 2020-04-03
 */
@Controller

public class BusinessController {
    @RequestMapping("business/listAdvert")
    public String listAdvert() {
        return "business/listAdvert";
    }
    @RequestMapping("business/addAdvert")
    public String addAdvert() {
        return "business/addAdvert";
    }
    @RequestMapping("business/editAdvert")
    public String editAdvert() {
        return "business/editAdvert";
    }
}

