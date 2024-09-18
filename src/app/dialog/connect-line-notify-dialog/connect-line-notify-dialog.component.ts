import { Component } from '@angular/core';

@Component({
  selector: 'app-connect-line-notify-dialog',
  templateUrl: './connect-line-notify-dialog.component.html',
  styleUrls: ['./connect-line-notify-dialog.component.scss']
})
export class ConnectLineNotifyDialogComponent {
  constructor() { }

  ngOnInit(): void {
  }

  connectLineNotify() {
    window.location.href='https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=TxOPZEk0qfNppnTp4C1wT2&redirect_uri=http://localhost:3000/app-home/app-dashboard&scope=notify&state=NO_STATE';
  }
}
