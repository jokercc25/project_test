package com.example.batchselection.service;

import com.example.batchselection.dto.ApplicationResponseDTO;
import com.example.batchselection.dto.TaskSubmitDTO;
import com.example.batchselection.dto.TaskSubmitResponse;
import java.util.List;

/**
 * 批量勾选业务服务接口
 */
public interface BatchSelectionService {
    
    /**
     * 查询所有应用及其分组数据
     * @return 应用列表
     */
    List<ApplicationResponseDTO> getAllApplications();
    
    /**
     * 批量提交任务
     * @param tasks 任务列表
     * @return 提交结果，包含生成的任务ID列表
     */
    TaskSubmitResponse submitTasks(List<TaskSubmitDTO> tasks);
}
