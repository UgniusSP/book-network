export interface ReviewDto {
    id: number;
    text: string;
    reviewer: string;
    replies?: ReviewDto[];
    parentReviewId?: number;
}
