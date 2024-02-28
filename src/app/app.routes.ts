import { Routes} from '@angular/router';
import { PrincipalComponent } from './views/principal/principal.component';
import { LoginComponent } from './views/login/login.component';
import { SkillsComponent } from './views/skills/skills.component';
/*Se renderizan los componentes como se muestran*/
export const routes: Routes = [
    {path:'principal',component: PrincipalComponent},
    {path:'login',component:LoginComponent},
    {path:'skills',component:SkillsComponent},
    {path:'**',redirectTo:'login', pathMatch:'full'}
];
