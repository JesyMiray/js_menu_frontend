export const MENU_ADD_CATEGORY = 'MENU_ADD_CATEGORY';
export const MENU_ADD_DISH = 'MENU_ADD_DISH';
export const MENU_ADD_ALL = 'MENU_ADD_ALL';
export const MENU_DELETE_DISH = 'MENU_DELETE_DISH';
export const MENU_UPDATE_DISH = 'MENU_UPDATE_DISH';
export const MENU_DELETE_CATEGORY = 'MENU_DELETE_CATEGORY';
export const MENU_UPDATE_CATEGORY = 'MENU_UPDATE_CATEGORY';

export function menuAddCategory(id, name) {
	return { type: MENU_ADD_CATEGORY, id, name };
}

export function menuAddDish(id, categoryId, name, grams, price) {
	return { type: MENU_ADD_DISH, id, categoryId, name, grams, price };
}

export function menuAddAll(menu) {
	return { type: MENU_ADD_ALL, menu };
}

export function menuDeleteDish(id) {
	return { type: MENU_DELETE_DISH, id };
}

export function menuUpdateDish(id, name, grams, price) {
	return { type: MENU_UPDATE_DISH, id, name, grams, price };
}
export function menuDeleteCategory(id) {
	return { type: MENU_DELETE_CATEGORY, id };
}

export function menuUpdateCategory(id, name) {
	return { type: MENU_UPDATE_CATEGORY, id, name };
}