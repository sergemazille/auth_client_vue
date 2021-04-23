import { CallerInstance } from '@/application/models/CallerInstance';
import { CallerService } from '@/application/services/http/CallerService';

export class AxiosCaller implements CallerService {
  constructor(public readonly caller: CallerInstance, public readonly endpoints: Record<string, string>) {}
}
