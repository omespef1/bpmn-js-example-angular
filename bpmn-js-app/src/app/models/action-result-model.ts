export class ActionResult<T> {
    IsSuccessful: boolean;
    IsError: boolean;
    ErrorMessage: string;
    Messages: string;
    Token: string;
    Result: T;
    FileName: string;
  }

  export class Action<T> {
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
    messages: string;
    token: string;
    result: T;
    fileName: string;
  }
  