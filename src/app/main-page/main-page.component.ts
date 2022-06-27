import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TagModel } from 'api/models/api/tag.model';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent
{
	tags:TagModel[] = [];
	public newTag = "";
	public tagId = "";

	constructor(private http: HttpClient)
	{
		this.updateList();
	}

	updateList()
	{
		this.http.get<TagModel[]>(`/api/GetTags`)
			.subscribe((resp: TagModel[]) =>
			{
				this.tags = resp;
			});
	}

	addTag()
	{
		this.http.post("/api/AddTag", {title: this.newTag})
			.subscribe((resp: any) =>
			{
				this.updateList();
			});
	}

	updateTag()
	{
		const model:TagModel = {
			id: this.tagId,
			title: this.newTag
		};
		this.http.post("/api/UpdateTag", model)
			.subscribe((resp: any) =>
			{
				this.updateList();
			});
	}

	deleteTag()
	{
		this.http.post("/api/DeleteTag", { id: this.tagId })
			.subscribe((resp: any) =>
			{
				this.updateList();
			});
	}
}
