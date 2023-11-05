import { HttpHeader } from '../../http/http-header';
import { MediaType } from '../../http/http-media-type';
import { FETCHEASY, FetcheasyMethods, FetcheasyParam } from '../fetcheasy';
export const SingleBodyTypes: FetcheasyParam[] = ['form', 'json'];

export function HeaderParam(name: string): ParameterDecorator {
  return describeArgument('header', name);
}

export function PathParam(name: string): ParameterDecorator {
  return describeArgument('path', name);
}

export function QueryParam(name: string): ParameterDecorator {
  return describeArgument('query', name);
}

export function Json(): ParameterDecorator {
  return describeArgument('json');
}

export function Form(): ParameterDecorator {
  return describeArgument('form');
}

export function describeArgument(
  type: FetcheasyParam,
  name?: string,
): ParameterDecorator {
  return function (target: any, methodName: any, parameterIndex: number): void {
    const fetcheasy = target[FETCHEASY] as FetcheasyMethods;
    const singleBodyIndex = fetcheasy?.[methodName]?.[type] ?? null;
    if (SingleBodyTypes.includes(type) && singleBodyIndex !== null) {
      throw new Error(
        `Method argument already defines ${type} at index [${singleBodyIndex}]`,
      );
    }

    target[FETCHEASY] = {
      ...fetcheasy,
      [methodName]: {
        ...fetcheasy?.[methodName],
        [type]: SingleBodyTypes.includes(type)
          ? parameterIndex
          : {
              // @ts-ignore
              ...fetcheasy?.[methodName]?.[type],
              [name!]: parameterIndex,
            },
        // Force request header for json body
        ...(type === 'json' && {
          headers: {
            ...fetcheasy?.[methodName]?.headers,
            [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
          },
        }),
      },
    } as FetcheasyMethods;
  };
}
