export interface Repository {
  requestTypePost(target: string, data: any): Promise<any>;
}
