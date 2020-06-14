import { TestBed } from '@angular/core/testing';
import { FeedsService } from './feeds.service';
describe('FeedsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(FeedsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=feeds.service.spec.js.map