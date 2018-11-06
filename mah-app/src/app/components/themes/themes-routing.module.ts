
/**
 * Author: Michael Alan Hendricks
 * Date Created: 06/11/2018
 * Description: This route handles all routing related to the bootstrap
 *              theme demos
 */

/* Import Module */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import components */
import { BootstrapDashboard } from './bootstrap-themes/bootstrap-dashboard.component';
import { UserProfileDemo1Component } from './bootstrap-themes/user-profile-demo1/user-profile-demo1.component';
import { UserProfileDemo2Component } from './bootstrap-themes/user-profile-demo2/user-profile-demo2.component';
import { UserProfileDemo1EditComponent } from './edit-themes/user-profile-demo1-edit/user-profile-demo1-edit.component';
import { UserProfileDemo2EditComponent } from './edit-themes/user-profile-demo2-edit/user-profile-demo2-edit.component';

const routes: Routes = [
    { path: 'userProfileDemo1', component: UserProfileDemo1Component },
    { path: 'userProfileDemo2', component: UserProfileDemo2Component },
    { path: 'userProfileDemo1Edit', component: UserProfileDemo1EditComponent },
    { path: 'userProfileDemo2Edit', component: UserProfileDemo2EditComponent },  
    { path: 'dashboard', component: BootstrapDashboard }  
] 

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class ThemesRoutingModule {
    
}