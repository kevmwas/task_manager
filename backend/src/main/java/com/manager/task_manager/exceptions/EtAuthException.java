package com.manager.task_manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class EtAuthException  extends RuntimeException {

    public EtAuthException(String message) {
        super(message);
    }
}
