import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerDelete } from './engineer-delete.component';

describe('EngineerDelete', () => {
  let component: EngineerDelete;
  let fixture: ComponentFixture<EngineerDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
