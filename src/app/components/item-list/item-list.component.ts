import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PatunganItem } from '../../models/patungan.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {
  @Input() items: PatunganItem[] = [];

  @Output() changeQty = new EventEmitter<{ id: number; delta: number }>();
  @Output() removeItem = new EventEmitter<number>();
  @Output() clearAll = new EventEmitter<void>();

  formatRupiah(amount: number): string {
    return 'Rp' + Math.round(amount).toLocaleString('id-ID');
  }
}