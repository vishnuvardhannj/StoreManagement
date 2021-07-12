import { ADMIN_LOGIN, ADMIN_LOGOUT, SALES_LOGIN, SALES_LOGOUT, ADD_MEDICINE, ADD_SALES_EXECUTIVE, CREATE_ORDER, ADD_TO_CART, EMPTY_CART, UPDATE_INVENTORY_LIST, UPDATE_TEAM_LIST, UPDATE_ALL_ORDERS, UPDATE_EXECUTIVE_DETAILS, USER_ID_FOR_UPDATE, MEDICINE_ID_FOR_UPDATE, UPDATE_MEDICINE_DETAILS, UPDATE_INVENTORY_DETAILS } from "../actionTypes"

export const adminLogin = (payload) => ({
    type: ADMIN_LOGIN,
    payload
})

export const adminLogout = (payload) => ({
    type: ADMIN_LOGOUT,
    payload
})

export const salesLogin = (payload) => ({
    type: SALES_LOGIN,
    payload
})

export const salesLogout = (payload) => ({
    type: SALES_LOGOUT,
    payload
})

// Admin Access
export const addMedicine = (payload) => ({
    type: ADD_MEDICINE,
    payload
})

export const addSalesExecutive = (payload) => ({
    type: ADD_SALES_EXECUTIVE,
    payload
})


export const updateInventoryList = (payload) => ({
    type: UPDATE_INVENTORY_LIST,
    payload
})

export const updateTeamList = (payload) => ({
    type: UPDATE_TEAM_LIST,
    payload
})


export const updateAllOrders = (payload) => ({
    type: UPDATE_ALL_ORDERS,
    payload
})


export const updateExecutiveDetails = (payload) => ({
    type: UPDATE_EXECUTIVE_DETAILS,
    payload
})

export const updateInventoryDetails = (payload) => ({
    type: UPDATE_INVENTORY_DETAILS,
    payload
})


export const userIdForUpdate = (payload) => ({
    type: USER_ID_FOR_UPDATE,
    payload
})

export const medicineIdForUpdate = (payload) => ({
    type: MEDICINE_ID_FOR_UPDATE,
    payload
})



// ORDERS BY EXECUTIVE

export const createOrder = (payload) => ({
    type: CREATE_ORDER,
    payload
})

export const addToCart = (payload) => ({
    type: ADD_TO_CART,
    payload
})


export const emptyCart = (payload) => ({
    type: EMPTY_CART,
    payload
})
