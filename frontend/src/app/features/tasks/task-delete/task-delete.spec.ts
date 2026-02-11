import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDelete } from './task-delete.component';

describe('TaskDelete', () => {
  let component: TaskDelete;
  let fixture: ComponentFixture<TaskDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
