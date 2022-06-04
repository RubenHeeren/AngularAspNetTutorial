import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePostComponent } from './modal-create-post.component';

describe('ModalCreatePostComponent', () => {
  let component: ModalCreatePostComponent;
  let fixture: ComponentFixture<ModalCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
