const userID = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_NAV':
            return state = true
        case 'HIDE_NAV':
            return state = false
        default:
            return state
    }
};

export default userID;