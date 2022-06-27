import { AutoMap } from "@automapper/classes";

export class TagModel
{
	@AutoMap()
	id: string;
	@AutoMap()
	title: string;
};
