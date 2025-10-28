import "reflect-metadata";
import { DataSource } from "typeorm";
import { CardEntity } from "../models/card.entity";
import path from "node:path";

const AppDataSource = new DataSource({
	type: "sqlite",
	// eslint-disable-next-line no-undef
	database: path.resolve(__dirname, "../models/cards.db"),
	logging: true,
	entities: [CardEntity],
});


export default async function getDataSource(): Promise<DataSource> {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	return AppDataSource;
};