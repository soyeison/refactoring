// Antes sin aplicar el concepto de disenio de software

/* class NotificationService {
  sendEmail(email: string, message: string) {
    console.log(`Email sent to ${email} with message: ${message}`);
  }

  sendSMS(phone: string, message: string) {
    console.log(`SMS sent to ${phone} with message: ${message}`);
  }

  sendPushNotification(token: string, message: string) {
    console.log(`Push notification sent to ${token} with message: ${message}`);
  }

  sendNotification(notifcationType: string, target: string, message: string) {
    if (notifcationType === "email") {
      this.sendEmail(target, message);
    } else if (notifcationType === "sms") {
      this.sendSMS(target, message);
    } else if (notifcationType === "push") {
      this.sendPushNotification(target, message);
    }
  }
}

// Para usarlo hariamos
const notificationService = new NotificationService();
notificationService.sendNotification(
  "email",
  "example@example.com",
  "Hello World"
);
notificationService.sendNotification("sms", "123456789", "Hello World");
notificationService.sendNotification("push", "123456789", "Hello World"); */

// Aqui estamos usando encapsulamiento a nivel de metodo

interface SendNotification {
  sendNotification(target: string, message: string): void;
}

export class EmailSender implements SendNotification {
  sendNotification(target: string, message: string) {
    console.log(`Email sent to ${target} with message: ${message}`);
  }
}

export class SMSSender implements SendNotification {
  sendNotification(target: string, message: string) {
    console.log(`SMS sent to ${target} with message: ${message}`);
  }
}

export class PushSender implements SendNotification {
  sendNotification(target: string, message: string) {
    console.log(`Push notification sent to ${target} with message: ${message}`);
  }
}

export class NotificationService {
  constructor(private sender: SendNotification) {
    this.sender = sender;
  }

  sendNotification(target: string, message: string) {
    this.sender.sendNotification(target, message);
  }
}

// Para mandar a email

const notificationService = new NotificationService(new EmailSender());
notificationService.sendNotification("example@example.com", "Hello World");

// Para mandar a sms
const notificationService2 = new NotificationService(new SMSSender());
notificationService2.sendNotification("123456789", "Hello World");

// Para mandar a push
const notificationService3 = new NotificationService(new PushSender());
notificationService3.sendNotification("token122vfeasasd", "Hello World");
