export type ClassLike<T> = { new (): T };

export type ObjectStringsLike = { [key: string]: string };
export type ObjectNumberLike = { [key: string]: number };
export type ObjectLike<V> = { [key: string]: V };

export type UnaryAny = (result: any) => any;
