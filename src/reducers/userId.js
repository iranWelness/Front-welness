const userID = (state = "", action) => {
    switch (action.type) {
        case 'SETID':
            return state = action.user
        case 'REMID':
            return state = {}
        default:
            return state
    }
};

export default userID;