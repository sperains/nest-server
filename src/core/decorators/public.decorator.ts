import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = Symbol('is_public');

// @Public() 注解用于指定哪些请求不需要权限校验
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
