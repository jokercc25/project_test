package com.example.batchselection.repository;

import com.example.batchselection.entity.AppInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * 应用数据Repository
 */
@Repository
public interface AppInfoRepository extends JpaRepository<AppInfo, Long> {
    
    /**
     * 查询所有应用数据，按应用名和分组名排序
     */
    @Query("SELECT a FROM AppInfo a ORDER BY a.appName, a.groupName")
    List<AppInfo> findAllOrderByAppNameAndGroupName();
    
    /**
     * 根据应用名查询分组信息
     */
    List<AppInfo> findByAppNameOrderByGroupName(String appName);
}
