import React, { useEffect, useState } from 'react';
import useFetchData from "../../hooks/useFetchData";
import { ReviewDto } from "../../dto/ReviewDto";
import { useProtectedAxios } from "../../hooks/useProtectedAxios";

type ReviewListProps = {
    username: string;
    requestMapping: string;
};

export const ReviewList: React.FC<ReviewListProps> = ({ username, requestMapping }) => {
    const { data } = useFetchData(`${requestMapping}/${username}/all`);
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [text, setText] = useState('');
    const axios = useProtectedAxios();

    useEffect(() => {
        if (data) {
            setReviews(data);
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newReview: ReviewDto = { text };
        try {
            const response = await axios.post(`/${requestMapping}/add/${username}`, newReview);
            setReviews([...reviews, response.data]);
            setText('');
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviews.map((review) => (
                <div key={review.id} className="p-4 bg-white rounded shadow mb-4">
                    <p><strong>Reviewer:</strong> {review.reviewer}</p>
                    <p><strong>Comment:</strong> {review.text}</p>
                </div>
            ))}
            <form onSubmit={handleSubmit} className="mt-4">
                <h3 className="text-lg font-bold mb-2">Add a Review</h3>
                <textarea
                    placeholder="Comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="block w-full mb-2 p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
};