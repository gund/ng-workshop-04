import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BirthdayModule } from './birthday/birthday.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BirthdayModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
