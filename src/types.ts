export interface Question {
  id: string;
  section: string;
  title: string;
  type: 'welcome' | 'select' | 'radio' | 'date' | 'rating' | 'text';
  value?: string;
  options?: string[];
  description?: string;
  optional?: boolean;
}

export interface GoogleFormQuestion {
  question: string;
  options: string[];
}

export interface GoogleFormConfig {
  [entryId: string]: GoogleFormQuestion;
}

export interface Answers {
  satker?: string;
  layanan?: string;
  tanggal?: string;
  jenis_kelamin?: string;
  pendidikan?: string;
  usia?: string;
  pekerjaan?: string;
  disabilitas?: string;
  jenis_disabilitas?: string;
  [entryId: string]: string | undefined;
}
