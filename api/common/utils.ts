import { Context } from "@azure/functions";

export const db_title:string = "lab5";
export const tags_collection:string = "tags";

export function setErrorResult(context: Context, errorCode: number, errorMessage: string): void
{
	context.res.json({ error: errorMessage });
	context.res.status = errorCode;
	context.log(errorMessage);
}
