export const MENU_ADD_CATEGORY = 'MENU_ADD_CATEGORY';
export const MENU_ADD_DISH = 'MENU_ADD_DISH';
export const MENU_ADD_ALL = 'MENU_ADD_ALL';
export const MENU_DELETE_DISH = 'MENU_DELETE_DISH';
export const MENU_UPDATE_DISH = 'MENU_UPDATE_DISH';
export const MENU_DELETE_CATEGORY = 'MENU_DELETE_CATEGORY';
export const MENU_UPDATE_CATEGORY = 'MENU_UPDATE_CATEGORY';

export function menuAddCategory(_id, name) {
	return { type: MENU_ADD_CATEGORY, _id, name };
}

export function menuAddDish(_id, categoryId, name, grams, price) {
	return { type: MENU_ADD_DISH, _id, categoryId, name, grams, price };
}

export function menuAddAll(menu) {
	return { type: MENU_ADD_ALL, menu };
}

export function menuDeleteDish(_id) {
	return { type: MENU_DELETE_DISH, _id };
}

export function menuUpdateDish(_id, name, grams, price) {
	return { type: MENU_UPDATE_DISH, _id, name, grams, price };
}

export function menuDeleteCategory(_id) {
	return { type: MENU_DELETE_CATEGORY, _id };
}

export function menuUpdateCategory(_id, name) {
	return { type: MENU_UPDATE_CATEGORY, _id, name };
}
