// action-cell-renderer.component.ts
import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-action-cell-renderer',
  standalone:true,
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
    this.params.context.componentParent.onEditUser(this.params.data);
  }

  onViewDetails() {
    this.params.context.componentParent.onViewUserDetails(this.params.data);
  }

  onDelete() {
    this.params.context.componentParent.onDeleteUser(this.params.data);
  }
}
