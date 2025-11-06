package com.example.batchselection.service.impl;

import com.example.batchselection.dto.ApplicationResponseDTO;
import com.example.batchselection.dto.GroupInfoDTO;
import com.example.batchselection.dto.TaskSubmitDTO;
import com.example.batchselection.dto.TaskSubmitResponse;
import com.example.batchselection.entity.AppInfo;
import com.example.batchselection.entity.TaskInfo;
import com.example.batchselection.repository.AppInfoRepository;
import com.example.batchselection.repository.TaskInfoRepository;
import com.example.batchselection.service.BatchSelectionService;
import io.micrometer.core.instrument.Counter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 批量勾选业务服务实现类
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class BatchSelectionServiceImpl implements BatchSelectionService {

    private final AppInfoRepository appInfoRepository;
    private final TaskInfoRepository taskInfoRepository;
    private final Counter taskSubmitSuccessCounter;
    private final Counter taskSubmitFailCounter;

    @Override
    public List<ApplicationResponseDTO> getAllApplications() {
        log.info("开始查询所有应用数据");
        
        // 查询所有应用数据
        List<AppInfo> appInfoList = appInfoRepository.findAllOrderByAppNameAndGroupName();
        
        // 按应用名分组
        Map<String, List<AppInfo>> appGroupMap = new LinkedHashMap<>();
        for (AppInfo appInfo : appInfoList) {
            appGroupMap.computeIfAbsent(appInfo.getAppName(), k -> new ArrayList<>()).add(appInfo);
        }
        
        // 转换为DTO结构
        List<ApplicationResponseDTO> result = new ArrayList<>();
        for (Map.Entry<String, List<AppInfo>> entry : appGroupMap.entrySet()) {
            ApplicationResponseDTO appDTO = new ApplicationResponseDTO();
            appDTO.setAppName(entry.getKey());
            
            List<GroupInfoDTO> groups = entry.getValue().stream()
                .map(this::convertToGroupDTO)
                .collect(Collectors.toList());
            appDTO.setGroups(groups);
            
            result.add(appDTO);
        }
        
        log.info("查询完成，共找到 {} 个应用", result.size());
        return result;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TaskSubmitResponse submitTasks(List<TaskSubmitDTO> tasks) {
        log.info("开始提交任务，任务数量: {}", tasks.size());
        
        try {
            if (tasks == null || tasks.isEmpty()) {
                throw new IllegalArgumentException("任务列表不能为空");
            }
            
            // 限制单次提交数量
            if (tasks.size() > 1000) {
                throw new IllegalArgumentException("单次提交任务数量不能超过1000条");
            }
            
            // 转换为任务实体并保存
            List<TaskInfo> taskInfoList = tasks.stream()
                .map(this::convertToTaskInfo)
                .collect(Collectors.toList());
            
            List<TaskInfo> savedTasks = taskInfoRepository.saveAll(taskInfoList);
            
            // 收集生成的任务ID
            List<Long> taskIds = savedTasks.stream()
                .map(TaskInfo::getTaskId)
                .collect(Collectors.toList());
            
            log.info("任务提交成功，生成任务ID: {}", taskIds);
            
            // 监控: 记录成功次数
            taskSubmitSuccessCounter.increment(tasks.size());
            
            return new TaskSubmitResponse(taskIds, taskIds.size());
        } catch (Exception e) {
            // 监控: 记录失败次数
            taskSubmitFailCounter.increment();
            log.error("任务提交失败", e);
            throw e;
        }
    }

    @Override
    public List<TaskInfo> getAllTasks() {
        log.info("开始查询所有任务数据");
        List<TaskInfo> tasks = taskInfoRepository.findAll();
        log.info("查询完成，共找到 {} 条任务", tasks.size());
        return tasks;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void clearAllTasks() {
        log.info("开始清空所有任务数据并重置自增ID");
        taskInfoRepository.truncateTable();
        log.info("任务数据已全部清空，自增ID已重置");
    }

    /**
     * 将AppInfo转换为GroupInfoDTO
     */
    private GroupInfoDTO convertToGroupDTO(AppInfo appInfo) {
        GroupInfoDTO dto = new GroupInfoDTO();
        dto.setId(appInfo.getId());
        dto.setGroupName(appInfo.getGroupName());
        dto.setGrayGroupName(appInfo.getGrayGroupName());
        dto.setIdc(appInfo.getIdc());
        dto.setZone(appInfo.getZone());
        dto.setSpec(appInfo.getSpec());
        dto.setDiskSize(appInfo.getDiskSize());
        dto.setPodCount(appInfo.getPodCount());
        return dto;
    }

    /**
     * 将TaskSubmitDTO转换为TaskInfo实体
     */
    private TaskInfo convertToTaskInfo(TaskSubmitDTO dto) {
        TaskInfo taskInfo = new TaskInfo();
        taskInfo.setAppName(dto.getAppName());
        taskInfo.setGroupName(dto.getGroupName());
        taskInfo.setGrayGroupName(dto.getGrayGroupName());
        taskInfo.setIdc(dto.getIdc());
        taskInfo.setZone(dto.getZone());
        taskInfo.setSpec(dto.getSpec());
        taskInfo.setDiskSize(dto.getDiskSize());
        taskInfo.setPodCount(dto.getPodCount());
        return taskInfo;
    }
}
