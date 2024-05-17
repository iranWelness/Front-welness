const fontSize = size => {
    let fontSize;
    const newSize = (localStorage.getItem('fontSize')) ? localStorage.getItem('fontSize') : 1;
    if (newSize == 0) {
        fontSize = `${size - 0.1}em`
    } else if (newSize == 2) {
        console.log(size)
        fontSize = `${size + 0.2}em`
    } else {
        fontSize = `${size}em`
    }
    return fontSize
}

export default fontSize;