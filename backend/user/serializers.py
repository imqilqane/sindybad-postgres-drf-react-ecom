from django.core import exceptions
from django.core.exceptions import ValidationError
from django.db.models import fields
from django.contrib.auth import authenticate, tokens
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import DjangoUnicodeDecodeError, force_str, smart_bytes, smart_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from rest_framework import serializers

from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=6, max_length=25, write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password"
        ]

    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')
        password = attrs.get('password')

        if not username.isalnum():
            raise ValueError('username must contains chars as well')

        return attrs

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)


class RequestNewPassWordSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email', ]


class ResetPassWordSerializer(serializers.Serializer):
    uidb64 = serializers.CharField(max_length=255)
    token = serializers.CharField(max_length=500)
    password = serializers.CharField(min_length=6, write_only=True)

    class Meta:
        fields = ['uidb64', 'token', 'password']

    def validate(self, attrs):
        print(attrs)
        uidb64 = attrs.get('uidb64')
        password = attrs.get('password')
        token = attrs.get('token')

        id = force_str(urlsafe_base64_decode(uidb64))
        user_qs = User.objects.filter(id=id)
        if user_qs.exists():
            user = user_qs[0]
            token = PasswordResetTokenGenerator().check_token(user, token)
            if not token:
                raise ValidationError('This token is invalid')
            if not user.is_active:
                raise ValidationError('This account is blocked')
            if not user.is_verify:
                raise ValidationError('Please verify your email')
            user.set_password(password)
            user.save
            return super().validate(attrs)

        else:
            raise exceptions.ValidationError('user not exists')


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=225)
    password = serializers.CharField(max_length=28, write_only=True)
    token = serializers.SerializerMethodField()

    def get_token(self, obj):

        user = User.objects.get(email=obj['email'])

        return {
            'access': user.tokens()['access'],
            'refresh': user.tokens()['refresh'],
        }

    class Meta:
        fields = ['email', 'password', 'token']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        token = attrs.get('token')

        user = authenticate(email=email, password=password)
        if not user:
            raise exceptions.ValidationError('there is no such user')
        if not user.is_active:
            raise exceptions.ValidationError('this account is blocked')
        if not user.is_verify:
            raise exceptions.ValidationError('please verify your email')

        return {
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens(),
        }
