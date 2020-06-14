import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
describe('DataService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(DataService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data.service.spec.js.map