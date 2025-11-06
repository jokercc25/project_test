package com.example.batchselection.repository;

import com.example.batchselection.entity.TaskInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * 任务数据Repository
 */
@Repository
public interface TaskInfoRepository extends JpaRepository<TaskInfo, Long> {
    
    /**
     * 清空任务表并重置自增ID
     */
    @Modifying
    @Query(value = "TRUNCATE TABLE task_info", nativeQuery = true)
    void truncateTable();
}
