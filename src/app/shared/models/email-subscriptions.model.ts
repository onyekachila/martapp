export class EmailSubscriptionUpdateModel {
    Items?: EmailSubscriptionStatusModel[] = [
        {
            Id: 1,
            Status: true
        }
    ];
    Email: string;
    Password?: string;
}

export interface EmailSubscriptionStatusModel {
    Id: number;
    Status: boolean;
}

export interface ContactUsPostModel {
    UserName: string;
    Email: string;
    Title: string;
    Message: string;
}