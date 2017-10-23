<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
    /**
     * 前端资源文件的根目录
     */
    ROOT_UI = "${ROOT_UI}";
    /**
 * 服务端的根目录（可以有多个服务端
 */
    ROOT_SERVER = "${ROOT_SERVER}";
    localStorage.setItem('rootUi',ROOT_UI );
    localStorage.setItem('rootServer', ROOT_SERVER );
    location.href=ROOT_SERVER + '/front/dist/index.html';

</script>