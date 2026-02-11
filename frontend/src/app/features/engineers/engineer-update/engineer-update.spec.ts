import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerUpdate } from './engineer-update.component';

describe('EngineerUpdate', () => {
  let component: EngineerUpdate;
  let fixture: ComponentFixture<EngineerUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
