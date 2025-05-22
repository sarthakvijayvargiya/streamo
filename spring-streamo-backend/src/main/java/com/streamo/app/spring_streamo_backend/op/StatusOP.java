package com.streamo.app.spring_streamo_backend.op;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class StatusOP {

    private String statusErrorCode;

    private String statusErrorFlag;

    private String statusDesc;

    public String getStatusErrorCode() {
        return statusErrorCode;
    }

    public void setStatusErrorCode(String statusErrorCode) {
        this.statusErrorCode = statusErrorCode;
    }

    public String getStatusErrorFlag() {
        return statusErrorFlag;
    }

    public void setStatusErrorFlag(String statusErrorFlag) {
        this.statusErrorFlag = statusErrorFlag;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }
}
