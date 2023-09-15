package app.pattern;

import app.handler.PageServiceHandler;
import app.handler.ResourceFileServiceHandler;
import app.handler.SiteFileServiceHandler;
import com.google.gson.JsonObject;
import framework.context.RequestContext;
import framework.controller.BaseRestController;
import framework.handler.RequestContextHandler;
import framework.observer.Handler;
import framework.observer.Message;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.ArrayList;

/**
 * 以責任鏈構建 Service
 */
public class RespChain extends BaseRestController {

    private final HttpServletRequest request;
    private final HttpServletResponse response;

    private final ArrayList<RequestContextHandler> handlers;

    public RespChain(HttpServletRequest _request, HttpServletResponse _response) {
        {
            this.request = _request;
            this.response = _response;
        }
        handlers = new ArrayList<>();
        // 建立責任鏈
        {
            handlers.add(new PageServiceHandler());
            handlers.add(new ResourceFileServiceHandler());
            handlers.add(new SiteFileServiceHandler());
        }
        // 最終無節點處理事件時
        Handler non_matched_handler;
        {
            non_matched_handler = new Handler(){
                @Override
                public void handleMessage(Message m) {
                    super.handleMessage(m);
                    JsonObject obj = new JsonObject();
                    {
                        obj.addProperty("status", "fail");
                        obj.addProperty("msg_zht", "該 API 無對應的處理節點");
                    }
                    print_to_response(obj, _response);
                }
            };
        }
        // 建立鏈結順序
        {
            int indx = 0;
            for(RequestContextHandler handler : handlers) {
                if(handlers.size() > (indx+1)) { handler.setNextHandler(handlers.get(indx+1)); }
                { handler.setNonMatchedExceptionHandler(non_matched_handler); }
                indx++;
            }
        }
    }

    public void start(String _service_name) {
        start(_service_name, null);
    }

    public void start(String _service_name, Handler handler) {
        // 開始執行任務處理
        {
            RequestContext requestContext = new RequestContext.Builder()
                    .setHttpServletRequest(request)
                    .setHttpServletResponse(response)
                    .setServiceName(_service_name) // 快速判斷哪一個 service 的任務
                    .setStateHandler(handler) // 回傳結果接收用
                    .build();
            handlers.get(0).startup(requestContext);
        }
    }

}
