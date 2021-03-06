import React from 'react';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

class EditItem extends React.Component {

    state = {
        id:'',
        name: '',
        price: '',
        image: '',
        status: 'available'
    };

    componentDidMount() {
        const { id, name, image, price, status } = this.props.product;
        this.setState({
          id,
          name,
          image,
          price,
          status
        });
      }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    };

    submit = e => {
        e.preventDefault();
        const product = {...this.state};
        axios.post('products', product).then(res => {
        console.log(res.data);
        this.props.close();
        toast.success('商品新增成功');
        });
    };

    onDelete = () => {
        axios.delete(`products/${this.state.id}`).then(res => {
        this.props.deleteProduct(this.state.id);
        this.props.close();
        toast.success('修改成功');
        });
    };

    render() {
        return (
            <div className="edit-item">
                <p className="title has-text-centered">Edit Items</p>
                <form onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                            <label className="label">Name</label>
                            <input type="text" className="input" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="label">Price</label>
                            <input type="number" className="input" name="price" value={this.state.price} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="label">Image</label>
                            <input type="text" className="input" name="image" value={this.state.image} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="control">
                        <label className="label">Status</label>
                        <div className="select is-fullwidth">
                            <select name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>available</option>
                                <option>unavailable</option>
                            </select>
                        </div>
                    </div>

                    <br />

                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button
                            className="button is-danger"
                            type="button"
                            onClick={this.onDelete}
                            >Delete</button>
                        </div>
                        <button className="button" type="button" onClick={() => {this.props.close();}}>Cancel</button>
                    </div>
                </form>
            </div> 
        );
    }
}

export default EditItem;


