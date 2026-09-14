export type IResponseData<T> = IResponse & T;

export type IResponse = {
	success?: boolean;
	error?: boolean;
	message?: string;
};
