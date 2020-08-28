import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { quizContentComponent } from './content.component';

describe('ContentComponent', () => {
  let component: quizContentComponent;
  let fixture: ComponentFixture<quizContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ quizContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(quizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
