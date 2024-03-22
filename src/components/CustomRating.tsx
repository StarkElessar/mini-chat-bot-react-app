import '@smastrom/react-rating/style.css'

import { FC } from 'react';
import { Rating, RatingChange, Star } from '@smastrom/react-rating';

interface IProps {
	rating: number;
	setRating: RatingChange;
}

const CustomRating: FC<IProps> = ({ rating, setRating }) => {
	return (
		<Rating
			value={rating}
			onChange={setRating}
			itemStyles={{
				itemShapes: Star,
				activeFillColor: 'var(--m-chat-primary-color)',
				inactiveFillColor: '#ffedd5'
			}}
			style={{maxWidth: 100}}
		/>
	);
};

export default CustomRating;