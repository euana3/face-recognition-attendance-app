import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonGallery, DetectResponse, IdentifyResponse, MeetingRecord } from '../models/face-model';

@Injectable({ providedIn: 'root' })
export class FaceApiService {
  // Update this if your backend runs on a different host/port
  private baseUrl = 'http://localhost:8000/api/faces';

  constructor(private http: HttpClient) {}

  getGallery(): Observable<PersonGallery[]> {
    return this.http.get<PersonGallery[]>(`${this.baseUrl}/gallery`);
  }

  deletePhoto(photoId: string, personName: string) {
    return this.http.delete(`${this.baseUrl}/gallery/photo/${photoId}`, {
      params: { person_name: personName },
    });
  }

  detectFaces(file: File): Observable<DetectResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DetectResponse>(`${this.baseUrl}/detect`, formData);
  }

  enrollFace(file: File, personName: string, faceIndex: number, department?: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('person_name', personName);
    formData.append('face_index', faceIndex.toString());
    if (department) formData.append('department', department);
    // NOTE: backend route is currently "/app/faces/enroll" (typo) not
    // "/api/faces/enroll" — using the base URL's host but the literal path below.
    return this.http.post('http://localhost:8000/app/faces/enroll', formData);
  }

  identifyFaces(file: File): Observable<IdentifyResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<IdentifyResponse>(`${this.baseUrl}/identify`, formData);
  }

  renamePerson(personName: string, newName: string) {
    return this.http.patch(`${this.baseUrl}/gallery`, { name: newName }, {
      params: { person_name: personName },
    });
  }

  saveMeetingRecord(record: MeetingRecord) {
    return this.http.post(`${this.baseUrl}/meeting-records`, record);
  }

  getMeetingRecords(): Observable<MeetingRecord[]> {
    return this.http.get<MeetingRecord[]>(`${this.baseUrl}/meeting-records`);
  }
}