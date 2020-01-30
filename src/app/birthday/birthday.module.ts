import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdayComponent } from './birthday.component';

@NgModule({
  imports: [CommonModule],
  exports: [BirthdayComponent],
  declarations: [BirthdayComponent],
})
export class BirthdayModule {}
