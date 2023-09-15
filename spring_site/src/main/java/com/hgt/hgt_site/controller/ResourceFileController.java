package com.hgt.hgt_site.controller;

import app.pattern.RespChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceFileController {

    /**
     * 主要是解決 resources/static/專案名稱，於 idea 啟動獨立 tomcat 環境根目錄對應的問題
     */
    @Async
    @GetMapping(value = {"/script/**", "/css/**", "/file/**"})
    public void resource_file_fn(HttpServletRequest request, HttpServletResponse response) {
        process_request_fn(request, response);
    }

    private void process_request_fn(HttpServletRequest request, HttpServletResponse response) {
        RespChain resp_chain = new RespChain(request, response);
        resp_chain.start("resource_file");
    }

}
