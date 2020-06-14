import { TestBed, inject } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
describe('AdminGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AdminGuard]
        });
    });
    it('should ...', inject([AdminGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=admin.guard.spec.js.map