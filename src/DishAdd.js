import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { menuAddDish } from "./actions";

class DishAddInner extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			categoryId: '',
			name: '',
			grams: '',
			price: ''
		};
		
		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onGramsChange = this.onGramsChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
		this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
	}
	
	onCategoryChange(e) {
		e.preventDefault();
		this.setState({ categoryId: e.target.value });
	}
	
	onNameChange(e) {
		e.preventDefault();
		this.setState({ name: e.target.value });
	}
	
	onGramsChange(e) {
		e.preventDefault();
		this.setState({ grams: e.target.value });
	}
	
	onPriceChange(e) {
		e.preventDefault();
		this.setState({ price: e.target.value });
	}
	
	onAddFormSubmit(e) {
		e.preventDefault();
		
		fetch('dishes', {
			method: "POST",
			body: JSON.stringify({
				categoryId: this.state.categoryId,
				name: this.state.name,
				grams: this.state.grams,
				price: this.state.price
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json()).then((data) => {
			this.props.dispatch(menuAddDish(data._id, data.categoryId, data.name, data.grams, data.price)); // Используем _id
			this.props.history('/');
		});
	}
	
	render() {
		return (
			<div className="card-hover-shadow-2x mb-3 card">
				<div className="card-header-tab card-header">
					<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
						<i className="fa fa-utensils"></i>&nbsp;Add Dish
					</div>
				</div>
				<form onSubmit={this.onAddFormSubmit}>
					<div className="widget-content">
						<div className="widget-content-wrapper">
							<select value={this.state.categoryId} onChange={this.onCategoryChange} className="form-control">
								<option value="">Select Category</option>
								{this.props.menu.map(category => {
									const categoryId = category._id; 
									if (!categoryId) {
										return null; 
									}
									return (
										<option key={categoryId} value={categoryId}>{category.name}</option>
									);
								})}
							</select>
							<input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Dish Name" className="form-control" />
							<input type="text" value={this.state.grams} onChange={this.onGramsChange} placeholder="Grams" className="form-control" />
							<input type="text" value={this.state.price} onChange={this.onPriceChange} placeholder="Price" className="form-control" />
							<input type="submit" value="Add" className="btn btn-primary" />
						</div>
					</div>
				</form>
				<div className="d-block text-right card-footer">
					<NavLink to='/' className="btn btn-primary">Back to list</NavLink>
				</div>
			</div>
		);
	}
}

const DishAdd = (props) => {
	return (
		<DishAddInner {...props} history={useNavigate()} />
	);
};

export default connect(mapStateToProps)(DishAdd);

function mapStateToProps(state) {
	return {
		menu: [...state.menu]
	};
}
