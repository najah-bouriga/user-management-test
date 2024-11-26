import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  @Input() title: string = 'Modal Title'; // Modal title
  @Input() showFooter: boolean = true; // Show/hide footer
  @Input() showSaveButton: boolean = true; // Show/hide Save button

  @Output() onSave = new EventEmitter<void>(); // Emit Save event
  @Output() onClose = new EventEmitter<void>(); // Emit Close event

  private modalService = inject(NgbModal); // Inject NgbModal service
  private modalRef!: NgbModalRef;

  // Open the modal
  open() {
    this.modalRef = this.modalService.open(this.modalTemplate, { backdrop: 'static', centered: true });
    this.modalRef.result
      .then(() => this.onClose.emit()) // Emit close event when modal is closed
      .catch(() => this.onClose.emit()); // Emit close event when modal is dismissed
  }

  // Save action
  save() {
    this.onSave.emit(); // Emit Save event
    this.closeModal(); // Close the modal
  }

  // Close action
  closeModal() {
    if (this.modalRef) {
      this.modalRef.dismiss(); // Dismiss the modal
    }
  }
}
