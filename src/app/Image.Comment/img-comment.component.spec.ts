import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCommentComponent } from './img-comment.component';

describe('ImgCommentComponent', () => {
  let component: ImgCommentComponent;
  let fixture: ComponentFixture<ImgCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
