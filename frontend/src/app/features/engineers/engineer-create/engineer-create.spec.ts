import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerCreate } from './engineer-create.component';

describe('EngineerCreate', () => {
  let component: EngineerCreate;
  let fixture: ComponentFixture<EngineerCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
