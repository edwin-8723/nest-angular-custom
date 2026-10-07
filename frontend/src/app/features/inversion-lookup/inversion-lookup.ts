import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inversion-lookup',
  imports: [RouterLink],
  templateUrl: './inversion-lookup.html',
  styleUrl: './inversion-lookup.scss',
})
export class InversionLookup {
  private readonly router = inject(Router);

  protected readonly userId = signal<number | null>(null);

  protected onUserIdChange(value: string): void {
    const parsed = Number(value);
    this.userId.set(Number.isFinite(parsed) && value !== '' ? parsed : null);
  }

  protected goToInversiones(): void {
    const id = this.userId();
    if (id) {
      this.router.navigate(['/users', id, 'inversiones']);
    }
  }
}
