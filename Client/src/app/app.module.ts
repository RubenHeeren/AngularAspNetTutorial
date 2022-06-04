import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePostComponent } from './modal-create-post/modal-create-post.component';
import { ModalUpdatePostComponent } from './modal-update-post/modal-update-post.component';
import { ModalDeletePostConfirmComponent } from './modal-delete-post-confirm/modal-delete-post-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalCreatePostComponent,
    ModalUpdatePostComponent,
    ModalDeletePostConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
