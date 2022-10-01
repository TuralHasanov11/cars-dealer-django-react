from django.contrib.auth import tokens
import six
from django.contrib.sites.shortcuts import get_current_site  
from django.utils import encoding
from django.utils.http import urlsafe_base64_encode   
from django.template.loader import render_to_string  
from django.core import mail  
from django.contrib.sites.models import Site


class EmailVerificationTokenGenerator(tokens.PasswordResetTokenGenerator):  
    def _make_hash_value(self, user, timestamp):  
        return (six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_active))
          
account_activation_token = EmailVerificationTokenGenerator()  

def sendEmailVerification(user):
    currentSite = Site.objects.get_current()
    subject = 'Activation link has been sent to your email id'  
    message = render_to_string('account/account_active_email.html', {  
        'user': user,  
        'domain': currentSite.domain,  
        'uid':urlsafe_base64_encode(encoding.force_bytes(user.id)),  
        'token':account_activation_token.make_token(user),  
    })  
    toEmail = user.email
    email = mail.EmailMessage(subject, message, to=[toEmail])  
    print(email)
    email.send()  