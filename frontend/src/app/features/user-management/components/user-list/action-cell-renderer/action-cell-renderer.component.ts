import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-cell-renderer',
  standalone: true,
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.scss']
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onEdit() {
    this.params.context.componentParent.onEditUser(this.params.data); // Trigger edit in parent
  }

  onViewDetails() {
    this.params.context.componentParent.onViewUserDetails(this.params.data); // Trigger view details in parent
  }

  onDelete() {
    this.params.context.componentParent.onDeleteUser(this.params.data); // Trigger delete in parent
  }
}
