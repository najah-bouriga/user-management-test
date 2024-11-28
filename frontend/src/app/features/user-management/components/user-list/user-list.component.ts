import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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

import {User} from '../../../../core/models/user.model';
import {UserService} from '../../../../core/services/user.service';
import {Subject} from 'rxjs';
import {ActionCellRendererComponent} from './action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Output() onEdit = new EventEmitter<User>();
  @Output() onViewDetails = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<User>();

  public rowModelType: RowModelType = 'serverSide';
  public context: any;
  public frameworkComponents: any;
  public gridApi!: GridApi;

  paginationPageSize = 10;
  paginationPageSizeOptions = [10, 25, 50, 100, 200];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70, sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'user_name', headerName: 'User Name', flex: 1, sortable: true, filter: 'agTextColumnFilter' },
    { field: 'full_name', headerName: 'Full Name', flex: 1, sortable: true, filter: 'agTextColumnFilter' },
    { field: 'email', headerName: 'Email', flex: 1, sortable: true, filter: 'agTextColumnFilter' },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
      minWidth: 120,
      sortable: true,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => params.data.role?.name || 'No Role',
    },
    { field: 'telephone', headerName: 'Phone Number', flex: 1, sortable: true, filter: 'agTextColumnFilter' },
    {
      field: 'birthday',
      headerName: 'Birthday',
      flex: 1,
      sortable: true,
      filter: 'agDateColumnFilter',
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      flex: 1,
      sortable: true,
      filter: 'agDateColumnFilter',
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : '',
    },
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
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 100
  };

  constructor(private userService: UserService) {
    this.frameworkComponents = {
      actionCellRenderer: ActionCellRendererComponent,
    };
    this.context = {componentParent: this};
  }

  ngOnInit(): void {
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    const dataSource = this.getServerSideDatasource();
    this.gridApi!.setGridOption('serverSideDatasource', dataSource);
  }

  private getServerSideDatasource(): IServerSideDatasource {
    return {
      getRows: (params: IServerSideGetRowsParams) => {
        const { page, pageSize } = this.mapGridParamsToRequest(params);
        const filterParams = this.mapGridFilters(params);
        const sortParams = this.mapGridSorting(params);

        this.userService.getAllUsers(page, pageSize, filterParams, sortParams).subscribe({
          next: (response) => {
            params.success({
              rowData: response.results,
              rowCount: response.count,
            });
          },
          error: () => {
            params.fail();
          },
        });
      },
    };
  }

  private mapGridParamsToRequest(params: IServerSideGetRowsParams): { page: number; pageSize: number } {
    const startRow = params.request.startRow || 0;
    const endRow = params.request.endRow || 0;
    const pageSize = endRow - startRow || 10;
    const page = Math.floor(startRow / pageSize) + 1;

    return { page, pageSize };
  }

  private mapGridFilters(params: IServerSideGetRowsParams): Record<string, any> {
    const filterModel = params.request.filterModel || {};
    const filters: Record<string, any> = {};

    Object.keys(filterModel).forEach((field) => {
      const filter = (filterModel as any)[field];
      if (filter.filterType === 'text') {
        filters[field] = filter.filter;
      } else if (filter.filterType === 'date') {
        if (filter.type === 'equals') {
          filters[field] = filter.dateFrom;
        } else if (filter.type === 'lessThan') {
          filters[`${field}__lte`] = filter.dateFrom;
        } else if (filter.type === 'greaterThan') {
          filters[`${field}__gte`] = filter.dateFrom;
        }
      }
    });

    return filters;
  }

  private mapGridSorting(params: IServerSideGetRowsParams): string[] {
    const sortModel = params.request.sortModel || [];
    const sortParams: string[] = [];

    sortModel.forEach((sort) => {
      if (sort.colId === 'role') {
        sortParams.push(sort.sort === 'desc' ? '-role__name' : 'role__name');
      } else if (['created_at', 'updated_at', 'birthday'].includes(sort.colId)) {
        sortParams.push(sort.sort === 'desc' ? `-${sort.colId}` : sort.colId);
      } else {
        sortParams.push(sort.sort === 'desc' ? `-${sort.colId}` : sort.colId);
      }
    });

    return sortParams;
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
        this.gridApi.refreshServerSide({purge: true});
      },
      error: (error) => console.error('Error deleting user:', error),
    });
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    const data = params.data;
    return `${data.id}`;
  };
}
