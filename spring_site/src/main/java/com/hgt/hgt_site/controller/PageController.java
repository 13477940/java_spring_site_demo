package com.hgt.hgt_site.controller;

import app.pattern.RespChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PageController {

    @Async
    @GetMapping(value = {"/","/index"})
    public void site_page_fn(HttpServletRequest request, HttpServletResponse response) {
        process_request_fn(request, response);
    }

    @Async
    @GetMapping({"/HJT_SITE","/HJT_SITE/index"})
    public void site_page_fn_hosting(HttpServletRequest request, HttpServletResponse response) {
        process_request_fn(request, response);
    }

    private void process_request_fn(HttpServletRequest request, HttpServletResponse response) {
        RespChain resp_chain = new RespChain(request, response);
        resp_chain.start("page_service");
    }

}
