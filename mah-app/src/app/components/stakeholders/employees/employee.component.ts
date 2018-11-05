/**
 * Author: Michael Alan Hendricks
 * Date Modified: 04/11/2018
 * Description: This componet will handle all main feature conserning employees.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    title: string;    

    constructor() {
        this.title = "Employee";
    }

    /**
     * NgOnInit should be use to initialize component logic, my understanding.
     * Angular doc definintion: Initialize the directive/component after Angular
     *                          first displays the data-bound properties and sets 
     *                          the directive/component's input properties.
     */
    ngOnInit() {
        
    }
    
}