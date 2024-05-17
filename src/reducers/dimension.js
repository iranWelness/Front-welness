const dimension = (state = "", action) => {
    switch (action.type) {
        case 'SET_DIMENSION':
            return state = action.dimension
        default:
            return state
    }
};

export default dimension;