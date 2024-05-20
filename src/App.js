import React from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MenuList from "./MenuList";
import CategoryAdd from "./CategoryAdd";
import DishAdd from "./DishAdd";
import { menuAddAll } from "./actions";
import CategoryEdit from "./CategoryEdit";

class App extends React.Component {
	componentDidMount() {
		fetch("/menu").then((res) => res.json()).then((data) => {
			this.props.dispatch(menuAddAll(data));
		});
	}

	render() {
		return (
			<div className="row d-flex justify-content-center container">
				<div className="col-md-8">
					<Provider store={this.props.store}>
						<Router>
							<Routes>
								<Route path="/" element={<MenuList />} />
								<Route path="/add-category" element={<CategoryAdd />} />
								<Route path="/add-dish" element={<DishAdd />} />
								<Route path="/edit-category/:id" element={<CategoryEdit />} />
							</Routes>
						</Router>
					</Provider>
				</div>
			</div>
		);
	}
}

export default connect()(App);
