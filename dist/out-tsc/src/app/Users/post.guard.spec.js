import { TestBed, inject } from '@angular/core/testing';
import { PostGuard } from './post.guard';
describe('PostGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostGuard]
        });
    });
    it('should ...', inject([PostGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=post.guard.spec.js.map