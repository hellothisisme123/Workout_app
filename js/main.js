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
                grab_area_selector,
                screen_Left,
                table_selector,
                selected_month,
                selected_year,
                calendar_data,
                calendar_date

                
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
        this.screen_Left = screen_Left;
        this.table_selector = table_selector;
        this.selected_month = selected_month;
        this.selected_year = selected_year;
        this.calendar_data = calendar_data;
        this.calendar_date = calendar_date;
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
        if (spawn_type=='dyno') {
            random_displace_x = Math.random() * 100;
            random_displace_y = Math.random() * 100;
            
            //adds the random values to the spawn location
            y += random_displace_y;
            x += random_displace_x;

            //checks to make sure its on screen
            //let check_left = this.checklist_selector.left; 
            /*this.screen_left = window.innerWidth;
            console.log(this.screen_Left);
            if (check_left > screen_left) {
                console.log('push');
            }*/

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

        // |--__--<><> calendar <><>--__--| \\
        if (this.Default_node_type == "calendar") {
            console.log('spawn calendar');
            this.checklist_selector.innerHTML += '<div class="calendar_container"> <table class="calendar_table_node"> <tr class="calendar_day_title_row"> <th class="calendar_day_title_cell cell">Sunday</th> <th class="calendar_day_title_cell cell">Monday</th> <th class="calendar_day_title_cell cell">Tuesday</th> <th class="calendar_day_title_cell cell">Wednesday</th> <th class="calendar_day_title_cell cell">Thursday</th> <th class="calendar_day_title_cell cell">Friday</th> <th class="calendar_day_title_cell cell">Saturday</th> </tr><tr> <td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td></tr><tr> <td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td></tr><tr> <td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td></tr><tr> <td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td></tr><tr> <td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td></tr><tr> <td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td><td class="calendar_day_cell cell">0</td></tr></table> <button class="change_month_button" onclick="calendar.change_month(1)">next month</button> <button class="change_month_button" onclick="calendar.change_month(-1)">last month</button> <button class="change_month_button" onclick="calendar.change_month(12)">next year</button> <button class="change_month_button" onclick="calendar.change_month(-12)">last year</button> <div class="date_label">1995</div></div>';
            
            this.checklist_selector.childNodes[1].childNodes.forEach(child => {
                if (child.localName == 'table') this.table_selector = child
            });

            console.log(this.table_selector)

            this.calendar_date = new Date(); //date variable

            this.selected_year = this.calendar_date.getFullYear() - 1995;  //sets the year
            this.selected_month = this.calendar_date.getMonth();           //sets the month

            this.calendar_data = this.get_calendar_data(2500 - 1994);     //sets data for the calendar to set to
            this.fill_table(this.calendar_data, this.table_selector);          //fills the table
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            
            
        
        
        
        
        
        
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

    get_month_from_num(num) { //if given the month value it returns the month
        const months = [ //constant data on the months
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        return `${months[num]}`; //returns the month
    }
    
    change_month(e) {
        if (this.selected_year == 0 && isNegative(e) && isNegative(this.selected_month-1)) return;    //prevents from going bellow 0
        if (e==-12 && this.selected_year == 0) {                                                 //prevents from going bellow 0
            this.selected_month = 0;
            this.fill_table(this.calendar_data, this.table_selector);
            return;
        }
        if (this.selected_year == 2500 - 1995 && e==12 || this.selected_year == 2500 - 1995 && this.selected_month>10 && e==1) return; //prevents from going above 2500

        if(e==1)  this.selected_month++; //increments up one month
        if(e==-1) this.selected_month--; //increments down one month
        if(e==12) this.selected_year++;  //increments up one year
        if(e==-12)this.selected_year--;  //increments down one year

        if (this.selected_month > 11) {  //overflow when it goes past december
            this.selected_year++;        //increments up one year
            this.selected_month = this.selected_month -12; //sets the month to according month
        }

        if (this.selected_month < 0) {   //overflow when it goes below january
            this.selected_year--;        //increments down one year
            this.selected_month = 12 + this.selected_month; //sets the month to the according month
        }
    
    

        console.log(`${this.selected_year}:${this.selected_month}`);
        this.fill_table(this.calendar_data, this.table_selector);
    }

    fill_table(data, table) { //runs through each row and collumn, setting each cells innerHTML to the data desired
        data = data[this.selected_year][this.selected_month];
        // console.log(data);
        let current_selected_cell;

        // console.log(table.childNodes[1].childNodes)

        let date = new Date();                  //date variable
        let today = date.getDate();             //get the date number in the month
        let month = date.getMonth();            //get the month
        let year = date.getFullYear() - 1995;   //get the year (in code the real year is set later)
    
        let table_dimensions = { //dimensions of the table
            "rows": table.rows.length - 1, //row count
            "collumns": document.querySelectorAll('.calendar_table_node tr th').length //collumn count
        };
        if (table_dimensions.rows != data.length || table_dimensions.collumns != data[0].length) { //runs when the rows and collumns of table and data are inequal
            console.log('could not set data, data and table row counts do not align');
            return; //ends function early
        }
        for (let row_i = 0; row_i < data.length; row_i++) { //runs once for each row and skips the title row
            // console.log(table.childNodes[1].childNodes[row_i+1].childNodes.length - 1);
            for (let collumn_i = 0; collumn_i < table.childNodes[1].childNodes[row_i+1].childNodes.length - 1; collumn_i++) { //runs once for each collumn within the row
                current_selected_cell = table.childNodes[1].childNodes[row_i+1].childNodes[collumn_i + 1]; //sets the selected cell for easy manipulation
                // console.log(current_selected_cell);
                current_selected_cell.innerHTML = data[row_i][collumn_i]; //sets the innerhtml to the data passed
                if (current_selected_cell.innerHTML == today && this.selected_month == month && this.selected_year == year) { //when the selected cell is the current day
                    current_selected_cell.style.backgroundColor = 'var(--calendar-secondary)' //highlights the cell
                } else {
                    current_selected_cell.style.backgroundColor = ''; //unhighlights the cell when its no longer the same
                }
            }
        }
    
        document.querySelector('.date_label').innerHTML = `${this.selected_year + 1995}, ${this.get_month_from_num(this.selected_month)}`; //sets the date label
    }

    get_calendar_data(year_count) { //starting year 1995 cuz the first was on a monday
        const month_day_count = [
            31, 28, 31, 30,
            31, 30, 31, 31,
            30, 31, 30, 31
        ];                                                                          //data on the amount of days in a month
        let years = [];                                                             //every year generated
        let leap_index = 2;                                                         //sets the leap index according to the first year (1995) hardcoded
        let leap_day = 0;                                                           //initializes the leap day to 0
        let stop_index = 0;                                                         //index on what place the code stopped counting up
        
        for (let i = 0; i < year_count; i++) { //once for each year
            let current_year = [];                                                  //the year that the loop generates
            leap_index++;                                                           //increments the leap index up one
            
            for (let month_i = 0; month_i < 12; month_i++) { //once for each month
                if (isDivisible(leap_index, 4) && month_i==1) {
                    leap_day = 1;   //leap day
                } else { 
                    leap_day = 0;   //no leap day
                }
                this.current_month = [];                                                 //the month that each loop generates
                let running = true;                                                 //helps to fill in the 0's after it finishes
                let day_date_i = 0 - stop_index;                                    //resets the date count and subtracts the stop_index so the dates are correct
                for (let week_i = 0; week_i < 6; week_i++) {                        //once for each week in month 
                    let current_week = [];                                          //current week this generates
                    for (let day_i = 0; day_i < 7; day_i++) { //once for each day in week
                        if (day_date_i < month_day_count[month_i] + leap_day && running) {     //increments the date filling in each day, and stops when it reaches the amount of days in that specific month according to the constant data
                            day_date_i++;
                        } else if (running) {                                       //runs when it stops counting the date up
                            day_date_i = 0;                                         //resets the date counter
                            running = false;                                        //stops it from counting up
                            stop_index = day_i;                                     //sets the stop_index to the specific location that the code stopped
                        }
                        current_week.push(day_date_i);                              //pushes the day to the week
                    }
                    // console.log('week end')
                    this.current_month.push(current_week);                               //pushes the week to the month
                }
                // console.log('month end');
                current_year.push(this.current_month);                                   //pushes the month to the year
            }
            // console.log(current_year);
            years.push(current_year);                                               //pushes the year to years array
        }
        return years;
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

            checklist.addEventListener('touchstart', (finger_tap_event) => {
                console.log(finger_tap_event); 
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

            window.addEventListener('touchend', (mouse_up_event) => {
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
}                                               //                                default node type
                                                //                     item_count
                                                //                  top
                                                //            left 
                                                //       width
                                                // height   
const checklist         = new Checklist(20, 5, null, 600, 325, 250,  250, 5, null, "left_tutorial"); //spawns a checklist from the class as an object
const checklist2        = new Checklist(20, 5, null, 250, 350, 730,  600, 5, null, "middle_tutorial");
const checklist3        = new Checklist(20, 5, null, 125, 150, 755,  430, 5, null, "right_tutorial");
const checklist_notepad = new Checklist(20, 5, null, 200, 200, 800,  300, 5, null, "checklist");
const calendar          = new Checklist(20, 5, null, 500, 900, 400, 1000, 5, null, "calendar");

                    //                      col mode
                    //               spawn type    
                    //          top
                    //     left 
                    //item count 
checklist.spawn        (0, 250, 250,  'dyno', true); //spawns left_tutorial
checklist2.spawn       (0, 730, 600,  'dyno', true); //spawns middle tutorial
checklist3.spawn       (0, 755, 430,  'dyno', true); //spawns right tutorial
calendar.spawn         (0, 300, 1000, 'dyno', true); //spawns a calendar node
checklist_notepad.spawn(2, 100, 100,  'dyno', true); //spawns a checklist with 2 items


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


// **--__--** 'awesome color scheme' file type **--__--** \\

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

function isNegative(num) {
    if (num >= 0) return false; //positive
    if (num < 0)  return true;  //negative
}

function isDivisible(num, by) {
    const a = `${(num / by)}`.split('.');   //splits a into an array on the .
    if (a.length == 1) {//when array length is 1
        if (isNaN(a[0])) { //if a is NaN
            console.log('variable is the wrong type')
            return false;                   //if something is broken
        }
        return true;                        //num is divisible by by
    } else if (a.length == 2) {//if array length is 2
        return false;                       //num is not divisible by by
    }
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

