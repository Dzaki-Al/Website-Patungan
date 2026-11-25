import { Component, computed, signal } from '@angular/core';
import { PatunganItem } from './models/patungan.model';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';

@Component({
  selector: 'app-root',
  imports: [ItemFormComponent, ItemListComponent, SummaryCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  eventTitle = 'Patungan';
  eventSubtitle = 'Makan malam bareng, Jumat, 20 November 2026';

  peopleCount = signal<number>(4);
  taxPercent = signal<number>(10);

  items = signal<PatunganItem[]>([
    { id: 1, name: 'Nasi goreng spesial', price: 28000, qty: 2 },
    { id: 2, name: 'Mie ayam bakso', price: 22000, qty: 1 },
    { id: 3, name: 'Ayam bakar madu', price: 35000, qty: 2 },
    { id: 4, name: 'Es teh manis', price: 6000, qty: 4 },
    { id: 5, name: 'Kentang goreng', price: 18000, qty: 1 },
  ]);

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  handleAddItem(payload: { name: string; price: number }): void {
    const nextId =
      this.items().reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

    this.items.update((list) => [
      ...list,
      { id: nextId, name: payload.name, price: payload.price, qty: 1 },
    ]);
  }

  handleChangeQty(payload: { id: number; delta: number }): void {
    this.items.update((list) =>
      list
        .map((item) =>
          item.id === payload.id ? { ...item, qty: item.qty + payload.delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  handleRemoveItem(id: number): void {
    this.items.update((list) => list.filter((item) => item.id !== id));
  }

  handleClearAll(): void {
    this.items.set([]);
  }
}