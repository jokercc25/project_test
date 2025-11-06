package com.example.batchselection.repository;

import com.example.batchselection.entity.TaskInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 任务数据Repository
 */
@Repository
public interface TaskInfoRepository extends JpaRepository<TaskInfo, Long> {
}
