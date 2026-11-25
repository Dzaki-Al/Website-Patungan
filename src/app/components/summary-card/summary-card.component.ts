import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {
  @Input() subtotal = 0;
  @Input() taxPercent = 10;
  @Input() peopleCount = 4;

  get taxAmount(): number {
    return this.subtotal * (this.taxPercent / 100);
  }

  get grandTotal(): number {
    return this.subtotal + this.taxAmount;
  }

  get perPerson(): number {
    if (this.peopleCount <= 0) return 0;
    return this.grandTotal / this.peopleCount;
  }

  formatRupiah(amount: number): string {
    return 'Rp' + Math.round(amount).toLocaleString('id-ID');
  }
}