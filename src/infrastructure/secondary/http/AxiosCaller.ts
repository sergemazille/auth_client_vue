import { CallerService } from '@/application/services/CallerService';
import { AxiosInstance } from 'axios';

export class AxiosCaller implements CallerService {
  constructor(public readonly caller: AxiosInstance, public readonly endpoints: Record<string, string>) {}
}
