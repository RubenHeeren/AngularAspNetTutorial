import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePostConfirmComponent } from './modal-delete-post-confirm.component';

describe('ModalDeletePostConfirmComponent', () => {
  let component: ModalDeletePostConfirmComponent;
  let fixture: ComponentFixture<ModalDeletePostConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletePostConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeletePostConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
