import { TestBed } from '@angular/core/testing';

import { FaceApi } from './face-api';

describe('FaceApi', () => {
  let service: FaceApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaceApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
