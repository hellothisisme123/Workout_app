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


// makes it so that you can select each setting
const setting_wrappers = document.querySelectorAll('.setting-wrapper')
setting_wrappers.forEach(setting => {
    setting.addEventListener('click', (e) => {
        setting_wrappers.forEach(setting => {
            setting.classList.remove('active')
        })
        setting.classList.add('active')
    })
})

setting_wrappers.forEach(setting => {
    // console.log(setting.dataset.linkedSetting);

    for (const child of setting.childNodes) {
        if (child.nodeName == "INPUT") {
            child.addEventListener('keypress', (e) => {
                if (e.key == "Enter") {
                    let setting_class = child.parentElement.dataset.settingClass;
                    let linked_setting = child.parentElement.dataset.linkedSetting

                    let setting_label = ''; //
                    if (child.parentElement.dataset.settingLabel) {
                        setting_label = child.parentElement.dataset.settingLabel
                    }

                    let setting_type = child.parentElement.dataset.settingType
                    // eval(`settings.${setting_class}.${linked_setting} = child.value`)
                    let min_value = child.parentElement.dataset.minValue

                    push_settings(setting_class, linked_setting, child.value, setting_label, setting_type, min_value)
                    // console.log(settings.background_settings)
                }
            })
        }
    }
})

const push_settings = (setting_class, setting, value, label, type, min_value) => {
    // this will set the setting to the input value in the settings object
    // it will also set the stylings for the page to the correct value

    // it will eventually push the data from the settings object into local storage, or maybe some data storage method using google authorization system
    console.log(label);
    
    // adjusts the value to a minimum value for performance
    if (value < parseFloat(min_value) && type == 'num') value = parseFloat(min_value)

    // sets the setting value in settings to the value, also adds the label
    if (type == 'string') {
        // add something to determine if it already has the label or not
        eval(`settings.${setting_class}.${setting} = value + label`)
    } else if (type == 'num') {
        eval(`settings.${setting_class}.${setting} = parseFloat(value) + label`)
    }


    let root = document.documentElement; //sets root selector

    if (type == 'string') {
        root.style.setProperty(`--${setting}`, `${value + label}`) //sets each root property
    } else if (type == 'num') {
        root.style.setProperty(`--${setting}`, `${parseFloat(value) + label}`) //sets each root property
    }

    if (setting_class == 'background_settings') {
        create_grid()
    }
}

let settings = {
    "background_settings": {
        'bg_img': "url('../assets/svg/dot.svg')",
        'bg_size': '6px',
        'bg_color': '#323232',
        'grid_item_size': '15px',
        'bg_opacity': '0.25',
    },
    "colors": {
        "nav_bar_background": '#646464',
        "node_background_color": 'rgba(100,100,100, 0.75)',
        "nav_bar_border_color": 'rgba(0, 0, 0, 0.5)',
        "node_border_color": '#323232',
        "node_border_highlight_color": '#111',
        "node_background_highlight_color": '#646464',
        "node_text_color": '#fff',
        "file_transfer_color": 'rgba(50,50,50,0.5)',
    },
    "checklist_colors": {
        'Default_color_1': '#FC9996',
        'Default_color_2': '#FAFD5A',
        'Default_color_3': '#84D264',
        'Default_color_4': '#44C5CD',
        'Default_color_5': '#AB48C1',
    },
    "calendar": {
        'calendar-primary': 'rgb(75, 75, 75)',
        'calendar-secondary': 'rgb(90, 90, 90)',
        'calendar-borders': '#323232',
    },
    "text_font": 'Calibri',
}



// console.log(settings)