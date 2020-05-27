import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { HelpComponent } from './nav/help/help.component';


const routes: Routes = [{
path: 'home', component: HomeComponent
},
{
  path:'help', component: HelpComponent
},
  { path: 'home/finance',
    loadChildren: () => import('./home/finances/finances.module')
      .then(m => m.FinancesModule) 
    },
  { path: 'home/projects',
    loadChildren: () => import('./home/projects/projects.module')
      .then(m => m.ProjectsModule) 
    },
  { path: 'home/users', 
    loadChildren: () => import('./home/users/users.module')
      .then(m => m.UsersModule) },
  {  path: 'home/customers',
    loadChildren: () => import('./home/customers/customers.module')
      .then(m => m.CustomersModule)
  },{
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },
   {
     path: '**', component: FourZeroFourComponent
   }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
