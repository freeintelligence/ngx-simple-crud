import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ManagerReadParameters } from './manager-read.parameters';

@Component({
  selector: 'ngx-simple-crud-manager-read',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './manager-read.component.html',
  styleUrl: './manager-read.component.css',
})
export class ManagerReadComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() parameters!: ManagerReadParameters;

  public displayedColumns: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.initPaginator();
    this.displayedColumnsListener();
  }

  initPaginator() {
    if (this.parameters.pagination?.remote) {
      return this.initRemotePaginator();
    } else {
      return this.initLocalPaginator();
    }
  }

  initRemotePaginator() {}

  initLocalPaginator() {}

  private displayedColumnsListener() {
    this.fnSetDisplayedColumns();
  }

  private fnSetDisplayedColumns() {
    this.displayedColumns = this.parameters.columns
      .filter((column) => !column.hidden)
      .map((column) => column.property);

    this.changeDetectorRef.detectChanges();
  }
}
