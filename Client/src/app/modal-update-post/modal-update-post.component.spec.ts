import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdatePostComponent } from './modal-update-post.component';

describe('ModalUpdatePostComponent', () => {
  let component: ModalUpdatePostComponent;
  let fixture: ComponentFixture<ModalUpdatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
