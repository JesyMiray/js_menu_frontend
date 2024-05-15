import { combineReducers } from "redux";
import { MENU_ADD_CATEGORY, MENU_ADD_DISH, MENU_ADD_ALL, MENU_DELETE_DISH, MENU_UPDATE_DISH } from "./actions";

function menu(state = [], action) {
	switch (action.type) {
		case MENU_ADD_CATEGORY:
			return [
				...state,
				{ id: action.id, name: action.name, dishes: [] }
			];
		case MENU_ADD_DISH:
			return state.map(category => {
				if (category.id === action.categoryId) {
					return {
						...category,
						dishes: [...category.dishes, { id: action.id, name: action.name, grams: action.grams, price: action.price }]
					};
				}
				return category;
			});
		case MENU_ADD_ALL:
			return [...action.menu];
		case MENU_DELETE_DISH:
			return state.map(category => ({
				...category,
				dishes: category.dishes.filter(dish => dish.id !== action.id)
			}));
		case MENU_UPDATE_DISH:
			return state.map(category => ({
				...category,
				dishes: category.dishes.map(dish => dish.id === action.id ? { ...dish, name: action.name, grams: action.grams, price: action.price } : dish)
			}));
		default:
			return state;
	}
}

export default combineReducers({
	menu
});
