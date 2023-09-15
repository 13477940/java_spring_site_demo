package app.handler;

import framework.context.RequestContext;
import framework.handler.RequestContextHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.File;

public class PageServiceHandler extends RequestContextHandler {

    private HttpServletRequest request = null;
    private HttpServletResponse response = null;

    @Override
    public void startup(RequestContext requestContext) {
        if(checkIsMyJob(requestContext)) {
            this.request = requestContext.getRequest();
            this.response = requestContext.getResponse();
            process_request();
        } else {
            this.passToNext(requestContext);
        }
    }

    @Override
    protected boolean checkIsMyJob(RequestContext requestContext) {
        return "page_service".equals(requestContext.getServiceName());
    }

    private void process_request() {
        String str_req_uri = String.valueOf(request.getRequestURI());
        File file_page = get_page_file(str_req_uri);
        if(null != file_page && file_page.exists()) {
            output_file_to_response(file_page, false, response);
        } else {
            output_error_404(response);
        }
    }

    // 處理頁面檔案對應
    private File get_page_file(String str_req_uri) {
        final String app_name = "/HJT_SITE";
        String str_path = str_req_uri.replace(app_name, "");
        if(str_path.isEmpty()) str_path = "/"; // 若為空字串
        File file = null;
        Resource resource = null;
        switch (str_path) {
            case "/", "/index" -> {
                resource = new ClassPathResource("templates/index/index.html");
            }
        }
        try {
            file = resource.getFile();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }

}
