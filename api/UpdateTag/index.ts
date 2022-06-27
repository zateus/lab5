import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient, ObjectId } from "mongodb";
import { db_title, setErrorResult, tags_collection } from "../common/utils";
import { TagDbModel } from "../models/db/tag.model";

const client = new MongoClient(process.env.CONNECTION_STRING);

const httpTrigger: AzureFunction = async function (context: Context, request: HttpRequest): Promise<void>
{
	const inputTagId: ObjectId = new ObjectId(request.body.id);
	const titleTag: string = request.body.title;
	try
	{
		await client.connect();
		
		const database = client.db(db_title);
		const tagsCollection = database.collection<TagDbModel>(tags_collection);
		
		const result = await tagsCollection.updateOne({"_id": inputTagId}, { $set: { title: titleTag }});
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
