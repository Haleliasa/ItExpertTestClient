import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiModule, ItemOut } from '../api';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { ItemService } from './item.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        ApiModule,
        MatTableModule,
        MatPaginatorModule,
    ],
})
export class AppComponent implements OnInit {
    public readonly columns: (keyof ItemOut)[] = ['order', 'code', 'value'];
    public items: Observable<ItemOut[]> = of([]);
    public totalCount = 0;

    private readonly pagination = new BehaviorSubject({
        page: 1,
        pageSize: 10,
    })

    constructor(private readonly itemService: ItemService) {}

    public ngOnInit(): void {
        this.items = this.pagination.pipe(
            switchMap(({ page, pageSize }) => this.itemService.getItems({ page, pageSize })),
            tap(response => this.totalCount = response.totalCount ?? 0),
            map(response => response.items ?? []),
            shareReplay(1),
        );
    }

    public onPageChange(event: PageEvent) {
        this.pagination.next({
            page: event.pageIndex + 1,
            pageSize: event.pageSize,
        });
    }
}
