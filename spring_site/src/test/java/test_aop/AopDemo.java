package test_aop;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.framework.ProxyFactoryBean;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.aop.support.NameMatchMethodPointcut;

public class AopDemo {

    public static void main(String[] args) {
        // 創建一個切點，匹配所有名稱以 "say" 開頭的方法
        NameMatchMethodPointcut pointcut = new NameMatchMethodPointcut();
        pointcut.setMappedNames("say*");
        // pointcut.setMappedNames("show*");

        // 創建一個切面，在目標方法執行前後添加日誌
        LoggingAdvice advice = new LoggingAdvice();

        // 創建一個代理工廠 bean，將切面註冊到代理
        ProxyFactoryBean proxyFactoryBean = new ProxyFactoryBean();
        proxyFactoryBean.setTarget(new HelloService());
        proxyFactoryBean.addAdvisor(new DefaultPointcutAdvisor(pointcut, advice));

        // 獲取代理對象
        HelloService proxy = (HelloService) proxyFactoryBean.getObject();

        // 調用代理方法
        proxy.sayHello();
        proxy.sayGoodbye();
        proxy.showLabel();
    }

}

class LoggingAdvice implements MethodInterceptor {

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        System.out.println("方法開始執行：" + invocation.getMethod().getName());
        Object result = invocation.proceed();
        System.out.println("方法執行完成：" + invocation.getMethod().getName());
        return result;
    }

}

class HelloService {

    public void sayHello() {
        System.out.println("Hello, world!");
    }

    public void sayGoodbye() {
        System.out.println("Goodbye, world!");
    }

    public void showLabel() {
        System.out.println("testing");
    }

}
