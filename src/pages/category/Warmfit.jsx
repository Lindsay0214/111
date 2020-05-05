import React from 'react';
import Layout from 'component/Layout';
import Products from 'component/product/Products';

class Warmfit extends React.Component {
    render() {
        return (
            <div className="warm-fit">
                <Layout />
                <Products />
            </div>
        )
    }
}

export default Warmfit;