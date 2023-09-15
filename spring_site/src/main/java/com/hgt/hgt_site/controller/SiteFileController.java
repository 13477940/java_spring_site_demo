package com.hgt.hgt_site.controller;

import app.pattern.RespChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SiteFileController {

    @Async
    @GetMapping(value = {"/up_file/**"})
    public void site_file_fn(HttpServletRequest request, HttpServletResponse response) {
        process_request_fn(request, response);
    }

    @Async
    @GetMapping(value = {"/HJT_SITE/up_file/**"})
    public void site_file_fn_hosting(HttpServletRequest request, HttpServletResponse response) {
        process_request_fn(request, response);
    }

    private void process_request_fn(HttpServletRequest request, HttpServletResponse response) {
        RespChain resp_chain = new RespChain(request, response);
        resp_chain.start("site_file");
    }

}
