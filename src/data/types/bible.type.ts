export type SupportedLanguage = 'pt' | 'la' | 'el';

export type BibleChapterSearchResponse = {
  number: number;
  text: string;
};

interface VersePart {
  n: number;
  t: string;
}

interface Translation {
  reference: string;
  parts: VersePart[];
}

export type BibleSearchResult = {
  abbrev: string;
  ambiguous: boolean;
  book_name: string;
  chapter: number;
  reference: string;
  text: string;
  type: string;
  url?: string;
  valid: boolean;
  verse?: number;
  verses?: Record<SupportedLanguage, Translation>;
}

export type BibleSearchResponse = {
  query: string;
  results: BibleSearchResult[];
}