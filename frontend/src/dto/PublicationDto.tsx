export interface PublicationDto {
    id: number;
    title: string;
    author: string;
    publicationDate: string;
    language: string;
    publicationType?: string;
    available: boolean;
    image?: string;
    isbn?: string;
    genre?: string;
    pageCount?: number;
    format?: string;
    summary?: string;
    frequency?: string;
}