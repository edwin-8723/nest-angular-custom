import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InversionService } from '../../core/inversion';

@Component({
  selector: 'app-inversion-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inversion-form.html',
  styleUrl: './inversion-form.scss',
})
export class InversionForm {
  private readonly fb = inject(FormBuilder);
  private readonly inversionService = inject(InversionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly userId = Number(this.route.snapshot.paramMap.get('userId'));

  protected readonly form = this.fb.nonNullable.group({
    tipo: ['', Validators.required],
    monto: [0, [Validators.required, Validators.min(0)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.inversionService
      .create(this.userId, this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/users', this.userId, 'inversiones']));
  }
}
