import { ThrottlerModuleOptions } from '@nestjs/throttler';

const rateLimitConfig: ThrottlerModuleOptions = {
  ttl: 60,
  limit: 10,
};

export default rateLimitConfig;
