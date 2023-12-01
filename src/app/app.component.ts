import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ApiModule, ItemOut } from '../api';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { ItemService } from './item.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GetItemsOptions } from './GetItemsOptions';
import { FormsModule } from '@angular/forms';
import { combineLatestWith, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ApiModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
    ],
})
export class AppComponent implements OnInit {
    public readonly itemOptions: GetItemsOptions = {};
    public readonly columns: (keyof ItemOut)[] = ['order', 'code', 'value'];
    public items: Observable<ItemOut[]> = of([]);
    public totalCount = 0;

    private readonly pagination = new BehaviorSubject({
        page: 1,
        pageSize: 10,
    });
    private readonly filterChanges = new BehaviorSubject<any>(0);

    constructor(private readonly itemService: ItemService) {}

    public ngOnInit(): void {
        this.items = this.pagination.pipe(
            combineLatestWith(this.filterChanges.pipe(
                debounceTime(1000)
            )),
            switchMap(([{ page, pageSize }]) => {
                this.itemOptions.page = page;
                this.itemOptions.pageSize = pageSize;
                return this.itemService.getItems(this.itemOptions);
            }),
            tap(response => this.totalCount = response.totalCount ?? 0),
            map(response => response.items ?? []),
            shareReplay(1),
        );
    }

    public onPageChange(event: PageEvent): void {
        this.pagination.next({
            page: event.pageIndex + 1,
            pageSize: event.pageSize,
        });
    }

    public onFilterChange(): void {
        this.filterChanges.next(0);
    }
}
