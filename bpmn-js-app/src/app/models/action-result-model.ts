export class ActionResult<T> {
    IsSuccessful: boolean;
    IsError: boolean;
    ErrorMessage: string;
    Messages: string;
    Token: string;
    Result: T;
    FileName: string;
  }
  