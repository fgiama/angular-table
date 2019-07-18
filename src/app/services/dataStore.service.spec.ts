import { TestBed } from '@angular/core/testing';

import { DataStoreService } from './dataStore.service';

describe('MyTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStoreService = TestBed.get(DataStoreService);
    expect(service).toBeTruthy();
  });
});
