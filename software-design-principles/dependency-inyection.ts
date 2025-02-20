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

export class DependencyContainer {
  private emailSender: EmailSender;
  private smsSender: SMSSender;
  private pushSender: PushSender;

  constructor() {
    this.emailSender = new EmailSender();
    this.smsSender = new SMSSender();
    this.pushSender = new PushSender();
  }

  public getEmailSender(): EmailSender {
    return this.emailSender;
  }

  public getSMSSender(): SMSSender {
    return this.smsSender;
  }

  public getPushSender(): PushSender {
    return this.pushSender;
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

const dependencyContainer = new DependencyContainer();

const notificationService = new NotificationService(
  dependencyContainer.getEmailSender()
);
notificationService.sendNotification("example@example.com", "Hello World");

// Para mandar a sms
const notificationService2 = new NotificationService(
  dependencyContainer.getSMSSender()
);
notificationService2.sendNotification("123456789", "Hello World");

// Para mandar a push
const notificationService3 = new NotificationService(
  dependencyContainer.getPushSender()
);
notificationService3.sendNotification("token122vfeasasd", "Hello World");

// Este diseno es mas escalable y mantenible ademas de que respeta principio solid de open/close y tiene un buen diseño
