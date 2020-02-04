export interface UserMessagePostModel {
    Id: string;
    Target: string;
    Message: string;
    ClientId: string;
}

export interface StoreMessagePostModel {
    Target: string;
    Message: string;
}

export interface UserMessageContactModel {
    UserId: string;
    FirstName: string;
    LastName: string;
    ImageUrl: string;
    LastMessage?: string;
    IsLastMessageFromThisContact?: boolean;
    LastMessageTime?: any;
}

export interface ReceivedMessageModel {
    Message: string;
    messageId: string;
    message_type: string;
    Sender: string;
    senderName: string;
    TimeSent: any;
    Target: string;
    Id: string;
}

export interface MessageModel {
    ClientId: string;
    Id: string;
    IsPushedToReceiver?: boolean;
    IsViewedByReceiver?: boolean;
    Message: string;
    Sender: string;
    Target: string;
    TimeSent: string;
}

export class ContactUsPostModel {
    Username: string;
    Email: string;
    Title: string;
    Message: string;
}