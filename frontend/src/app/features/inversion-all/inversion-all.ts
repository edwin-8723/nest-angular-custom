import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InversionService } from '../../core/inversion';
import { Inversion } from '../../models/inversion';

@Component({
  selector: 'app-inversion-all',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './inversion-all.html',
  styleUrl: './inversion-all.scss',
})
export class InversionAll {
  private readonly inversionService = inject(InversionService);

  protected readonly inversiones = signal<Inversion[]>([]);
  protected readonly loading = signal(true);

  constructor() {
    this.inversionService.getAll().subscribe((inversiones) => {
      this.inversiones.set(inversiones);
      this.loading.set(false);
    });
  }
}
