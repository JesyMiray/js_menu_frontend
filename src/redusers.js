import { combineReducers } from "redux";
import { MENU_ADD_CATEGORY, MENU_ADD_DISH, MENU_ADD_ALL, MENU_DELETE_DISH, MENU_UPDATE_DISH, MENU_DELETE_CATEGORY, MENU_UPDATE_CATEGORY } from "./actions";

function menu(state = [], action) {
	switch (action.type) {
		case MENU_ADD_CATEGORY:
			return [
				...state,
				{ _id: action._id, name: action.name, dishes: [] }
			];
		case MENU_ADD_DISH:
			return state.map(category => {
				if (category._id === action.categoryId) {
					return {
						...category,
						dishes: [...category.dishes, { _id: action._id, name: action.name, grams: action.grams, price: action.price }]
					};
				}
				return category;
			});
		case MENU_DELETE_CATEGORY:
			return state.filter(category => category._id !== action._id);
		case MENU_UPDATE_CATEGORY:
			return state.map(category => 
				category._id === action._id ? { ...category, name: action.name } : category
			);
		case MENU_ADD_ALL:
			return [...action.menu];
		case MENU_DELETE_DISH:
			return state.map(category => ({
				...category,
				dishes: category.dishes.filter(dish => dish._id !== action._id)
			}));
		case MENU_UPDATE_DISH:
			return state.map(category => ({
				...category,
				dishes: category.dishes.map(dish => dish._id === action._id ? { ...dish, name: action.name, grams: action.grams, price: action.price } : dish)
			}));
		default:
			return state;
	}
}

export default combineReducers({
	menu
});
