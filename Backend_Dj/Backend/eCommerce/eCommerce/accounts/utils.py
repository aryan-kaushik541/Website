from django.core.mail import send_mail,EmailMessage
from django.core.mail import EmailMultiAlternatives
from decouple import config

class Util:
    @staticmethod
    def send_email(data):
        Email=send_mail(
            subject=data['email_subject'],
            message=data['message'],
            from_email=config('EMAIL_HOST_USER',default='localhost'),
            recipient_list=[data['recipient_list']],
            fail_silently=True,
        )
        

        