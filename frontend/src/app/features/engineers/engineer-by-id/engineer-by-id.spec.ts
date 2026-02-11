import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerById } from './engineer-by-id.component';

describe('EngineerById', () => {
  let component: EngineerById;
  let fixture: ComponentFixture<EngineerById>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerById]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerById);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
