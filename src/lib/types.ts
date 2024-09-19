export interface Result<T> {
	type: "success" | "error";
	message: string;
	data?: T;
}
