import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecById } from './project-byId.component';

describe('ProjecById', () => {
  let component: ProjecById;
  let fixture: ComponentFixture<ProjecById>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjecById]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecById);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
