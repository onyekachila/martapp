import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MessageModel, UserMessageContactModel, ReceivedMessageModel } from 'src/app/shared/models/message.model';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { UserService } from 'src/app/core/services/user.service';
import { BehaviorSubject } from 'rxjs';
//import { AngularFireMessaging } from '@angular/fire/messaging';
//import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  senderId: string;
  search: string;
  recipient: UserMessageContactModel;
  messageContactedList: UserMessageContactModel[];
  page = 0;
  count = 0;
  messagesList: MessageModel[];
 // @ViewChild('scrollMe')
  private myScrollContainer: ElementRef;
  messageBodyData: ReceivedMessageModel;
  newMessage: string;
  myDate: Date;
  containsMessage = false;
  showChatPopUp = false;
  allChats = [];
  translate = false;
  numberOfMessagesBetweenUser = 0;
  messagesPageNumberBetweenUser = 0;
  fetchingMessages = false;
  fetchingContacts = false;
  maxLength = 2048;
  currentMessage = new BehaviorSubject(null);

  constructor(
    private userService: UserService,
    private messagingService: MessagingService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
   // private messaging: AngularFireMessaging,
   // private authService: AuthenticationService
  ) {
   //this.authService.getPermission();
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    //this.receivePushMessage();
    this.route.params.subscribe(params => {
      const userId = params['contactId'];
      if (userId) {
        if (this.messageContactedList) {
          this.messageContactedList.forEach(contact => {
            if (contact.UserId === userId) {
              this.onSelect(contact);
            }
          });
        }
      }
    });
    this.getApplicationUserId();
    this.getUserMessageContact(0);
  }



  getUserMessageContact(page) {
    this.fetchingContacts = true;
    this.messagingService.getMessageContactList(page).subscribe(
      data => {
        if (page === 0) {
          this.messageContactedList = [];
        }
        this.page++;
       /* data.Data.forEach(element => {
          this.messageContactedList.push(element);
        });*/
        this.messageContactedList.forEach(contact => {
          this.userService.GetUserImage(contact.UserId).subscribe(
            data => {
              if (data) {
               // contact.ImageUrl = 'data:image/jpeg;base64,' + data.ImageData;
                if (this.recipient) {
                  if (contact.UserId === this.recipient.UserId) {
                    this.recipient.ImageUrl = contact.ImageUrl;
                  }
                }
              }
            }
          );
        });
        this.scrollToBottom();
        /*if (this.messageContactedList.length < data.Count) {
          this.getUserMessageContact(this.page);
        } else {
        }*/
      }
    );

  }

  getApplicationUserId() {
    const currUserDet = this.userService.getLocalCurrentUserDet();
    if (currUserDet) {
      this.senderId = currUserDet.ApplicationUserId;
    }
  }

  getMessagesBetweenUsers(senderId, receiverId, page, total) {
    this.fetchingMessages = true;
    this.messagingService.getMessageList(senderId, receiverId, page, total, 'desc').subscribe(
     /* data => {
        if (!this.messagesList) {
          this.messagesList = [];
        }
        this.fetchingMessages = false;
        this.count++;
        this.messagesPageNumberBetweenUser++;
        let old_data = data.Data;
        this.messagesList.forEach(messageObject => {
          old_data.push(messageObject);
        });
        if (old_data.length > 0) {
          this.containsMessage = true;
        }
        this.numberOfMessagesBetweenUser = data.Count;
        this.sortItemsByDate(old_data);
      }*/
    );
  }

  onSelect(contact: UserMessageContactModel) {
    if (this.recipient !== contact) {
      this.containsMessage = false;
      this.messagesPageNumberBetweenUser = 0;
      this.recipient = contact;
      this.messagesList = undefined;
      this.getMessagesBetweenUsers(contact.UserId, contact.UserId, 0, 30);
    }
  }

  scrollToBottom(): void {
    try {
      // this.utcTime();
      const dis = this;
      if (dis.myScrollContainer) {
        setTimeout(function () { dis.myScrollContainer.nativeElement.scrollTop = dis.myScrollContainer.nativeElement.scrollHeight; }, 500);
      }
    } catch (err) {
    }
  }

  sendMessage() {
    if (this.newMessage && this.recipient) {
      if (this.newMessage.trim() === '') {
      } else {
        const message = this.newMessage;
        this.newMessage = undefined;
        const d = new Date();
        let newMessageBodyData: MessageModel = {
          Message: message,
          Sender: this.senderId,
          TimeSent: d.toISOString(),
          Target: this.recipient.UserId,
          IsPushedToReceiver: undefined,
          Id: "" + new Date().getMilliseconds(),
          ClientId: this.senderId
        };
        this.messagesList.push(newMessageBodyData);
        this.scrollToBottom();
        this.messagingService.postMessage(newMessageBodyData).subscribe(
          data => {
            this.messagesList.map(message => {
              if (message.TimeSent === newMessageBodyData.TimeSent) {
                message.IsPushedToReceiver = true;
              }
            });
            this.getUserMessageContact(0);
          },
          () => {
            this.messagesList.map(message => {
              if (message.TimeSent === newMessageBodyData.TimeSent) {
                message.IsPushedToReceiver = false;
              }
            });
          }
        );
      }
    }

  }

  resend(messageObject: MessageModel) {
    this.messagesList.map(message => {
      if (message === messageObject) {
        message.IsPushedToReceiver = undefined;
        message.Id = "" + new Date().getMilliseconds();
        this.messagingService.postMessage(message).subscribe(
          () => {
            message.IsPushedToReceiver = true;
            this.getUserMessageContact(0);
          },
          () => {
            message.IsPushedToReceiver = false;
          }
        );
      }
    });
  }

  receiveMessage(messagePayLoadData) {
    this.getUserMessageContact(0);
    if (this.recipient.UserId !== messagePayLoadData.senderId) {
    } else {
      this.loadReceivedMessage(messagePayLoadData);
    }
    this.getUserMessageContact(0);
    this.scrollToBottom();
  }

  loadReceivedMessage(messagePayLoadData) {
    var res = this.utilityService.search(messagePayLoadData.messageId, "Id", this.messagesList);
    // console.log(res)
    if (res) { } else {
      this.messageBodyData = {
        Id: messagePayLoadData.Id,
        Message: messagePayLoadData.message,
        Sender: messagePayLoadData.senderId,
        TimeSent: new Date(),
        Target: this.recipient.UserId,
        messageId: messagePayLoadData.Id,
        message_type: "chat",
        senderName: messagePayLoadData.senderName
      };
      // console.log(messagePayLoadData);
      this.translateMessages(this.messageBodyData).then(res => { this.messagesList.push(res); });
    }
  }

  sortItemsByDate(items) {
    // items.map(x => x.TimeSent = new Date(x.TimeSent).toUTCString());
    this.messagesList = items.sort((a: any, b: any) =>
      new Date(a.TimeSent).getTime() - new Date(b.TimeSent).getTime()
    );
    if (this.messagesList.length > 0) {
      this.messagesList.forEach(message => {
        message.IsPushedToReceiver = true;
      });
      this.containsMessage = true
    }
    // console.log(items, this.messagesList);
    // this.translateAllMessages();
    this.scrollToBottom();
  }

  // switchTranslationStatus() {
  //   this.translate = !(this.translate);
  //   // console.log(this.translate);
  //   this.translateAllMessages();
  // }

  // translateAllMessages() {
  //   this.messagesList.forEach(messageBlock => {
  //     this.translateMessages(messageBlock).then(res => {
  //       messageBlock = res;
  //     });
  //   });
  // }

  translateMessages(data): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(data);
      // if (this.translate) {
      //   const langToTranslateTo: string = localStorage.prefferedLang;
      //   this.utilityService.translateText(data.Message, langToTranslateTo).subscribe(
      //     data => {
      //       data.OldMessage = data.Message;
      //       data.Message = data.data.translations[0].translatedText;
      //       resolve(data);
      //     }
      //   );
      // } else {
      //   const translatedText = data.Message;
      //   data.Message = data.OldMessage || data.Message;
      //   data.OldMessage = translatedText;
      //   resolve(data);
      // }
    });
  }

  /*receivePushMessage() {
    this.messaging.messages
      .subscribe((message) => {
        const xx: any = message;
        // console.log(JSON.stringify(xx));
        this.currentMessage.next(message);
        try {
          if (xx.data.msg_type === 'chat') {
            this.receiveMessage(xx.data);
          }
        } catch (error) {
          console.log(error);
        }
      });
  }*/

}
