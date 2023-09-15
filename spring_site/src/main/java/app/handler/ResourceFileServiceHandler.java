package app.handler;

import framework.context.RequestContext;
import framework.handler.RequestContextHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.File;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class ResourceFileServiceHandler extends RequestContextHandler {

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
        return "resource_file".equals(requestContext.getServiceName());
    }

    private void process_request() {
        String str_req_uri = String.valueOf(URLDecoder.decode(request.getRequestURI(), StandardCharsets.UTF_8));
        File resource_file = get_resource_file(str_req_uri);
        if(null != resource_file && resource_file.exists()) {
            output_file_to_response(resource_file, false, response);
        } else {
            output_error_404(response);
        }
    }

    private File get_resource_file(String str_req_uri) {
        final String app_name = "/HJT_SITE";
        String str_path = str_req_uri.replace(app_name, "");
        System.out.println(str_path);
        File file = null;
        Resource resource = new ClassPathResource("static"+app_name+str_path);
        try {
            file = resource.getFile();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }

}
