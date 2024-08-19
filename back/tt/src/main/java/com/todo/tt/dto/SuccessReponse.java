package com.todo.tt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuccessReponse<T> {
    private String message;
    private int status;
    private T data;
    private String type;
}
