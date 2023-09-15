(function(){

    // css dynamic value
    (function(){
        var ui_key_str = "_css_" + website.randomString(16);
        var timer = null;
        $(window).on("resize", function(){
            if(null != timer) clearTimeout(timer);
            timer = setTimeout(function(){
                // check_window_size();
            }, 350);
        });
        function check_window_size() {
            var elem = $("div[_style_key="+ui_key_str+"]");
            elem.remove();
            var arr = [];
            arr.push("<div _style_key='"+ui_key_str+"'><style> :root{");
            (function(){
                var fix_width = $(window).width() - website.scroll_width();
                arr.push("--window_width: "+fix_width+"px;");
                arr.push("--window_height: "+$(window).height()+"px;");
            })();
            arr.push("} </style></div>");
            $("body").append(arr.join(""));
        }
        // init
        check_window_size();
        // now year
        $("div[ui_key=now_year_value]").html(moment().format("yyyy"));
    })();

    var view_mode = "mobile"; // mobile first
    (function(){
        var timer = null;
        $(window).on("resize", function(){
            if(null != timer) clearTimeout(timer);
            timer = setTimeout(function(){
                check_width_fn();
            }, 500);
        });
        function check_width_fn() {
            var width = $(window).width();
            if(900 >= width) {
                view_mode = "mobile";
                $("div[device_ui=mobile]").css("display", "block");
                $("div[device_ui=desktop]").css("display", "none");
                $("div[device_ui=whdpi]").css("display", "none");
                mobile_ui_fn();
            } else {
                view_mode = "desktop";
                $("div[device_ui=mobile]").css("display", "none");
                $("div[device_ui=desktop]").css("display", "block");
                $("div[device_ui=whdpi]").css("display", "none");
                desktop_ui_fn();
                /*
                if(1680 >= width) {
                    view_mode = "desktop";
                    $("div[device_ui=mobile]").css("display", "none");
                    $("div[device_ui=desktop]").css("display", "block");
                    $("div[device_ui=whdpi]").css("display", "none");
                    desktop_ui_fn();
                } else {
                    view_mode = "whdpi";
                    $("div[device_ui=mobile]").css("display", "none");
                    $("div[device_ui=desktop]").css("display", "none");
                    $("div[device_ui=whdpi]").css("display", "block");
                    // whdpi_ui_fn();
                }*/
            }
        }
        check_width_fn();
    })();

    var mobile_init = 0;
    function mobile_ui_fn() {
        if(0 == mobile_init) mobile_init++;
        if(1 == mobile_init) return;
        (function(){
            $("div[device_ui=mobile]").find("div[ui_key=btn_to_catalogue]").on("click", function(){
                $("div[ui_key=mobile_catalog_container]")[0].scrollIntoView();
            });
        })();
        (function(){
            var swiper = new Swiper('.swiper_mobile', {
                autoHeight: true,
                speed: 400,
                spaceBetween: 0,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        })();
        // google map use
        /*
        (function(){
            window.resp_my_google_map_mobile = resp_my_google_map_mobile;
            function resp_my_google_map_mobile() {
                var img_src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                var latlng = { lat: 22.9749375, lng: 120.2915299 };
                var map = new google.maps.Map(document.getElementById('my_google_map_mobile'), { zoom: 16, center: latlng });
                var marker = new google.maps.Marker({ position: latlng, map: map, title: "恒久泰有限公司", icon: img_src });
                marker.setMap(map);
            }
            var google_api_url = "https://maps.googleapis.com/maps/api/js";
            google_api_url += "?key=AIzaSyDt_Xit8PDLpMAawxwyyIanXE3zzTqblRM"; // api_key
            google_api_url += "&callback=resp_my_google_map_mobile"; // return_fn
            website.script(google_api_url, function(){});
        })(); */
        // catalogue
        (function(){
            var arr = [
                { "title": "封面", "keyword": ["恒久泰有限公司型錄封面"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_001.jpg" },
                { "title": "目錄", "keyword": ["標準品（現貨品）頁數表"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_002.jpg" },
                { "title": "標準滾子鏈條_A系列_ANSI,JIS", "keyword": ["滾子鏈條","ANSI","JIS"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_003.jpg" },
                { "title": "標準滾子鏈條_B系列_BS", "keyword": ["滾子鏈條","BS"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_004.jpg" },
                { "title": "標準輸送帶鏈條_雙節距S型", "keyword": ["輸送帶鏈條","S型","標準型","不銹鋼型","加重型","加重不銹鋼型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_005.jpg" },
                { "title": "標準輸送帶鏈條_雙節距R型", "keyword": ["輸送帶鏈條","R型","標準型","不銹鋼型","加重型","加重不銹鋼型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_006.jpg" },
                { "title": "標準輸送帶鏈條_單孔帶配件片型", "keyword": ["輸送帶鏈條","單孔配件片","單側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_007.jpg" },
                { "title": "標準輸送帶鏈條_單孔帶配件片型", "keyword": ["輸送帶鏈條","單孔配件片","雙側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_008.jpg" },
                { "title": "標準輸送帶鏈條_雙孔帶配件片型", "keyword": ["輸送帶鏈條","雙孔配件片","單側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_009.jpg" },
                { "title": "標準輸送帶鏈條_雙孔帶配件片型", "keyword": ["輸送帶鏈條","雙孔配件片","雙側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_010.jpg" },
                { "title": "鏈條用全目／半目接頭", "keyword": ["接頭鏈節","偏置鏈節","單排","全目接頭／半目接頭"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_011.jpg" },
                { "title": "標準滾子鏈條 雙排 A、B 系列", "keyword": ["雙排鏈條","B 系列","B 系列","全目接頭／半目接頭"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_012.jpg" },
                { "title": "鏈輪_B系列 11B、15B", "keyword": ["11B","15B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_013.jpg" },
                { "title": "鏈輪_B系列 25B", "keyword": ["25B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_014.jpg" },
                { "title": "鏈輪_B系列 35B", "keyword": ["35B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_015.jpg" },
                { "title": "鏈輪_B系列 40B", "keyword": ["40B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_016.jpg" },
                { "title": "鏈輪_B系列 50B", "keyword": ["50B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_017.jpg" },
                { "title": "鏈輪_B系列 60B", "keyword": ["60B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_018.jpg" },
                { "title": "鏈輪_B系列 80B、100B", "keyword": ["80B","100B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_019.jpg" },
                { "title": "雙列鏈輪_H系列 40SD、50SD", "keyword": ["40SD","50SD","雙排鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_020.jpg" },
                { "title": "雙節距專用鏈輪_B系列_S、R型", "keyword": ["B 系列","S型","R型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_021.jpg" },
                { "title": "惰輪鏈輪_C系列", "keyword": ["惰輪","C系列","單軸承","雙軸承"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_022.jpg" },
                { "title": "帶輪轂惰輪鏈輪_B系列", "keyword": ["帶輪轂","惰輪","B系列","單軸承","雙軸承"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_023.jpg" },
                { "title": "帶輪轂惰輪鏈輪_小型惰輪_B系列", "keyword": ["帶輪轂","惰輪","B系列","雙節距型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_024.jpg" },
                { "title": "鏈條式聯軸器", "keyword": ["聯軸器","roller chain flexible couplings"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_025.jpg" },
                { "title": "封底", "keyword": ["型錄封底"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_026.jpg" },
            ];
            var container = $("div[ui_key=mobile_catalog_container]");
            // pager
            (function(){
                var now_index = 1;
                var prefix_url = "/HJT_SITE/up_file/catalogue_2022/cat_0"+now_index+".jpg";
                container.find("div[ui_key=btn_prev]").on("click", function(){
                    now_index--;
                    if(now_index < 1) now_index = 1;
                    set_now_page_opt(now_index);
                });
                container.find("div[ui_key=btn_next]").on("click", function(){
                    now_index++;
                    var max_size = arr.length;
                    if(now_index > max_size) now_index = max_size;
                    set_now_page_opt(now_index);
                });
                // viewer click
                (function(){
                    container.find("div[ui_key=catalogue_image]").on("click", function(){
                        var fix_num = parseInt(now_index, 10);
                        var page_opt = arr[fix_num-1];
                        window.open(page_opt["path"], "_blank");
                    });
                })();
                // set now page
                function set_now_page_opt(page_index) {
                    var fix_num = parseInt(page_index, 10);
                    container.find("div[ui_key=now_page_num]").html(fix_num);
                    now_index = fix_num;
                    container.find("div[ui_key=page_title]").html(arr[fix_num-1]["title"]);
                    container.find("div[ui_key=page_keyword]").html(arr[fix_num-1]["keyword"].join(","));
                    if(fix_num < 10) fix_num = "0" + fix_num;
                    prefix_url = "/HJT_SITE/up_file/catalogue_2022/cat_0"+fix_num+".jpg";
                    container.find("div[ui_key=catalogue_viewer]").find("div[ui_key=img_zone]").css("background-image", "url("+prefix_url+")");
                }
                // init
                (function(){
                    // container.find("div[ui_key=page_title]").html(arr[0]["title"]);
                    // container.find("div[ui_key=catalogue_viewer]").find("img").attr("src", arr[0]["path"]);
                    setTimeout(function(){
                        set_now_page_opt(1);
                    }, 1);
                    container.find("div[ui_key=sum_page_num]").html(arr.length);
                })();
            })();
        })();
    }

    var desktop_init = 0;
    function desktop_ui_fn() {
        if(0 == desktop_init) desktop_init++;
        if(1 == desktop_init) return;
        (function(){
            $("div[device_ui=desktop]").find("div[ui_key=btn_to_catalogue]").on("click", function(){
                $("div[ui_key=catalog_container]")[0].scrollIntoView();
            });
        })();
        // swiper
        (function(){
            var swiper = new Swiper('.swiper', {
                autoHeight: true,
                speed: 400,
                spaceBetween: 0,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        })();
        // google map use
        /*
        (function(){
            window.resp_my_google_map = resp_my_google_map;
            function resp_my_google_map() {
                var img_src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                var latlng = { lat: 22.9749375, lng: 120.2915299 };
                var map = new google.maps.Map(document.getElementById('my_google_map'), { zoom: 16, center: latlng });
                var marker = new google.maps.Marker({ position: latlng, map: map, title: "恒久泰有限公司", icon: img_src });
                marker.setMap(map);
            }
            var google_api_url = "https://maps.googleapis.com/maps/api/js";
            google_api_url += "?key=AIzaSyDt_Xit8PDLpMAawxwyyIanXE3zzTqblRM"; // api_key
            google_api_url += "&callback=resp_my_google_map"; // return_fn
            website.script(google_api_url, function(){});
        })();*/
        // catalogue
        (function(){
            var arr = [
                { "title": "封面", "keyword": ["恒久泰有限公司型錄封面"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_001.jpg" },
                { "title": "目錄", "keyword": ["標準品（現貨品）頁數表"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_002.jpg" },
                { "title": "標準滾子鏈條_A系列_ANSI,JIS", "keyword": ["滾子鏈條","ANSI","JIS"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_003.jpg" },
                { "title": "標準滾子鏈條_B系列_BS", "keyword": ["滾子鏈條","BS"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_004.jpg" },
                { "title": "標準輸送帶鏈條_雙節距S型", "keyword": ["輸送帶鏈條","S型","標準型","不銹鋼型","加重型","加重不銹鋼型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_005.jpg" },
                { "title": "標準輸送帶鏈條_雙節距R型", "keyword": ["輸送帶鏈條","R型","標準型","不銹鋼型","加重型","加重不銹鋼型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_006.jpg" },
                { "title": "標準輸送帶鏈條_單孔帶配件片型", "keyword": ["輸送帶鏈條","單孔配件片","單側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_007.jpg" },
                { "title": "標準輸送帶鏈條_單孔帶配件片型", "keyword": ["輸送帶鏈條","單孔配件片","雙側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_008.jpg" },
                { "title": "標準輸送帶鏈條_雙孔帶配件片型", "keyword": ["輸送帶鏈條","雙孔配件片","單側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_009.jpg" },
                { "title": "標準輸送帶鏈條_雙孔帶配件片型", "keyword": ["輸送帶鏈條","雙孔配件片","雙側"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_010.jpg" },
                { "title": "鏈條用全目／半目接頭", "keyword": ["接頭鏈節","偏置鏈節","單排","全目接頭／半目接頭"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_011.jpg" },
                { "title": "標準滾子鏈條 雙排 A、B 系列", "keyword": ["雙排鏈條","B 系列","B 系列","全目接頭／半目接頭"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_012.jpg" },
                { "title": "鏈輪_B系列 11B、15B", "keyword": ["11B","15B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_013.jpg" },
                { "title": "鏈輪_B系列 25B", "keyword": ["25B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_014.jpg" },
                { "title": "鏈輪_B系列 35B", "keyword": ["35B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_015.jpg" },
                { "title": "鏈輪_B系列 40B", "keyword": ["40B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_016.jpg" },
                { "title": "鏈輪_B系列 50B", "keyword": ["50B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_017.jpg" },
                { "title": "鏈輪_B系列 60B", "keyword": ["60B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_018.jpg" },
                { "title": "鏈輪_B系列 80B、100B", "keyword": ["80B","100B","鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_019.jpg" },
                { "title": "雙列鏈輪_H系列 40SD、50SD", "keyword": ["40SD","50SD","雙排鏈輪"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_020.jpg" },
                { "title": "雙節距專用鏈輪_B系列_S、R型", "keyword": ["B 系列","S型","R型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_021.jpg" },
                { "title": "惰輪鏈輪_C系列", "keyword": ["惰輪","C系列","單軸承","雙軸承"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_022.jpg" },
                { "title": "帶輪轂惰輪鏈輪_B系列", "keyword": ["帶輪轂","惰輪","B系列","單軸承","雙軸承"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_023.jpg" },
                { "title": "帶輪轂惰輪鏈輪_小型惰輪_B系列", "keyword": ["帶輪轂","惰輪","B系列","雙節距型"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_024.jpg" },
                { "title": "鏈條式聯軸器", "keyword": ["聯軸器","roller chain flexible couplings"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_025.jpg" },
                { "title": "封底", "keyword": ["型錄封底"], "path": "/HJT_SITE/up_file/catalogue_2022/cat_026.jpg" },
            ];
            var container = $("div[ui_key=catalog_container]");
            // pager
            (function(){
                var now_index = 1;
                var prefix_url = "/HJT_SITE/up_file/catalogue_2022/cat_0"+now_index+".jpg";
                container.find("div[ui_key=btn_prev]").on("click", function(){
                    now_index--;
                    if(now_index < 1) now_index = 1;
                    set_now_page_opt(now_index);
                });
                container.find("div[ui_key=btn_next]").on("click", function(){
                    now_index++;
                    var max_size = arr.length;
                    if(now_index > max_size) now_index = max_size;
                    set_now_page_opt(now_index);
                });
                // viewer click
                (function(){
                    container.find("div[ui_key=catalogue_image]").on("click", function(){
                        var fix_num = parseInt(now_index, 10);
                        var page_opt = arr[fix_num-1];
                        window.open(page_opt["path"], "_blank");
                    });
                })();
                // create list
                (function(){
                    var tmp_arr = [];
                    for(var i = 0, len = arr.length; i < len; i++) {
                        var page = arr[i];
                        var div_elem = $("<div></div>");
                        (function(){
                            var fix_num = parseInt(i+1, 10);
                            div_elem.attr("ui_key", "page_opt");
                            div_elem.attr("page_index", fix_num);
                            div_elem.html(page["title"]);
                            div_elem.css("border-style", "solid");
                            div_elem.css("border-width", "0px 0px 1px 0px");
                            div_elem.css("border-color", "#ccc");
                            div_elem.css("cursor", "pointer");
                            div_elem.css("padding", "5px");
                        })();
                        tmp_arr.push(div_elem.prop("outerHTML"));
                    }
                    container.find("div[ui_key=page_list]").html(tmp_arr.join(""));
                    (function(){
                        container.find("div[ui_key=page_list]").on("click", "div[ui_key=page_opt]", function(evt){
                            var elem = $(evt.currentTarget);
                            var page_index = elem.attr("page_index");
                            set_now_page_opt(page_index);
                        });
                    })();
                })();
                // set now page
                function set_now_page_opt(page_index) {
                    var fix_num = parseInt(page_index, 10);
                    container.find("div[ui_key=now_page_num]").html(fix_num);
                    now_index = fix_num;
                    container.find("div[ui_key=page_opt]").css("background-color", "");
                    container.find("div[ui_key=page_opt]").css("color", "");
                    var page_opt_elem = container.find("div[page_index="+fix_num+"]");
                    (function(){
                        // 控制 catalogue list 維持顯示頁面選項於可視範圍中
                        var fix_pos_top = page_opt_elem.position().top;
                        page_opt_elem.parent()[0].scrollTop = fix_pos_top;
                    })();
                    container.find("div[ui_key=page_title]").html(arr[fix_num-1]["title"]);
                    container.find("div[ui_key=page_keyword]").html(arr[fix_num-1]["keyword"].join(","));
                    if(fix_num < 10) fix_num = "0" + fix_num;
                    prefix_url = "/HJT_SITE/up_file/catalogue_2022/cat_0"+fix_num+".jpg";
                    // container.find("div[ui_key=catalogue_viewer]").find("img").attr("src", prefix_url);
                    container.find("div[ui_key=catalogue_viewer]").find("div[ui_key=img_zone]").css("background-image", "url("+prefix_url+")");
                    page_opt_elem.css("background-color", "rgb(134,138,140)");
                    page_opt_elem.css("color", "#fff");
                }
                // init
                (function(){
                    // container.find("div[ui_key=page_title]").html(arr[0]["title"]);
                    // container.find("div[ui_key=catalogue_viewer]").find("img").attr("src", arr[0]["path"]);
                    setTimeout(function(){
                        set_now_page_opt(1);
                    }, 1);
                    container.find("div[ui_key=sum_page_num]").html(arr.length);
                })();
            })();
        })();
    }

})();
