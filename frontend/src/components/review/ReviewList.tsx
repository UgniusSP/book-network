import React, {useEffect, useState} from 'react';
import useFetchData from "../../hooks/useFetchData";
import {ReviewDto} from "../../dto/ReviewDto";
import {useProtectedAxios} from "../../hooks/useProtectedAxios";
import {Review} from './Review';

type ReviewListProps = {
    variable: string,
    requestMapping: string,
    username?: string
};

export const ReviewList: React.FC<ReviewListProps> = ({variable, requestMapping, username}) => {
    const {data} = useFetchData(`${requestMapping}/${variable}/all`);
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [newReviewText, setNewReviewText] = useState('');
    const axios = useProtectedAxios();

    useEffect(() => {
        if (data) {
            setReviews(data);
        }
    }, [data]);

    const handleNewReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReviewText) return;

        const newReview: ReviewDto = {id: 0, reviewer: "", text: newReviewText, parentReviewId: undefined};
        try {
            const response = await axios.post(`/${requestMapping}/add/${variable}`, newReview);
            setReviews([...reviews, response.data]);
            setNewReviewText('');
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };

    const handleReplyAdded = (parentReviewId: number, reply: ReviewDto) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === parentReviewId
                    ? {...review, replies: [...(review.replies || []), reply]}
                    : review
            )
        );
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviews.map((review) => (
                <Review key={review.id} review={review} requestMapping={requestMapping} variable={variable}
                        onReplyAdded={handleReplyAdded}/>
            ))}
            <form onSubmit={handleNewReviewSubmit} className="mt-4">
                <h3 className="text-lg font-bold mb-2">Add a Review</h3>
                <textarea
                    placeholder="Write a new review..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="block w-full mb-2 p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
};