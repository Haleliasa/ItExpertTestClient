import { Injectable } from "@angular/core";
import { GetItemsResponse, ItemsService } from "../api";
import { Observable } from "rxjs";
import { GetItemsOptions } from "./GetItemsOptions";

@Injectable()
export class ItemService {
    constructor(private readonly service: ItemsService) {}

    public getItems(options?: GetItemsOptions): Observable<GetItemsResponse> {
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
