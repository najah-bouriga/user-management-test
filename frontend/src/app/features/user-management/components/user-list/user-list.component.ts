import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  ColDef,
  GridApi,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  RowModelType,
  GetRowIdFunc,
  GetRowIdParams,
} from 'ag-grid-enterprise';
import 'ag-grid-enterprise';

import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Subject } from 'rxjs';
import {ActionCellRendererComponent} from './action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @Output() onEdit = new EventEmitter<User>();
  @Output() onViewDetails = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<User>();

  public rowModelType: RowModelType = 'serverSide';
  public context: any;
  public frameworkComponents: any;

  private destroy$ = new Subject<void>();
  private gridApi!: GridApi;

  paginationPageSize = 10;
  private versionCounter = 1;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
    { field: 'user_name', headerName: 'User Name', flex: 1 },
    { field: 'full_name', headerName: 'Full Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 0.5, minWidth: 120 },
    { field: 'telephone', headerName: 'Phone Number', flex: 1 },
    { field: 'birthday', headerName: 'Birthday', flex: 1 },
    {
      flex: 0.5,
      minWidth: 150,
      maxWidth: 200,
      headerName: 'Actions',
      field: 'actions',
      width: 180,
      cellRenderer: 'actionCellRenderer',
      cellClass: 'action-cell',
      sortable: false,
      filter: false,
      suppressSizeToFit: true,
      resizable: false,
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
  };

  constructor(private userService: UserService) {
    this.frameworkComponents = {
      actionCellRenderer: ActionCellRendererComponent,
    };
    this.context = { componentParent: this };
  }

  ngOnInit(): void {
    this.startVersionCounter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startVersionCounter() {
    setInterval(() => {
      this.versionCounter += 1;
    }, 4000);
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    const dataSource = this.getServerSideDatasource();
    this.gridApi!.setGridOption('serverSideDatasource', dataSource);
  }

  private getServerSideDatasource(): IServerSideDatasource {
    return {
      getRows: (params: IServerSideGetRowsParams) => {
        console.log('[Datasource] - rows requested by grid:', params.request);

        const { page, pageSize } = this.mapGridParamsToRequest(params);
        const filterParams = this.mapGridFilters(params);
        const sortParams = this.mapGridSorting(params);

        // Call your service to get data
        this.userService.getAllUsers(page, pageSize, filterParams, sortParams).subscribe({
          next: (response) => {
            const processedData = response.results.map((rowData: any) => ({
              ...rowData,
              version: `${this.versionCounter} - ${this.versionCounter} - ${this.versionCounter}`,
            }));

            params.success({
              rowData: processedData,
              rowCount: response.count, // Use 'count' from your API response
            });
          },
          error: (error) => {
            console.error('Error fetching data', error);
            params.fail();
          },
        });
      },
    };
  }

  private mapGridParamsToRequest(params: IServerSideGetRowsParams): { page: number; pageSize: number } {
    const startRow = params.request.startRow ?? 0;
    const endRow = params.request.endRow ?? 0;
    const pageSize = endRow - startRow;
    const page = Math.floor(startRow / pageSize) + 1;

    return { page, pageSize };
  }

  private mapGridFilters(params: IServerSideGetRowsParams): any {
    const filterModel = params.request.filterModel;

    if (!filterModel) {
      return {};
    }

    const filters: { [key: string]: any } = {};

    Object.keys(filterModel).forEach((field) => {
      const filter = (filterModel as any)[field];
      if (filter && 'filter' in filter) {
        filters[field] = filter.filter; // Safe access to filter property
      }
    });

    return filters;
  }

  private mapGridSorting(params: IServerSideGetRowsParams): string[] {
    const sortModel = params.request.sortModel;
    const sorts: string[] = [];

    for (const sort of sortModel) {
      const direction = sort.sort === 'asc' ? '' : '-';
      sorts.push(`${direction}${sort.colId}`);
    }

    return sorts;
  }

  onStoreRefreshed(event: any) {
    console.log('Refresh finished for store with route:', event.route);
  }

  public onEditUser(user: User): void {
    this.onEdit.emit(user);
  }

  public onViewUserDetails(user: User): void {
    this.onViewDetails.emit(user);
  }

  public onDeleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.gridApi.refreshServerSide({ purge: true });
      },
      error: (error) => console.error('Error deleting user:', error),
    });
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    const data = params.data;
    return data.id;
  };
}
