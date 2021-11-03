from rest_framework import exceptions
from rest_framework_simplejwt.backends import TokenBackend
from user.models import User


def get_user(request):
    """
    this function take the token from request and decode it 
    to get user id and return user object
    """
    try:
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[0]

        print("token " * 10)
        print(token)
        valid_data = TokenBackend(
            algorithm='HS256').decode(token, verify=False)
        user_id = valid_data['user_id']
        user = User.objects.get(id=user_id)
        return user
    except exceptions.ValidationError:
        print('ValidationError')
