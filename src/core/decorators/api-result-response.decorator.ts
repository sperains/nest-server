import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiPaginated } from '../entity/api-paginated.entity';
import { ApiResult } from '../entity/api-result.entity';
import { XOR } from '../types';

/**
 * ApiOkResponse封装，用于定义统一的ApiResult类型的数据结构schema
 * @param model ApiResult或者ApiPaginated所包裹的data类型
 * @param options 中的两个参数是互斥的，因为数据要么是带有分页的列表，要么是普通的列表或对象
 * { isArray: boolean} 如data中为数组则设置 isArray: true
 * { paginated: boolean} 若为分页数据则设置 paginated: true
 */
export const ApiResultResponse = <T extends Type<any>>(
  model: T,
  options?: XOR<{ isArray: boolean }, { paginated: boolean }>,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: options?.paginated
        ? paginatedSchema(model)
        : apiResultSchema(model, options?.isArray),
    }),
  );
};

const apiResultSchema = <T extends Type<any>>(model: T, isArray = false) => {
  const properties: Record<string, SchemaObject | ReferenceObject> = isArray
    ? {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(model),
          },
        },
      }
    : {
        data: {
          $ref: getSchemaPath(model),
        },
      };

  return {
    allOf: [
      { $ref: getSchemaPath(ApiResult) },
      {
        properties,
      },
    ],
  };
};

const paginatedSchema = <T extends Type<any>>(model: T) => {
  return {
    title: `ApiResultOfPaginated${model.name}`,
    allOf: [
      { $ref: getSchemaPath(ApiResult) },
      {
        properties: {
          data: {
            title: `ApiPaginatedOf${model.name}`,
            allOf: [
              { $ref: getSchemaPath(ApiPaginated) },
              {
                properties: {
                  list: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            ],
          },
        },
      },
    ],
  };
};
