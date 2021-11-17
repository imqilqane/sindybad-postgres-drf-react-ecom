from .test_setup import TestSetUp
from user.models import User
from django.urls import reverse
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode


class TestViews(TestSetUp):

    def test_user_regestration_with_blank_input(self):
        """test the case when user try to register with blank data"""

        res = self.client.post(self.regiter_url)
        self.assertEqual(res.status_code, 400)

    def test_user_regestration_with_valid_data(self):
        """test the case when user try to register with valid data"""

        res = self.client.post(self.regiter_url, self.user_data, format='json')
        self.assertEqual(res.status_code, 201)
        return res

    def test_user_verifien_his_account_popry(self):
        """test the case when the user want to virify his propre account"""
        registered_user = self.test_user_regestration_with_valid_data()

        relative_link = reverse("user:verify")
        absulot_verifing_link = f"{relative_link}?token={registered_user.data['token']}"
        res = self.client.get(absulot_verifing_link)
        self.assertEqual(res.status_code, 200)

    def test_user_login_with_inverified_account(self):
        """test the case when a user try to log in but didnt verify his account"""

        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, 401)

    def test_user_login_with_verified_account(self):
        """test the case when a user try to log with verified account"""

        registerd_user_data = self.client.post(
            self.regiter_url, self.user_data, format='json')
        user = User.objects.get(email=registerd_user_data.data['email'])
        user.is_verify = True
        user.save()
        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, 200)

    def test_user_request_new_pass_with_invalid_email(self):
        """test the case when user want to reset password for not existing account"""

        res = self.client.post(self.request_new_pass_url, {
                               'email': 'example@gmail.com'}, format="json")
        self.assertEqual(res.status_code, 404)

    def test_user_request_new_pass_with_valid_email(self):
        """test the case when user want to reset password for an existing account"""

        self.client.post(self.regiter_url, self.user_data, format="json")
        res = self.client.post(self.request_new_pass_url, {
                               'email': self.user_data['email']}, format="json")
        self.assertEqual(res.status_code, 200)
        return res

    def test_checking_valid_reset_password_link(self):
        """test the case whene the user get to the reset password page with a correct link"""

        reset_request = self.test_user_request_new_pass_with_valid_email().data
        token = reset_request['token']
        uidb64 = reset_request['uidb64']
        link = reverse('user:reset_pass', kwargs={
            'uidb64': uidb64, 'token': token})
        res = self.client.get(link)
        self.assertEqual(res.status_code, 200)
        return res

    def test_checking_invalid_reset_password_link(self):
        """test the case whene the user get to the reset password page with an invalid link"""

        link = reverse('user:reset_pass', kwargs={
            'uidb64': 'uidb64', 'token': 'token'})
        res = self.client.get(link)
        self.assertEqual(res.status_code, 401)

    def test_user_reset_password_with_inverified_account(self):
        """test the case when user sent request new pass and get the link , 
        link is valid and everything is alright but with inverified account"""

        valid_link_request = self.test_checking_valid_reset_password_link().data
        reset_password_link = reverse('user:reset_pass', kwargs={
            'uidb64': valid_link_request['uidb64'], 'token': valid_link_request['token']})
        data = {
            'uidb64': valid_link_request['uidb64'],
            'token': valid_link_request['token'],
            'password': 'mynewpassword123+'
        }
        res = self.client.post(reset_password_link, data, format="json")
        self.assertEqual(res.status_code, 400)

    def test_user_reset_password_with_verified_account(self):
        """test the case when user sent request new pass and get the link , 
        link is valid and everything is alright but with verified account"""

        valid_link_request = self.test_checking_valid_reset_password_link().data
        reset_password_link = reverse('user:reset_pass', kwargs={
            'uidb64': valid_link_request['uidb64'], 'token': valid_link_request['token']})
        id = force_str(urlsafe_base64_decode(valid_link_request['uidb64']))
        user = User.objects.get(id=id)
        user.is_verify = True
        user.save()
        data = {
            'uidb64': valid_link_request['uidb64'],
            'token': valid_link_request['token'],
            'password': 'mynewpassword123+'
        }

        res = self.client.post(reset_password_link, data, format="json")
        self.assertEqual(res.status_code, 200)
