import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { db_title, setErrorResult, tags_collection } from "../common/utils";
import { TagDbModel } from "../models/db/tag.model";

const client = new MongoClient(process.env.CONNECTION_STRING);

const httpTrigger: AzureFunction = async function (context: Context, request: HttpRequest): Promise<void>
{
	if (!request.body)
	{
		setErrorResult(context, 400, "Request body is empty");
		return;
	}
	const inputTagId: ObjectId = new ObjectId(request.body.id);
	
	try
	{
		await client.connect();
		const database: Db = client.db(db_title);
		const tagsCollection: Collection<TagDbModel> = database.collection<TagDbModel>(tags_collection);

		const result = await tagsCollection.deleteOne({"_id": inputTagId});

		context.log(`Count of deleted tags: ${result.deletedCount}`);
	}
	catch (error)
	{
		setErrorResult(context, 500, `Error occurred "${error}"`);
	}
	finally
	{
		await client.close();
	}
};

export default httpTrigger;
