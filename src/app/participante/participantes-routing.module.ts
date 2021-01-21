import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { ParticipantesPesquisaComponent } from './participantes-pesquisa/participantes-pesquisa.component';
import { ParticipanteCadastroComponent } from './participante-cadastro/participante-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ParticipantesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PARTICIPANTE'] }
  },
  {
    path: 'novo',
    component: ParticipanteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PARTICIPANTE'] }
  },
  {
    path: ':codigo',
    component: ParticipanteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ATUALIZAR_PARTICIPANTE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ParticipantesRoutingModule { }
