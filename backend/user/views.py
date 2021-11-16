from django.core import exceptions
from django.shortcuts import render
from django.urls import reverse
from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import DjangoUnicodeDecodeError, smart_bytes, force_str
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    RegisterSerializer,
    RequestNewPassWordSerializer,
    ResetPassWordSerializer,
    LoginSerializer
)

import jwt


class RegisterAPIView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_qs = User.objects.filter(email=request.data['email'])
        if user_qs.exists():
            user = user_qs[0]
            token = RefreshToken.for_user(user)
            domain = get_current_site(request).domain
            relative_link = reverse("user:verify")
            activation_link = f"http://{domain}{relative_link}?token={token}"

            message = EmailMessage(
                'Verify your account :',
                f"hello dear {user.username}, \n thank you for your registration in our site \n one more step left - \n verify your account through this link - : {activation_link}",
                "support@example.com",
                [user.email, ]
            )
            message.send()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class VerifyACountAPIView(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            playload = jwt.decode(token, settings.SECRET_KEY, 'HS256')
            user_id = playload['user_id']
            user = User.objects.get(id=user_id)
            user.is_verify = True
            user.save()
            return Response({'success: ': 'Your account is activated'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            return Response({'error: ': 'token is expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError:
            return Response({'error: ': 'token is invalid'}, status=status.HTTP_400_BAD_REQUEST)


class RequestNewPassWordAPIView(APIView):
    serializer_class = RequestNewPassWordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_qs = User.objects.filter(email=request.data['email'])
        if user_qs.exists():
            user = user_qs[0]
            token = PasswordResetTokenGenerator().make_token(user)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            relative_link = reverse('user:reset_pass', kwargs={
                                    'uidb64': uidb64, 'token': token})
            domain = get_current_site(request).domain
            absolute_link = f"http://{domain}{relative_link}"
            message = EmailMessage(
                "Reset Your Password",
                f"To reset your pass word please visit this link : {absolute_link}",
                'no-reaplay@example.com',
                [user.email, ]
            )
            message.send()

            return Response({'success': 'We have send a reset password link to your email'}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'This email is not exists'}, status=status.HTTP_400_BAD_REQUEST)


class ResetPassWordAPIView(APIView):
    serializer_class = ResetPassWordSerializer

    def get(self, request, uidb64, token):
        try:
            id = force_str(urlsafe_base64_decode(uidb64))
            user_qs = User.objects.filter(id=id)
            if user_qs.exists():
                user = user_qs[0]
                check_token = PasswordResetTokenGenerator().check_token(user, token)
                if not check_token:
                    return Response({'Error': 'This token is invalid'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({
                    'success': 'token is valid you can reset ur password',
                    'uidb64': uidb64,
                    'token': token
                }, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as e:
            return Response({'Error', 'faild to decode the information'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, uidb64, token):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LoginAPIView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
