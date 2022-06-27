import { AutoMap } from "@automapper/classes";
import { ObjectId } from "mongodb";

export class TagDbModel
{
	@AutoMap()
	_id: ObjectId;
	@AutoMap()
	title: string;
};
