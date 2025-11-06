package com.example.batchselection.dto;

import lombok.Data;

/**
 * 分组信息DTO
 */
@Data
public class GroupInfoDTO {
    
    private Long id;
    private String groupName;
    private String grayGroupName;
    private String idc;
    private String zone;
    private String spec;
    private Integer diskSize;
    private Integer podCount;
}
