import { Button, Card, Rate, Tag } from 'antd';
import { CoffeeType } from '../types/coffeeTypes';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addToCart } from '../model/coffeeStore';

function CoffeeCard({ coffee }: { coffee: CoffeeType }) {
	
	return (
		<Card
			cover={<img src={coffee.image} alt={coffee.name} />}
			actions={[
				<Button
					icon={<ShoppingCartOutlined />}
					onClick={() => addToCart(coffee)}
				>
					{coffee.price}
				</Button>,
			]}
		>
			<Card.Meta title={coffee.name} description={coffee.subTitle}></Card.Meta>
			<Tag color='purple' style={{ marginTop: 12 }}>
				{coffee.type}
			</Tag>
			<Rate defaultValue={coffee.rating} disabled allowHalf />
		</Card>
	);
}

export default CoffeeCard;
