import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';
import { classes } from '@automapper/classes';
import { ObjectId } from 'mongodb';

import { TagDbModel } from './db/tag.model';
import { TagModel } from './api/tag.model';

// Create and export the mapper
export const mapper = createMapper({
	strategyInitializer: classes(),
});

createMap(mapper, TagDbModel, TagModel,
	forMember(
		(destination) => destination.id,
		mapFrom((source) => source._id?.toString())
	)
);
createMap(mapper, TagModel, TagDbModel,
	forMember(
		(destination) => destination._id,
		mapFrom((source) => new ObjectId(source.id))
	)
);
