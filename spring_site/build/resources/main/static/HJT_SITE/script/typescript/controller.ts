// 請不要手動編輯 js/script.js 檔案，而是以此處 .ts 檔案為主
// 編輯此檔案後請至專案主資料夾輸入 tsc 編譯此 .ts 腳本
// > cd /Users/tomli/opt/dev_webapp/[project_dir]
// > tsc
// 編譯成功後不會有回傳值，而 js/script.js 檔案內容及編輯日期會被更新

// namespace define
var moment: any = window.moment || null;

// site function
(function(){
    // 新增腳本時於此處增加腳本路徑
    var arr: any = [];
    (function(){
        // module script - 基礎功能腳本
        arr.push("/HJT_SITE/script/jquery/jquery.min.js");
        arr.push([
            "/HJT_SITE/script/axios/axios.min.js",
            "/HJT_SITE/script/moment/moment.min.js",
            "/HJT_SITE/script/font_awesome/all.min.js",
            "/HJT_SITE/script/swiper/swiper-bundle.min.js",
        ]);
        arr.push("/HJT_SITE/script/moment/zh-tw.min.js");
        // custom script - 各個分頁腳本
        arr.push("/HJT_SITE/script/module/index.js");
    })();
    // 遞迴方式讀取所有 script 項目
    (function(){
        var tmpPath = null;
        loadNext();
        function loadNext() {
            tmpPath = arr.shift();
            if(null != tmpPath) {
                website.script(tmpPath, function(){
                    loadNext();
                });
            } else {
                scriptReady();
            }
        }
    })();
    // all script ready
    function scriptReady() {
        // 公用腳本準備完成
        if(null == website.ready) {
            console.error("該頁面不具有 window.website.ready 方法，無法完成初始化呼叫");
        } else {
            // 藉由 setTimeout 將執行優先度降低
            setTimeout(function(){
                website.ready();
            }, 1);
        }
    }
})();

// startup
(function(){
    // 各個分頁載入完成後的通用方法可寫於此處，差異化方法則寫在個別腳本中
    website["ready"] = function(){
        console.log("page_ready");
    };
})();
