var Global_checklist_count = 0; //a global count starting at 0 of every checklist
let checklists_all = document.querySelectorAll(".checklist");
let checklists_grab_area_all = document.querySelectorAll(".checklist_grab_area");
let last_item_checklist_id_selectors_array;
let state_management_id_selector = document.querySelectorAll("#state_management");
let state_managemend_only_on_first_checklist = true;
// let z_index_top_layer = 1000;
const html = document.getElementById("html");
let dom_history = [];
let body_container = document.getElementById('container');
let selected_items_array = [];
//let history_location = 0;


/*        ////////////WIP Collision for dynamic spawning system
const collision_event = new CustomEvent('collision', {
    detail: { //various things
        col_a: col_item_a,
        col_b: col_item_b
    }
});

window.addEventListener('collision', (e) => {
    console.log(e.detail);
});*/ 





class Checklist { //Checklist class
    constructor(/*id_selector,*/
                resize_range,                               // 1
                id,                                         // 2
                checklist,                                  // 3
                height,                                     // 4
                width,                                      // 5
                left,                                       // 6
                top,                                        // 7
                item_count,                                 // 8
                client_rect,                                // 9
                Default_node_type,                          // 10
                checklist_selector,                         // 11
                checklist_id_selectors_array,               // 12
                moveing_the_div,                            // 13
                selected_div_for_moving,                    // 14
                moveing_x_offset_from_div_to_mouse,         // 15
                moveing_y_offset_from_div_to_mouse,         // 16
                div_y_screen_offset,                        // 17
                mouse_down_event_event_info,                // 18
                initial_y_offset_top,                       // 19
                combined_height_of_all_previous_divs_within_checklists,
                resizing_no_movement,
                grab_area_selector

                
                //id_selector
        ) {
        /*this.id_selector = document.getElementById(id);*/
        this.resize_range = resize_range;                       // 1
        this.id = id;                                           // 2                                
        this.checklist = checklist;                             // 3
        this.height = height;                                   // 4
        this.width = width;                                     // 4
        this.left = left;                                       // 6
        this.top = top;                                         // 7
        this.item_count = item_count;                           // 8
        this.client_rect = client_rect;                         // 9
        this.Default_node_type = Default_node_type;             // 10
        this.checklist_selector = checklist_selector;           // 12
        this.checklist_id_selectors_array = [];                 // 13
        this.moveing_the_div = false;                           // 14
        this.selected_div_for_moving = selected_div_for_moving; // 15
        this.moveing_x_offset_from_div_to_mouse = moveing_x_offset_from_div_to_mouse;
        this.moveing_y_offset_from_div_to_mouse = moveing_y_offset_from_div_to_mouse;
        this.div_y_screen_offset = div_y_screen_offset;
        this.mouse_down_event_event_info = mouse_down_event_event_info;
        this.initial_y_offset_top = initial_y_offset_top;
        this.combined_height_of_all_previous_divs_within_checklists = 0;
        this.resizing_no_movement = resizing_no_movement;
        this.grab_area_selector = grab_area_selector;
        
        
    }
    
    spawn(item_count, x, y, spawn_type, collision_mode) { //spawns a checklist
        let random_displace_x;
        let random_displace_y;

        //console.log(checklist); //logs spawn
        this.item_count = item_count; //sets item count to item count
        
        last_item_checklist_id_selectors_array = this.checklist_id_selectors_array[this.checklist_id_selectors_array.length - 1];

        
        this.checklist = document.getElementById("checklists").appendChild(document.createElement('div'));  //this.checklist is the actual checklist div within the #checklists div. this line spawns the div
        this.id = `checklist_${Global_checklist_count}`; //sets the this.id to the id so that the id can be set and used

        this.checklist = this.checklist.setAttribute("id", this.id); //gives the checklist its id to be more easily manipulatable
        
        Global_checklist_count++; //ticks the count up 1



        this.checklist_selector = document.getElementById(this.id); //creates a selector for the div
        this.client_rect = this.checklist_selector.getBoundingClientRect(); //sets the boudning box of the div
        this.checklist_selector.classList.add("checklist"); //styles the checklist with the checklist class
        checklists_all = document.querySelectorAll(".checklist"); //selector for every checklist

        //positions the div in selected position
        if (spawn_type=='random') {
            random_displace_x = Math.random() * 100;
            random_displace_y = Math.random() * 100;
            
            //adds the random values to the spawn location
            y += random_displace_y;
            x += random_displace_x;
        }

        //sets the position according to the function ran
        this.checklist_selector.style.top = `${y}px`;
        this.checklist_selector.style.left = `${x}px`;

        //positions the div in selected size
        this.checklist_selector.style.height = `${this.height}px`;
        this.checklist_selector.style.width = `${this.width}px`;
        


        //\/\/\/\_/--- default node types ---\_/\/\/\/\\

        //setting the grab area
            this.checklist_selector.appendChild(document.createElement('div'));
            this.grab_area_selector = this.checklist_selector.childNodes[this.checklist_selector.childNodes.length - 1];
            this.grab_area_selector.classList.add("checklist_grab_area");
            checklists_grab_area_all = document.querySelectorAll(".checklist_grab_area");


        // |--__--<><> left tutorial <><>--__--| \\
        if (this.Default_node_type == "left_tutorial") {
            let h1_selector;
            let ul_selector;
            let li_selector;
            let dumbbell_image_selector;

            //spawns title h1 in checklist
            this.checklist_selector.appendChild(document.createElement('h1'));
            h1_selector = this.checklist_selector.childNodes[this.checklist_selector.childNodes.length - 1];
            //console.log(`h1_selector:${h1_selector}`);
            h1_selector.classList.add("checklist_title");
            h1_selector.innerHTML = "Lorem ipsum<br>dolor<br>sit consectetur";

            //spawns br
            this.checklist_selector.appendChild(document.createElement('br'));


            //spawns ul for bullet list
            this.checklist_selector.appendChild(document.createElement('ul'));
            ul_selector = this.checklist_selector.childNodes[this.checklist_selector.childNodes.length - 1]; 
            ul_selector.classList.add("checklist_bulleted_list");
            //console.log(`ul_selector:${ul_selector}`);


            //spawns li in bullet list
            ul_selector.appendChild(document.createElement('li'));
            li_selector = ul_selector.childNodes;
            //console.log(`li_selector:${li_selector}`);
            li_selector[0].classList.add("checklist_bullet_point");
            li_selector[0].innerHTML = "Lorem";

            //spawns li in bullet list
            ul_selector.appendChild(document.createElement('li'));
            li_selector = ul_selector.childNodes;
            //console.log(`li_selector:${li_selector}`);
            li_selector[1].classList.add("checklist_bullet_point");
            li_selector[1].innerHTML = "Lorem";


            //spawns li in bullet list
            ul_selector.appendChild(document.createElement('li'));
            li_selector = ul_selector.childNodes;
            //console.log(`li_selector:${li_selector}`);
            li_selector[2].classList.add("checklist_bullet_point");
            li_selector[2].innerHTML = "Lorem";


            //spawns li in bullet list
            ul_selector.appendChild(document.createElement('li'));
            li_selector = ul_selector.childNodes;
            //console.log(`li_selector:${li_selector}`);
            li_selector[3].classList.add("checklist_bullet_point");
            li_selector[3].innerHTML = "Lorem";


            //spawns li in bullet list
            ul_selector.appendChild(document.createElement('li'));
            li_selector = ul_selector.childNodes;
            //console.log(`li_selector:${li_selector}`);
            li_selector[4].classList.add("checklist_bullet_point");
            li_selector[4].innerHTML = "Lorem";


            //spawns svg in checklist
            this.checklist_selector.appendChild(document.createElement('img'));
            dumbbell_image_selector = this.checklist_selector.childNodes[4];
            //console.log(svg_selector);
            dumbbell_image_selector.setAttribute("src", "./assets/images/dumbell.png");
            dumbbell_image_selector.setAttribute("id",  "dumbbell_image_selector");
        }
        
        // |--__--<><> middle tutorial <><>--__--| \\
        if (this.Default_node_type == "middle_tutorial") {

        }
        
        // |--__--<><> right tutorial <><>--__--| \\
        if (this.Default_node_type == "right_tutorial") {

        }

        // |--__--<><> notepad <><>--__--| \\
        if (this.Default_node_type == "checklist") {
            let checklist_item_selector;
            let checklist_box_checker_selector;
            let checklist_input_text_selector;
            let checklist_add_checker_selector;
            let checklist_add_checker_image_selector;

            for (let i = 0; i < this.item_count; i++) {
                // -- checklist item row -- \\
                this.checklist_selector.appendChild(document.createElement('div')); //checklist item row
                checklist_item_selector = this.checklist_selector.childNodes[this.checklist_selector.childNodes.length - 1];
                checklist_item_selector.classList.add("checklist_item_styles");

                // -- checklist checkable box -- \\
                checklist_item_selector.appendChild(document.createElement('div')); //checkable box
                checklist_box_checker_selector = checklist_item_selector.childNodes[checklist_item_selector.childNodes.length - 1];
                checklist_box_checker_selector.classList.add("checklist_checkbox_styles");
                
                // -- checklist input text -- \\ 
                checklist_item_selector.appendChild(document.createElement('textarea')); //input text
                checklist_input_text_selector = checklist_item_selector.childNodes[checklist_item_selector.childNodes.length - 1];
                checklist_input_text_selector.classList.add('checklist_input_styles');
            }


            // -- checklist spawn checker -- \\
            this.checklist_selector.appendChild(document.createElement('br')); //adds line break
            this.checklist_selector.appendChild(document.createElement('div')); //add new checker
            checklist_add_checker_selector = this.checklist_selector.childNodes[this.checklist_selector.childNodes.length - 1];
            checklist_add_checker_selector.classList.add('checklist_add_checker_holder_styles');
            checklist_add_checker_selector.addEventListener('click', (e) => { //event listener for on click
                checklist_notepad.add_checklist_item(1);
            });

            // -- checklist spawn checker image -- \\
            checklist_add_checker_selector.appendChild(document.createElement('img')); //adds image
            checklist_add_checker_image_selector = checklist_add_checker_selector.childNodes[checklist_add_checker_selector.childNodes.length - 1];
            checklist_add_checker_image_selector.classList.add('add_checker_image_styles');
            checklist_add_checker_image_selector.setAttribute('src', './assets/svg/Plus.svg');
        }

        // |--__--<><> collision <><>--__--| \\
        if (collision_mode) {
            this.collision_node(true);
            this.checklist_selector.addEventListener('collision', (e) => {
                console.log('evemt run');
            });
        }

        this.move();   
    }
    
    add_checklist_item(amount) {
        for (let i = 0; i < amount; i++) {
            console.log(amount);

            let checklist_item_selector;
            let checklist_box_checker_selector;
            let checklist_input_text_selector;

            // -- checklist item row -- \\
            this.checklist_selector.appendChild(document.createElement('div')); //checklist item row
            checklist_item_selector = this.checklist_selector.childNodes[this.checklist_selector.childNodes.length - 1];
            checklist_item_selector.classList.add("checklist_item_styles");

            // -- checklist checkable box -- \\
            checklist_item_selector.appendChild(document.createElement('div')); //checkable box
            checklist_box_checker_selector = checklist_item_selector.childNodes[checklist_item_selector.childNodes.length - 1];
            checklist_box_checker_selector.classList.add("checklist_checkbox_styles");
            
            // -- checklist input text -- \\ 
            checklist_item_selector.appendChild(document.createElement('textarea')); //input text
            checklist_input_text_selector = checklist_item_selector.childNodes[checklist_item_selector.childNodes.length - 1];
            checklist_input_text_selector.classList.add('checklist_input_styles');

            this.checklist_selector.childNodes.remove(this.checklist_selector.childNodes.length - 2);
            let checklist_add_checker_selector = document.querySelector('.checklist_add_checker_holder_styles');
            checklist_item_selector.after(checklist_add_checker_selector);
            
            
        }
    }

    move() {
        checklists_grab_area_all.forEach(checklist => {
            checklist.addEventListener('mousedown', (mouse_click_event) => {
                this.selected_div_for_moving = mouse_click_event.target.parentElement; //selector for the target of the mouse keydown
                
                if ( //if in the bottom right corner of the div
                mouse_click_event.offsetX > this.selected_div_for_moving.clientWidth - this.resize_range &&
                mouse_click_event.offsetX < this.selected_div_for_moving.clientWidth + this.resize_range &&
                mouse_click_event.offsetY < this.selected_div_for_moving.clientHeight + this.resize_range &&
                mouse_click_event.offsetY > this.selected_div_for_moving.clientHeight - this.resize_range
                ) {
                    this.resizing_no_movement = true; //prevents movement so you can instead resize
                }

                if (!this.resizing_no_movement) { //if the variable is false then you are moving and not resizing
                    this.moveing_the_div = true; //sets movement of the div to true
                } else return 
                
                this.moveing_x_offset_from_div_to_mouse = mouse_click_event.layerX; //the offset so the user grabs the div at the right spot for x 
                this.moveing_y_offset_from_div_to_top = mouse_click_event.layerY;
            });


            window.addEventListener('mouseup', (mouse_up_event) => {
                this.moveing_the_div = false;
                this.resizing_no_movement = false;
                //on mouseup it stops resizing and movement of div
            });

            window.addEventListener('mousemove', (mouse_move_event) => {
                if (this.moveing_the_div == true) { //when you are moving the div
                    this.selected_div_for_moving.style.left = `${parseInt(mouse_move_event.clientX) - parseInt(this.moveing_x_offset_from_div_to_mouse) + parseInt(html.scrollLeft)}px`; // sets the left value of the div to follow the mouse
                }

                if (this.moveing_the_div == true) { //when you are moving the div
                    this.selected_div_for_moving.style.top = `${parseInt(mouse_move_event.clientY) - this.moveing_y_offset_from_div_to_top + parseInt(html.scrollTop)}px` //sets tge top value of the div to follow the mouse
                }
            });
        });
    }

    collision_node(on_off_switch) {
        let colcheck_loop;
        // console.log('asdasssssd');
        
        
        
        if (on_off_switch) {
            colcheck_loop = setInterval(this.colcheck, 1000, this);
        } else if (!on_off_switch) {
            clearInterval(colcheck_loop);
        }
        //console.log(colcheck_loop);

        
        
    }

    colcheck(this_object, e) {
        // console.log(this_object);
        /*if (top_a < top_b,
            bottom_a < bottom_b,
            left_a < left_b,
            right_a < right_b
        ) {
            
        }*/


        //console.log('colcheck');
    }
}    
                                                 //                  item_count
                                                 //                top
                                                 //           left 
                                                 //      width
                                                 //height   
const checklist         = new Checklist(20, 5, null, 600, 325, 250, 250, 5, null, "left_tutorial"); //spawns a checklist from the class as an object
const checklist2        = new Checklist(20, 5, null, 250, 350, 730, 600, 5, null, "middle_tutorial");
const checklist3        = new Checklist(20, 5, null, 125, 150, 755, 430, 5, null, "right_tutorial");
const checklist_notepad = new Checklist(20, 5, null, 200, 200, 800, 300, 5, null, "checklist");




checklist.spawn        (0, 250, 250, 'random', true); //spawns left_tutorial
checklist2.spawn       (0, 730, 600, 'random', true); //spawns middle tutorial
checklist3.spawn       (0, 755, 430, 'random', true); //spawns right tutorial
spawn_checklist_notepad(2, 100, 100, 'random', true); //spawns a checklist with 2 items






function spawn_checklist_notepad(items, x, y, spawn_type, collision_mode) {
    checklist_notepad.spawn(items, x, y, spawn_type, collision_mode) //spawns a checklist with 2 items
}


let nodes_displayed = false;
function show_nodes() { //runs on options button click
    if (nodes_displayed==false) {
        document.querySelectorAll(".node_place_button").forEach(element => {
            element.style.display = "block";
        });  
        nodes_displayed = true;
        // console.log("set display block");
    } else if (nodes_displayed==true) {
        document.querySelectorAll(".node_place_button").forEach(element => {
            element.style.display = "none";
        }); 
        nodes_displayed = false;
        // console.log("set display none");
    } else {
        console.log("huh");
    }
}

// -____/\|  remove function removes the selected item from an array  |/\____-
function remove_array_item(array, item) { //array is the array //item is the item you delete
    let a; //a
    let b; //b
    let c; //c
    let f; //final

    b = array; 
    a = b.splice(0, item); //splits b into 2 arrays, a and b 
    c = b.splice(1);       //splits b into 2 more arrrays, b and c, b is the node that gets removed
    f = a.concat(c);       //concatinates a and c into f
    
    return f;              //returns f
}




//let selected_items_array = [];
window.addEventListener('mousedown', (e) => {
    
    if (e.target.parentElement.parentElement == document.getElementById('checklists') && e.ctrlKey) {
        selected_items_array.push(e.target.parentElement);
        selected_items_array[selected_items_array.length - 1].classList.add('selected_node');

    } else if (e.target.parentElement.parentElement == document.getElementById('checklists') && !e.ctrlKey) {
        selected_items_array.forEach(item => {
            item.classList.remove('selected_node');
        });
        selected_items_array = [e.target.parentElement];
        selected_items_array[selected_items_array.length - 1].classList.add('selected_node');
    } else {
        selected_items_array.forEach(item => {
            item.classList.remove('selected_node');
        });
        selected_items_array = [];
    }
});


window.addEventListener('keydown', (e) => {
    if (e.key=='Backspace' || e.key=='Delete') {
        console.log('delete nodes');
        selected_items_array.forEach(item => {    
            //dom_history.push(body_container.innerHTML);
            //history_location++;
            item.classList.add('the_shadow_realm'); //hides the selected items
        });
    } else if (e.key == 'z' && e.ctrlKey) {
        console.log('undo');
        //console.log(dom_history);
        //body_container.innerHTML = dom_history[dom_history.length - 2];
        selected_items_array.forEach(item => {    
            //dom_history.push(body_container.innerHTML);
            //history_location++;
            item.classList.remove('the_shadow_realm'); //hides the selected items
        });
    } else if (e.key == 'z' && e.shiftKey==true) {
        console.log('redo');
    }
    //console.log(e);
    //console.log(e.key);
});

window.addEventListener('drop', (e) => { //runs when the user drops in the .acs
    e.preventDefault(); //prevents it from opening in a new tab
    const input = document.getElementById('color_theme_input'); //color theme input selector
    document.querySelector('#file_transfer').classList.remove('on');//removes the on class
    document.querySelector('#file_transfer').classList.add('off'); //adds the off class
    
    input.files = e.dataTransfer.files; //updates the color scheme in the input
    read_acs_file(); //reads the file and turns updates the color scheme
});

window.addEventListener('dragover', (e) => {
    e.preventDefault(); //prevents it from opening in a new tab
    const input = document.getElementById('color_theme_input'); //color theme input selector
    document.querySelector('#file_transfer').classList.remove('off'); //remove off class
    document.querySelector('#file_transfer').classList.add('on'); //add on class
});

window.addEventListener('dragleave', (e) => {
    const input = document.getElementById('color_theme_input'); //color theme input sector
    document.querySelector('#file_transfer').classList.remove('on'); //remove on class
});


const file_input = document.getElementById('color_theme_input'); //color theme input selector
file_input.addEventListener('change', (e) => {
    read_acs_file(); //runs on change
});

//__--__/-\ read the 'awesome color scheme' file type |-\__--__\\
function read_acs_file(default_file_path) {
    console.log('color scheme added');
    const file_input = document.getElementById('color_theme_input'); //color theme input selector
    
    if (default_file_path !== undefined) {
        console.log("defined");
        file_input.setAttribute('value', default_file_path);
    }

    file_type = file_input.files[0].name.split('.'); //splits filetype into name and type
    file_type = file_type[1];  //sets filetype to only the filetpye
    let file; //creates file
    if (file_type=='acs') {
        file = file_input.files[0]; //gets the files from the input
    }

    let file_data_storage = []; //useful for switching back and forth and saving accurately

    const reader = new FileReader(); //file reader
    reader.addEventListener('load', (event) => {
        file = event.target.result; //grabs the data from the file

        file = file.split('\r'); //splits the file after each line
        file.forEach(line => {
            line = line.split(':'); //splits line between :
            file_data_storage.push(line); //adds line to new file variable for storage
            file = file_data_storage; //sets the main file to the new value -do not claim this as your own if you didn't make it
        });

        file_data_storage = [];
        file.forEach(line => { //removes the empty lines in the beginning
            if (line[0]!='' && line[0]!='\n') {  
                file_data_storage.push(line); //pushes to file storage when it has stuff
            }
        });
        file = file_data_storage; //saves to file

        file_data_storage = [];
        file.forEach(line => {
            line[0] = line[0].slice(1); //removes the \n from the beginning of each line
            file_data_storage.push(line); //pushes the line to file data storage
            file = file_data_storage; //saves to file
        }); 
        
        file_data_storage = [];
        file.forEach(line => {
            if (line[1].charAt(0) == '[') {
                line[1] = line[1].slice(1); //removes the [ from the beginning of each line
                line[1] = line[1].slice(0, -2); //removes the ]; from the end of each line

                file_data_storage.push([line[0], line[1] ]); //pushes the lines with rgba
            } else if (line[1].charAt(0) == '(') {
                line[1] = line[1].slice(0, -1); //removes the ; from the end of each line
                line[1] = line[1].split(' '); 
                
                line[1][0] = line[1][0].slice(1); //removes the ( from the hex code
                line[1][0] = line[1][0].slice(0, -1); //removes the ) from the hex code
                line[1][1] = line[1][1].slice(1); //removes the ( from the opacity
                line[1][1] = line[1][1].slice(0, -9); //removes the ) from the opacity

                file_data_storage.push([ line[0], line[1][0], line[1][1] ]); //pushes the lines with hex
            } else if (line[1].charAt(0) == '{') {
                line[1] = line[1].slice(1); //removes the { from the beginning
                line[1] = line[1].slice(0, -2); //removes the }; frome the end

                file_data_storage.push([line[0], line[1]]); //pushes the lines with custom
            }
            file = file_data_storage; //saves to file
        });

        file.forEach(line => {
            if (line.length == 3) { //hex
                if (line[1].length == 4) {
                    // seperate from the rest
                    r = line[1].slice(1);
                    r = r.slice(0, -2);
                    g = line[1].slice(2);
                    g = g.slice(0, -1);
                    b = line[1].slice(3);

                    o = line[2];

                    // convert to number  
                    r = r + r;
                    r = parseInt(r, 16);
                    g = g + g;
                    g = parseInt(g, 16);
                    b = b + b;
                    b = parseInt(b, 16);


                    line[1] = `rgba(${r},${g},${b},${o})`;
                } else if (line[1].length == 7) {
                    // seperate from the rest
                    r = line[1].slice(1);
                    r = r.slice(0, -4);
                    g = line[1].slice(1);
                    g = g.slice(2, -2);
                    b = line[1].slice(1);
                    b = b.slice(4);

                    o = line[2];

                    //convert to number
                    r = parseInt(r, 16);
                    g = parseInt(g, 16);
                    b = parseInt(b, 16);

                    line[1] = `rgba(${r},${g},${b},${o})`;
                }
                line.pop();
            } else if (line.length == 2) { //rgba
                line[1] = line[1];
            }

            
            comment_check = line[0].slice(0, -1*(line[0].length) + 2); //detects for comments
            if (comment_check=='//') { 
                for (let i = 0; i < line.length + 1; i++) { //deletes everything inside
                    line.shift();
                }
            }

            let root = document.documentElement; //sets root selector
            root.style.setProperty(`--${line[0]}`, `${line[1]}`) //sets each root property
        });
        // console.log(file);
    });
    reader.readAsText(file);
}






/* tomorrow goals
    fix the undo    
        turn selected_items_array into an array of arrays
            the final child will be the 'current' selected divs
        if the user undos and the selected div is [] 
            undo one more behind it in a nested array

    add redo

    finish the checklist

    dynamic spawning
        add a system in the spawn function to spawn objects intentionally so that they wont spawn on top of each other
        add an optional randomness element to the spawn location of objects

    first launch of .acs
        'a personal color scheme'
*/
