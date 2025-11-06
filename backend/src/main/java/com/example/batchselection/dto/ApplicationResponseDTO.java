package com.example.batchselection.dto;

import lombok.Data;
import java.util.List;

/**
 * 应用响应DTO - 包含应用名称和其下的分组列表
 */
@Data
public class ApplicationResponseDTO {
    
    private String appName;
    private List<GroupInfoDTO> groups;
}
