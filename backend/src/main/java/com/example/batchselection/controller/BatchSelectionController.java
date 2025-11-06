package com.example.batchselection.controller;

import com.example.batchselection.dto.ApiResponse;
import com.example.batchselection.dto.ApplicationResponseDTO;
import com.example.batchselection.dto.BatchTaskSubmitRequest;
import com.example.batchselection.dto.TaskSubmitResponse;
import com.example.batchselection.entity.TaskInfo;
import com.example.batchselection.service.BatchSelectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * 批量勾选信息管理Controller
 */
@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "*")
public class BatchSelectionController {

    private final BatchSelectionService batchSelectionService;

    /**
     * 查询所有应用数据
     * GET /api/applications
     */
    @GetMapping("/applications")
    public ApiResponse<List<ApplicationResponseDTO>> getApplications() {
        log.info("收到查询应用数据请求");
        try {
            List<ApplicationResponseDTO> applications = batchSelectionService.getAllApplications();
            return ApiResponse.success(applications);
        } catch (Exception e) {
            log.error("查询应用数据失败", e);
            return ApiResponse.error("查询应用数据失败: " + e.getMessage());
        }
    }

    /**
     * 批量提交任务
     * POST /api/tasks/submit
     */
    @PostMapping("/tasks/submit")
    public ApiResponse<TaskSubmitResponse> submitTasks(@Valid @RequestBody BatchTaskSubmitRequest request) {
        log.info("收到批量提交任务请求，任务数量: {}", request.getTasks().size());
        try {
            TaskSubmitResponse response = batchSelectionService.submitTasks(request.getTasks());
            return ApiResponse.success("任务提交成功", response);
        } catch (IllegalArgumentException e) {
            log.warn("任务提交参数错误: {}", e.getMessage());
            return ApiResponse.error(400, e.getMessage());
        } catch (Exception e) {
            log.error("任务提交失败", e);
            return ApiResponse.error("任务提交失败: " + e.getMessage());
        }
    }

    /**
     * 查询所有任务列表
     * GET /api/tasks
     */
    @GetMapping("/tasks")
    public ApiResponse<List<TaskInfo>> getTasks() {
        log.info("收到查询任务列表请求");
        try {
            List<TaskInfo> tasks = batchSelectionService.getAllTasks();
            return ApiResponse.success(tasks);
        } catch (Exception e) {
            log.error("查询任务列表失败", e);
            return ApiResponse.error("查询任务列表失败: " + e.getMessage());
        }
    }

    /**
     * 清空所有任务
     * DELETE /api/tasks
     */
    @DeleteMapping("/tasks")
    public ApiResponse<String> clearTasks() {
        log.info("收到清空任务请求");
        try {
            batchSelectionService.clearAllTasks();
            return ApiResponse.success("任务已全部清空");
        } catch (Exception e) {
            log.error("清空任务失败", e);
            return ApiResponse.error("清空任务失败: " + e.getMessage());
        }
    }
}
