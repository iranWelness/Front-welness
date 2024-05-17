const resType = (state = "", action) => {
    switch (action.type) {
        case 'SET_RESTYPE':
            return state = action.resType
        default:
            return state
    }
};

export default resType;