import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/shared/interfaces/user.dto';

@Component({
    selector: 'bdgf-mat-table',
    templateUrl: './bdgf-mat-table.component.html',
    styleUrls: ['./bdgf-mat-table.component.scss'],
})
export class BdgfMatTable implements AfterViewInit {
    tableSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Output() onRead = new EventEmitter<string>();
    @Output() onUpdate = new EventEmitter<string>();
    @Output() onDelete = new EventEmitter<string>();
    @Output() onCreate = new EventEmitter();
    @Output() switchOfflineMode = new EventEmitter();

    @Input() dataSource!: Observable<UserDto[]>;
    @Input() columns!: { name: string; def: string; sorting: boolean }[];
    @Input() sizesPerPage!: number[];
    @Input() enableRead!: boolean;
    @Input() enableUpdate!: boolean;
    @Input() enableDelete!: boolean;
    @Input() enableAdd!: boolean;

    displayedColumns!: String[];

    constructor() {
        this.tableSource.sort = this.sort;
    }

    ngAfterViewInit(): void {
        this.displayedColumns = [
            ...this.columns.map(({ def }) => def),
            'actions',
        ];
        this.tableSource.paginator = this.paginator;
        this.dataSource.subscribe((data) => (this.tableSource.data = data));
    }

    sortData(sort: Sort) {
        const data = this.tableSource.data;
        if (!sort.active || sort.direction === '') {
            return;
        }

        this.tableSource.data = data.sort((a: any, b: any) => {
            const isAsc = sort.direction === 'asc';
            return compare(a[sort.active], b[sort.active], isAsc);
        });
    }

    read(user: string) {
        this.onRead.emit(user);
    }

    update(user: string) {
        this.onUpdate.emit(user);
    }

    delete(user: string) {
        this.onDelete.emit(user);
    }

    create() {
        this.onCreate.emit();
    }

    offlineMode() {
        this.switchOfflineMode.emit();
    }
}

function compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
