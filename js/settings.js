const topnav = document.querySelector('#top-navbar'),
      container = document.querySelector('.container'),
      setting_wrapper = document.querySelector('.settings_wrapper')

//sets the position of the settings div to be directly below the navbar
const settings_wrapper_height = () => {
    let topnavrect = topnav.getBoundingClientRect()
    setting_wrapper.style.top = `${topnavrect.bottom}px`
}

setTimeout(() => { // runs on load
    settings_wrapper_height()

    window.addEventListener('resize', (e) => settings_wrapper_height(e))
    
    const tree_branches = document.querySelectorAll('.tree_branch')
    tree_branches.forEach(branch => {
        branch.addEventListener('click', (e) => {
            branch.parentElement.childNodes.forEach(leaf => {
                if (leaf.tagName == 'UL') {
                    leaf.classList.toggle('active')
                    leaf.parentElement.childNodes[0].classList.toggle('active')
                    // console.log(leaf);
                    // leaf.classList.toggle('expanded');
                }
            });
        })
    });    
}, 0);
