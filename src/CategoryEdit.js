import React from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { menuUpdateCategory } from "./actions";

class CategoryEditInner extends React.Component {
	constructor(props) {
		super(props);
		const category = this.props.menu.find(category => category.id === this.props.id);
		this.state = {
			name: category ? category.name : ''
		};
		this.onNameChange = this.onNameChange.bind(this);
		this.onEditFormSubmit = this.onEditFormSubmit.bind(this);
	}

	onNameChange(e) {
		this.setState({ name: e.target.value });
	}

	onEditFormSubmit(e) {
		e.preventDefault();
		fetch(`/categories/${this.props.id}`, {
			method: "PATCH",
			body: JSON.stringify({ name: this.state.name }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json()).then((data) => {
			this.props.dispatch(menuUpdateCategory(this.props.id, this.state.name));
			this.props.history('/');
		});
	}

	render() {
		return (
			<div className="card-hover-shadow-2x mb-3 card">
				<div className="card-header-tab card-header">
					<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
						<i className="fa fa-list"></i>&nbsp;Edit Category
					</div>
				</div>
				<form onSubmit={this.onEditFormSubmit}>
					<div className="widget-content">
						<div className="widget-content-wrapper">
							<input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Category Name" className="form-control" />
							<input type="submit" value="Edit" className="btn btn-primary" />
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

const CategoryEdit = (props) => {
	const { id } = useParams();
	return (
		<CategoryEditInner {...props} id={id} history={useNavigate()} />
	);
};

function mapStateToProps(state) {
	return {
		menu: state.menu
	};
}

export default connect(mapStateToProps)(CategoryEdit);
