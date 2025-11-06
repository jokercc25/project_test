package com.example.batchselection.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 应用数据实体类
 */
@Data
@Entity
@Table(name = "app_info", indexes = {
    @Index(name = "idx_app_group", columnList = "app_name,group_name")
})
public class AppInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "app_name", nullable = false, length = 64)
    private String appName;

    @Column(name = "group_name", nullable = false, length = 64)
    private String groupName;

    @Column(name = "gray_group_name", length = 64)
    private String grayGroupName;

    @Column(name = "idc", nullable = false, length = 32)
    private String idc;

    @Column(name = "zone", nullable = false, length = 32)
    private String zone;

    @Column(name = "spec", nullable = false, length = 64)
    private String spec;

    @Column(name = "disk_size", nullable = false)
    private Integer diskSize;

    @Column(name = "pod_count", nullable = false)
    private Integer podCount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
