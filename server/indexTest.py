import unittest
from flask import Flask
from index import app

class TestPredictDelayAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_predict_delay_valid_data(self):
        response = self.app.post('/predict_delay', json={
            'day_of_week': 3,
            'origin': 12478,
            'dest': 14771
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print(data);
        self.assertIn('probability_of_delay', data)

#
#    def test_predict_delay_missing_data(self):
#        response = self.app.post('/predict_delay', json={
#            'day_of_week': 3,
#            'origin': 12478
#        })
#        self.assertEqual(response.status_code, 400)

#    def test_predict_delay_invalid_data(self):
#        response = self.app.post('/predict_delay', json={
#            'day_of_week': 'invalid',
#            'origin': 12478,
#            'dest': 14771
#        })
#        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()