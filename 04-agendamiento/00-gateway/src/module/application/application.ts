import { Repository } from "../domain/repositories/repository";

export class Application {
  constructor(private repository: Repository) {}

  async requestAppointment(target: string, data: any): Promise<any> {
    return await this.repository.requestTypePost(target, data);
  }
}
