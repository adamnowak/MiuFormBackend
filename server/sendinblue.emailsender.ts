import { from, Observable } from 'rxjs';
import { SendSmtpEmailAttachment, SendSmtpEmailTo } from 'sib-api-v3-typescript';
import { EmailMessage, EmailSender } from './emailsender';


export interface SendInBlueOptions {
    serverSecureCode: string;
}

export class SendInBlueSender implements EmailSender {
    send(options: any, email: EmailMessage): Observable<any> {
        const sendGridoptions = options as SendInBlueOptions;
        return this.sendBySendGrid(sendGridoptions, email);
    }

    sendBySendGrid(options: SendInBlueOptions, email: EmailMessage): Observable<any> {
        const sibApiV3Sdk = require('sib-api-v3-typescript');

        const apiInstance = new sibApiV3Sdk.TransactionalEmailsApi();

        const apiKey = apiInstance.authentications.apiKey;
        apiKey.apiKey = options.serverSecureCode;

        const sendSmtpEmail = new sibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = email.subject;
        sendSmtpEmail.htmlContent = email.plainContent;
        sendSmtpEmail.sender = {email: email.from};
        sendSmtpEmail.to = email.to.map(x=> { const res = new SendSmtpEmailTo(); res.email = x; return res;});
        //sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
        //sendSmtpEmail.bcc = [{"name":"John Doe","email":"example@example.com"}];
        sendSmtpEmail.replyTo = {email: email.from};
        //sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
        //sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

        const attachedReport = new SendSmtpEmailAttachment();
        attachedReport.content = email.report;
        attachedReport.name = email.reportName;
        sendSmtpEmail.attachment = [attachedReport];

        return from(apiInstance.sendTransacEmail(sendSmtpEmail));

    }
}
