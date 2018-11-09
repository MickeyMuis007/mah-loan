/**
 * Author: Michael Alan Hendricks
 * Date Created: 06/11/2018
 * Description: This module will be used to handle all components to do
 *              with bootstrap styling themes practices.
 */

 /* Import Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesRoutingModule } from './themes-routing.module';

/* Import Components */
import { UserProfileDemo1Component } from './bootstrap-themes/user-profile-demo1/user-profile-demo1.component';
import { UserProfileDemo2Component } from './bootstrap-themes/user-profile-demo2/user-profile-demo2.component';
import { UserProfileDemo1EditComponent } from './edit-themes/user-profile-demo1-edit/user-profile-demo1-edit.component';
import { UserProfileDemo2EditComponent } from './edit-themes/user-profile-demo2-edit/user-profile-demo2-edit.component';
import { BootstrapDashboardComponent } from './bootstrap-themes/bootstrap-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        ThemesRoutingModule
    ],
    declarations: [
        UserProfileDemo1Component,
        UserProfileDemo2Component,
        UserProfileDemo1EditComponent,
        UserProfileDemo2EditComponent,
        BootstrapDashboardComponent,
    ]
})
export class ThemesModule {

}
