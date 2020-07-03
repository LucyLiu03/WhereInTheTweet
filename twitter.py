from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import credentials
import json
from info import data

class StdOutListener(StreamListener):
    def on_connect(self):
        print('Stream starting...')

    def on_status(self, status):
        #if location exists, save the tweet and its coordinates into data 
        if status.geo is not None:
            t = dict()
            t['text'] = status.text
            t['coordinates'] = status.coordinates
            data.append(t)
            print(t)
        return True

    def on_error(self, status):
        print(status)

def main():    #set up tweepy authentication 
    auth = OAuthHandler(credentials.API_KEY, credentials.API_SECRET_KEY)
    auth.set_access_token(credentials.ACCESS_TOKEN, credentials.ACCESS_TOKEN_SECRET)

    #set up streaming 
    listener = StdOutListener()
    stream = Stream(auth, listener)

    #set up location limits  to include entire map
    loc = [-180,-90,180,90]

    #set up location filter, this filter will change later 
    stream.filter(locations=loc)

