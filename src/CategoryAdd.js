import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { menuAddCategory } from "./actions";

class CategoryAddInner extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			name: ''
		};
		
		this.onNameChange = this.onNameChange.bind(this);
		this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
	}
	
	onNameChange(e) {
		e.preventDefault();
		this.setState({ name: e.target.value });
	}
	
	onAddFormSubmit(e) {
		e.preventDefault();
		
		fetch('categories', {
			method: "POST",
			body: JSON.stringify({ name: this.state.name }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json()).then((data) => {
			this.props.dispatch(menuAddCategory(data.id, data.name));
			this.props.history('/');
		});
	}
	
	render() {
		return (
			<div className="card-hover-shadow-2x mb-3 card">
				<div className="card-header-tab card-header">
					<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
						<i className="fa fa-list"></i>&nbsp;Add Category
					</div>
				</div>
				<form onSubmit={this.onAddFormSubmit}>
					<div className="widget-content">
						<div className="widget-content-wrapper">
							<input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Category Name" className="form-control" />
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

const CategoryAdd = (props) => {
	return (
		<CategoryAddInner {...props} history={useNavigate()} />
	);
};

export default connect()(CategoryAdd);
