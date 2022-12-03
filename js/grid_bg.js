const make_tile = () => {
    const tile = document.createElement('div')
    tile.classList.add('bg_tile')
    return tile
}

const make_grid_bg = (tile_count) => {
    const grid_bg = document.querySelector('.grid_bg')
    console.log('make_grid');
    for (let i = 0; i < tile_count; i++) {
        grid_bg.appendChild(make_tile())
    }
}

const create_grid = () => {
    const doc_styles = getComputedStyle(document.documentElement),
          grid_item_size = parseInt(doc_styles.getPropertyValue('--grid_item_size')),
          grid_bg = document.querySelector('.grid_bg')

    console.log(grid_item_size);

    let bg_grid_cols = Math.floor(document.body.clientWidth / grid_item_size),
        bg_grid_rows = Math.floor(document.body.clientHeight / grid_item_size)

    console.log(bg_grid_cols);

    grid_bg.style.setProperty('--cols', bg_grid_cols)
    grid_bg.style.setProperty('--rows', bg_grid_rows)


    make_grid_bg(bg_grid_cols * bg_grid_rows)
}

window.addEventListener('resize', () => create_grid())
window.onload = () => {create_grid()}