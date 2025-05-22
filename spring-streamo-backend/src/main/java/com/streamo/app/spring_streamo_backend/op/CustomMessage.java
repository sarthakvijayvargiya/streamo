package com.streamo.app.spring_streamo_backend.op;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomMessage {

    private StatusOP statusOP;

    public StatusOP getStatusOP() {
        return statusOP;
    }

    public void setStatusOP(StatusOP statusOP) {
        this.statusOP = statusOP;
    }
}
