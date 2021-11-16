from .test_setup import TestSetUp


class TestViews(TestSetUp):

    def test_user_regestration_with_blank_input(self):
        """test the case when user try to register with blank data"""

        res = self.client.post(self.regiter_url)
        self.assertEqual(res.status_code, 400)

    def test_user_regestration_with_valid_data(self):
        res = self.client.post(self.regiter_url, self.user_data, format='json')

        self.assertEqual(res.status_code, 201)
