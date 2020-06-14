import { async, TestBed } from '@angular/core/testing';
import { PostThumbnailComponent } from './post-thumbnail.component';
describe('PostThumbnailComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostThumbnailComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PostThumbnailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=post-thumbnail.component.spec.js.map