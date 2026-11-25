import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  imports: [FormsModule],
  templateUrl: './item-form.component.html',
})
export class ItemFormComponent {
  @Input() peopleCount = 4;
  @Input() taxPercent = 10;

  @Output() peopleCountChange = new EventEmitter<number>();
  @Output() taxPercentChange = new EventEmitter<number>();
  @Output() addItem = new EventEmitter<{ name: string; price: number }>();

  itemName = '';
  itemPrice: number | null = null;

  onSubmit(): void {
    const trimmedName = this.itemName.trim();
    const validPrice = Number(this.itemPrice);

    // Abaikan input tidak valid agar daftar tetap bersih
    if (!trimmedName || Number.isNaN(validPrice) || validPrice <= 0) return;

    this.addItem.emit({ name: trimmedName, price: validPrice });
    this.itemName = '';
    this.itemPrice = null;
  }

  onPeopleChange(value: number): void {
    this.peopleCountChange.emit(Math.max(0, Number(value) || 0));
  }

  onTaxChange(value: number): void {
    this.taxPercentChange.emit(Math.max(0, Number(value) || 0));
  }
}