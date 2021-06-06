package com.boot.yuntechadminviews.controller.flow;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: skwen
 * @ClassName: UserController
 * @Description: controller
 * @Date: 2020-03-30
 */
@Controller

public class FlowController {
    @RequestMapping("flow/listYuntechFlowConfig")
    public String listYuntechFlowConfig() {
        return "flow/listYuntechFlowConfig";
    }
    @RequestMapping("flow/listYuntechFlow")
    public String listYuntechFlow() {
        return "flow/listYuntechFlow";
    }
    @RequestMapping("flow/listYuntechFlowSet")
    public String listYuntechFlowSet() {
        return "flow/listYuntechFlowSet";
    }
    @RequestMapping("flow/listYuntechFlowWarn")
    public String listYuntechFlowWarn() {
        return "flow/listYuntechFlowWarn";
    }
    @RequestMapping("flow/editYuntechFlowSet")
    public String editYuntechFlowSet() {
        return "flow/editYuntechFlowSet";
    }
}

