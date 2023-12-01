import { Injectable } from "@angular/core";
import { GetItemsResponse, ItemsService } from "../api";
import { Observable } from "rxjs";

@Injectable()
export class ItemService {
    constructor(private readonly service: ItemsService) {}

    public getItems(options?: {
        code?: number;
        codeFrom?: number;
        codeTo?: number;
        value?: string;
        valueContains?: string;
        page?: number;
        pageSize?: number;
    }): Observable<GetItemsResponse> {
        return this.service.itemsGet(
            options?.code,
            options?.codeFrom,
            options?.codeTo,
            options?.value,
            options?.valueContains,
            options?.page,
            options?.pageSize
        );
    }
}
