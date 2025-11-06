package com.example.batchselection.dto;

import lombok.Data;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

/**
 * 批量任务提交请求DTO
 */
@Data
public class BatchTaskSubmitRequest {
    
    @NotEmpty(message = "任务列表不能为空")
    @Valid
    private List<TaskSubmitDTO> tasks;
}
