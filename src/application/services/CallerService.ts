import { CallerInstance } from '@/application/models/CallerInstance';

export interface CallerService {
  caller: CallerInstance;
  endpoints: Record<string, string>;
}
