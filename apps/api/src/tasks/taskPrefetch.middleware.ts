import { Injectable, NestMiddleware } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Injectable()
export class TaskPrefetchMiddleware implements NestMiddleware {
  constructor(private readonly tasks: TasksService) {}

  async use(req: { params: { id }; task }, _, next: () => void) {
    const idParam = req.params?.id;
    if (idParam) {
      const id = Number(idParam);
      if (!Number.isNaN(id)) {
        req.task = await this.tasks.findOne(id);
      }
    }
    next();
  }
}
