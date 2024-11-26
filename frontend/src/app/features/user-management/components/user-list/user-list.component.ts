import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ColDef, CellClickedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  @Output() onEdit = new EventEmitter<User>();
  @Output() onViewDetails = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<User>();

  private destroy$ = new Subject<void>();
  private gridApi!: GridApi<User>;

  rowData: User[] = [];
  paginationPageSize = 10;

  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      flex: 0,
      sortable: true,
      filter: true
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      sortable: true,
      filter: true
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      sortable: true,
      filter: true
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      sortable: true,
      filter: true
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      flex: 0,
      sortable: true,
      filter: true
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filter: false,
      resizable: false,
      cellRenderer: this.createActionCellRenderer,
      cellClass: 'action-cell'
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers(): void {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.rowData = users.results;
          if (this.gridApi) {
            // Update grid data
            this.gridApi.setGridOption('rowData', users.results);
          }
        },
        error: (error) => console.error('Error loading users:', error),
      });
  }

  onGridReady(params: GridReadyEvent<User>): void {
    this.gridApi = params.api;
    // Set pagination page size
    this.gridApi.setGridOption('paginationPageSize', this.paginationPageSize);
    this.gridApi.sizeColumnsToFit();
  }

  handleAction(event: CellClickedEvent): void {
    const target = event.event?.target as HTMLElement;
    const button = target.closest('button');

    if (button) {
      const action = button.getAttribute('data-action');
      const user = event.data as User;

      if (user) {
        switch (action) {
          case 'details':
            this.onViewDetails.emit(user);
            break;
          case 'edit':
            this.onEdit.emit(user);
            break;
          case 'delete':
            this.onDelete.emit(user);
            this.deleteUser(user);
            break;
        }
      }
    }
  }

  private deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadUsers(); // Reload the entire grid data
        },
        error: (error) => console.error('Error deleting user:', error),
      });
  }

  private createActionCellRenderer(): string {
    return `
      <div class="d-flex gap-2 justify-content-center align-items-center">
        <button class="btn btn-outline-info btn-sm" data-action="details">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-outline-warning btn-sm" data-action="edit">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm" data-action="delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  }
}
