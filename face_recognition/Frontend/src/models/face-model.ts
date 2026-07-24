export interface FaceRecord {
    id: string;
    thumbnail_b64: string;
    enrolled_at: string;
    source_file: string;
}

export interface PersonGallery {
    name: string;
    department?: string;
    photos: FaceRecord[];
}

export interface DetectedFace {
    index: number;
    bbox: number[];
    thumbnail_b64: string;
}

export interface DetectResponse {
    image_b64: string;
    image_width: number;
    image_height: number;
    faces: DetectedFace[];
}

export interface IdentifyResult {
    bbox: number[];
    name: string;
    confidence: number;
    thumbnail_b64: string;
}

export interface IdentifyResponse {
    image_b64: string;
    image_width: number;
    image_height: number;
    results: IdentifyResult[];
}

export interface ParticipantRecord {
    name: string;
    department?: string;
    status: 'present' | 'absent';
    present_at?: string;
    face_thumbnail_b64?: string;
}

export interface MeetingRecord {
    id?: string;
    meeting_title: string;
    meeting_start_time: string;
    meeting_end_time: string;
    participants: ParticipantRecord[];
    created_at?: string;
}