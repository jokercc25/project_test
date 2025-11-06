package com.example.batchselection.config;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 监控指标配置
 */
@Configuration
public class MetricsConfig {

    /**
     * 任务提交成功计数器
     */
    @Bean
    public Counter taskSubmitSuccessCounter(MeterRegistry registry) {
        return Counter.builder("batch.task.submit.success")
                .description("任务提交成功次数")
                .tag("type", "business")
                .register(registry);
    }

    /**
     * 任务提交失败计数器
     */
    @Bean
    public Counter taskSubmitFailCounter(MeterRegistry registry) {
        return Counter.builder("batch.task.submit.fail")
                .description("任务提交失败次数")
                .tag("type", "business")
                .register(registry);
    }

    /**
     * API 响应时间计时器
     */
    @Bean
    public Timer apiResponseTimer(MeterRegistry registry) {
        return Timer.builder("batch.api.response.time")
                .description("API响应时间")
                .tag("type", "performance")
                .register(registry);
    }
}
