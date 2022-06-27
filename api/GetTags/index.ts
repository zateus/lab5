import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient } from "mongodb";
import { db_title, setErrorResult, tags_collection } from "../common/utils";
import { TagModel } from "../models/api/tag.model";
import { TagDbModel } from "../models/db/tag.model";
import { mapper } from "../models/mapper";

const client = new MongoClient(process.env.CONNECTION_STRING);

const httpTrigger: AzureFunction = async function (context: Context, request: HttpRequest): Promise<void> 
{
	try
	{
		await client.connect();
		
		const database = client.db(db_title);
		const tagsCollection = database.collection<TagDbModel>(tags_collection);

		const tags = await tagsCollection.find().toArray();
		const apiArray = mapper.mapArray(tags, TagDbModel, TagModel);
		context.res.json(apiArray);
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
