package app.handler;

import framework.context.RequestContext;
import framework.file.FileFinder;
import framework.handler.RequestContextHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.File;
import java.nio.file.Path;

public class SiteFileServiceHandler extends RequestContextHandler {

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
        return "site_file".equals(requestContext.getServiceName());
    }

    private void process_request() {
        String str_req_uri = String.valueOf(request.getRequestURI());
        File site_file = get_site_file(str_req_uri);
        if(null != site_file && site_file.exists()) {
            output_file_to_response(site_file, response);
        } else {
            output_error_404(response);
        }
    }

    private File get_site_file(String str_req_uri) {
        final String app_name = "/HJT_SITE";
        final String fix_str = "/up_file";
        String str_path = str_req_uri.replace(app_name, "");
        str_path = str_path.replace(fix_str, "");
        File file;
        File tmp = new FileFinder.Builder().build().find("WebAppFiles");
        if(null == tmp || !tmp.exists()) {
            System.out.println("路徑之上並未找到 WebAppFiles 資料夾");
        }
        String str_webapp_file = tmp.getPath() + app_name + "/upload" + str_path;
        file = Path.of(str_webapp_file).toFile();
        if(!file.exists()) file = null;
        return file;
    }

}
