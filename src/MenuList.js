import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Dish from "./Dish";

class MenuList extends React.Component {
	handleDeleteCategory = (id) => {
		fetch(`/categories/${id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json()).then(() => {
			this.props.dispatch({ type: 'MENU_DELETE_CATEGORY', id });
		});
	}

	render() {
		return (
			<div className="card-hover-shadow-2x mb-3 card">
				<div className="card-header-tab card-header">
					<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
						<i className="fa fa-list"></i>&nbsp;Menu List
					</div>
				</div>
				<div className="scroll-area-sm">
					<perfect-scrollbar className="ps-show-limits">
						<div style={{ position: "static" }} className="ps ps--active-y">
							<div className="ps-content">
								<ul className="list-group list-group-flush">
									{this.props.menu.map(category => (
										<li key={category.id} className="list-group-item">
											<div className="category-title">
												{category.name}
												<div className="category-actions">
													<NavLink to={`/edit-category/${category.id}`} className="btn btn-edit">Edit</NavLink>
													<button onClick={() => this.handleDeleteCategory(category.id)} className="btn btn-delete">Delete</button>
												</div>
											</div>
											<ul className="list-group">
												{category.dishes.map(dish => (
													<Dish key={dish.id} dish={dish} />
												))}
											</ul>
										</li>
									))}
								</ul>
							</div>
						</div>
					</perfect-scrollbar>
				</div>
				<div className="d-block text-right card-footer">
					<NavLink to='/add-category' className="btn btn-primary">Add Category</NavLink>
					<NavLink to='/add-dish' className="btn btn-primary">Add Dish</NavLink>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		menu: [...state.menu]
	};
}

export default connect(mapStateToProps)(MenuList);
