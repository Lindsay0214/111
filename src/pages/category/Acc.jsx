import React from 'react';
import Layout from 'section/Layout';
import Products from 'component/product/Products';

class Acc extends React.Component {
    render() {
        return (
            <div className="acc">
                <Layout />
                <Products />
            </div>
        )
    }
}

export default Acc;