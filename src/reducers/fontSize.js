const fontSize = (state = 1, action) => {
    switch (action.type) {
        case 'SET_FONT_SIZE':
            return state = action.fontSize
        default:
            return state
    }
};

export default fontSize;