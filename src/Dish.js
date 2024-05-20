import React from "react";
import { connect } from "react-redux";
import { menuDeleteDish, menuUpdateDish } from "./actions";

class Dish extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			editing: false,
			name: props.dish.name,
			grams: props.dish.grams,
			price: props.dish.price
		};
		
		this.onDeleteClick = this.onDeleteClick.bind(this);
		this.onEditClick = this.onEditClick.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onGramsChange = this.onGramsChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
	}
	
	onDeleteClick(e) {
		e.preventDefault();
		
		fetch(`dishes/${this.props.dish._id}`, {
			method: "DELETE"
		}).then((res) => {
			if (res.status === 200) {
				this.props.dispatch(menuDeleteDish(this.props.dish._id));
			} else {
				console.log("Not deleted");
			}
		});
	}
	
	onEditClick(e) {
		e.preventDefault();
		this.setState({ editing: true });
	}
	
	onNameChange(e) {
		this.setState({ name: e.target.value });
	}
	
	onGramsChange(e) {
		this.setState({ grams: e.target.value });
	}
	
	onPriceChange(e) {
		this.setState({ price: e.target.value });
	}
	
	onSaveClick(e) {
		e.preventDefault();
		
		fetch(`dishes/${this.props.dish._id}`, {
			method: "PATCH",
			body: JSON.stringify({
				name: this.state.name,
				grams: this.state.grams,
				price: this.state.price
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.status === 200) {
				this.props.dispatch(menuUpdateDish(this.props.dish._id, this.state.name, this.state.grams, this.state.price));
				this.setState({ editing: false });
			} else {
				console.log("Not updated");
			}
		});
	}
	
	render() {
		if (this.state.editing) {
			return (
				<li className="list-group-item">
					<div className="widget-content p-0">
						<div className="widget-content-wrapper">
							<div className="widget-content-left">
								<input type="text" value={this.state.name} onChange={this.onNameChange} />
								<input type="text" value={this.state.grams} onChange={this.onGramsChange} />
								<input type="text" value={this.state.price} onChange={this.onPriceChange} />
							</div>
							<div className="widget-content-right">
								<button className="btn btn-success" onClick={this.onSaveClick}>Save</button>
								<button className="btn btn-secondary" onClick={() => this.setState({ editing: false })}>Cancel</button>
							</div>
							<button className="btn btn-danger" onClick={this.onDeleteClick}>Delete</button>
						</div>
					</div>
				</li>
			);
		}
		return (
			<li className="list-group-item">
				<div className="widget-content p-0">
					<div className="widget-content-wrapper">
						<div className="widget-content-left">
							<div className="widget-heading">{this.props.dish.name}</div>
							<div className="widget-subheading">
								<span>{this.props.dish.grams}g  </span>
								<span>{this.props.dish.price}₽  </span>
							</div>
						</div>
						<div className="widget-content-right">
							<button className="btn btn-outline-success" onClick={this.onEditClick} >Edit</button>
							<button className="btn btn-outline-danger" onClick={this.onDeleteClick} >Delete</button>
						</div>
					</div>
				</div>
			</li>
		);
	}
}

export default connect()(Dish);
