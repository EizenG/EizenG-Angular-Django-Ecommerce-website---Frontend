import { TestBed } from '@angular/core/testing';

import { ShareDataBtwCompService } from './share-data-btw-comp.service';

describe('ShareDataBtwCompService', () => {
  let service: ShareDataBtwCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataBtwCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
