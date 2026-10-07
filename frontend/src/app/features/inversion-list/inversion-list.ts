import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InversionService } from '../../core/inversion';
import { Inversion } from '../../models/inversion';

@Component({
  selector: 'app-inversion-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './inversion-list.html',
  styleUrl: './inversion-list.scss',
})
export class InversionList {
  private readonly route = inject(ActivatedRoute);
  private readonly inversionService = inject(InversionService);

  protected readonly userId = Number(this.route.snapshot.paramMap.get('userId'));
  protected readonly inversiones = signal<Inversion[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.inversionService.getAllByUser(this.userId).subscribe({
      next: (inversiones) => {
        this.inversiones.set(inversiones);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(`No se encontró el usuario ${this.userId}.`);
        this.loading.set(false);
      },
    });
  }

  protected deleteInversion(id: number): void {
    this.inversionService.delete(this.userId, id).subscribe(() => {
      this.inversiones.update((list) => list.filter((i) => i.id !== id));
    });
  }
}
