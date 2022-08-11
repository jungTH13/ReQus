import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamUpdateDto = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.body.startTime) {
      request.body.startTime = new Date(String(request.body.startTime));
    }

    if (request.body.startTime) {
      request.body.endTime = new Date(String(request.body.endTime));
    }
    return request.body;
  },
);

/* 스웨거의 파라미터 설정을 작성하는 방법
export const ParamCreateDto = createParamDecorator(파라미터 정의,
[
    (target: any, key: string) => {
      // Here it is. Use the `@ApiQuery` decorator purely as a function to define the meta only once here.
      ApiQuery({
        name: 'page',
        schema: { default: 1, type: 'number', minimum: 1 },
        required: false,
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
      ApiQuery({
        name: 'page_size',
        schema: { default: 10, type: 'number', minimum: 1 },
        required: false,
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
    },
  ],
)
*/
