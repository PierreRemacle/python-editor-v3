export interface CustomCodeBlock {
  slug: string;
  title: string;
  description?: string;
  code: string;
}

export interface CustomSection {
  slug: string;
  name: string;
  blocks: CustomCodeBlock[];
}
