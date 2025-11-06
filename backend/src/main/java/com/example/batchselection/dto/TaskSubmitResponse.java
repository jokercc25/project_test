package com.example.batchselection.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * 任务提交响应DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskSubmitResponse {
    
    private List<Long> taskIds;
    private Integer count;
}
