package com.example.batchselection.dto;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

/**
 * 任务提交请求DTO
 */
@Data
public class TaskSubmitDTO {
    
    @NotBlank(message = "应用名称不能为空")
    private String appName;
    
    @NotBlank(message = "分组名称不能为空")
    private String groupName;
    
    private String grayGroupName;
    
    @NotBlank(message = "机房不能为空")
    private String idc;
    
    @NotBlank(message = "分区不能为空")
    private String zone;
    
    @NotBlank(message = "参数规格不能为空")
    private String spec;
    
    @NotNull(message = "硬盘大小不能为空")
    @Positive(message = "硬盘大小必须为正整数")
    private Integer diskSize;
    
    @NotNull(message = "Pod数量不能为空")
    @Positive(message = "Pod数量必须为正整数")
    private Integer podCount;
}
