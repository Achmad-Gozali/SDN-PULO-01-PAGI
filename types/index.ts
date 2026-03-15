export interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  isImportant: boolean;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface SchoolStat {
  label: string;
  value: string;
  iconName: string;
}
