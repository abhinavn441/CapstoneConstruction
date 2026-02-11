import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskByProject } from './task-by-project.component';

describe('TaskByProject', () => {
  let component: TaskByProject;
  let fixture: ComponentFixture<TaskByProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskByProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskByProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
