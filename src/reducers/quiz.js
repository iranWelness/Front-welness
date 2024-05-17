const quiz = (state = "", action) => {
    switch (action.type) {
        case 'SET_QUIZ':
            return state = action.quiz
        default:
            return state
    }
};

export default quiz;