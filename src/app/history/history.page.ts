import { Component, OnInit } from '@angular/core';
import { LoveResult, LoveService } from '../love.service';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  title = "Historique"
  history: LoveResult[] = []

  constructor(
    private service: LoveService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe({
      next: res => this.history = res
    })
  }

  async clearHistory() {
    const alert = await this.alertCtrl.create({
      header: `Vide l'historique`,
      message: `Confirmer?`,
      buttons: [{
        text: 'Annuler',
        handler: () => this.alertCtrl.dismiss()
      },
        {
          text: 'Ok',
          handler: async () => {
            this.service.clear()
              .pipe(
                mergeMap(() => this.service.getAll())
              )
              .subscribe({
                next: async res => {
                  this.history = res
                  const toast = await this.toastCtrl.create({
                    message: ' Historique vide',
                    duration: 2000
                  })
                  await toast.present()
                }
              })

          }

        }]
    })

    await alert.present()
  }

  async onActions(loveResult: LoveResult) {
    const actionsheet = await this.actionsheetCtrl.create({
      buttons: [
        {
          text: 'Preremplir le formulaire',
          handler: () => this.router.navigate(['/calculator', loveResult.id])
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.service.remove(loveResult).pipe(
              mergeMap(() => this.service.getAll())
            ).subscribe({
                next: res => this.history = res
              })
          }
        }
      ]
    })
  }

  async onClick(loveResult: LoveResult) {
    const modal = await this.modalCtrl.create({
      component: ResultModalComponent,
      componentProps: {
        loveResult: loveResult
      }
    })
    await modal.present();
  }
}



