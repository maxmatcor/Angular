import { Component } from '@angular/core';

@Component({

  selector: 'chat-app',
  templateUrl:'./chat.component.html'
})

export class ChatComponent {
  public lstMessage: string[] = ["hola3", "hola2"];
}
