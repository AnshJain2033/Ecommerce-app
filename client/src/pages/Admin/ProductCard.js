import React from 'react'
import Card from 'antd/es/card/Card'
const ProductCard = async (p) => {
    const { Meta } = Card
    return (
        <div>
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt={p.name} src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} />}
            >
                <Meta title={p.name} description={p.description} />
            </Card>
        </div>
    )
}

export default ProductCard