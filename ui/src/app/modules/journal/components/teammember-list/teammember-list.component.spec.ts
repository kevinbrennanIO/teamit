import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammemberListComponent } from './teammember-list.component';

describe('TeammemberListComponent', () => {
  let component: TeammemberListComponent;
  let fixture: ComponentFixture<TeammemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeammemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
