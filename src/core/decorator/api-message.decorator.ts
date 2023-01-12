import { SetMetadata } from '@nestjs/common';

/**
 * 一般情况下接口并不需要返回message信息，所以默认返回'OK'
 * 特殊情况，如果需要明确指定消息内容，可以在方法中添加 @ApiMessage('')注解来指定消息内容
 */

export const API_MESSAGE_META_KEY = Symbol('API_MESSAGE');

export const ApiMessage = (message: string) =>
  SetMetadata(API_MESSAGE_META_KEY, message);
