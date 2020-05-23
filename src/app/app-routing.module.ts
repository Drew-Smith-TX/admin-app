import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{
path: 'home', component: HomeComponent
},
  { path: 'finance',
    loadChildren: () => import('./finances/finances.module')
      .then(m => m.FinancesModule) 
    },
  { path: 'project',
    loadChildren: () => import('./projects/projects.module')
      .then(m => m.ProjectsModule) 
    },
  { path: 'users', 
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule) },
  {  path: 'customers',
    loadChildren: () => import('./customers/customers.module')
      .then(m => m.CustomersModule)
  },
  { path:'',
    redirectTo: 'home',
    pathMatch: 'full'

  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
