import axios, { AxiosRequestConfig } from 'axios';
import { Result } from 'neverthrow';

import { IError } from '../../helpers/Error';
import { UserCreatedResponse } from '../application/responses/user-create.response';
import { Repository } from '../domain/repositories/repository';

export type CreateResult = Result<UserCreatedResponse, IError>;

export class Infrastructure implements Repository {
  async requestTypePost(target: string, data: any) {
    const request: AxiosRequestConfig<any> = {
      method: "POST",
      url: target,
      responseType: "json",
      data
    }

    try {
      const result = await axios(request);
      return result.data;
    } catch (error) {
      
    }
  }
}
