from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import credentials
import json
from info import data, trial

class StdOutListener(StreamListener):
    
    def __init__(self, max_tweets = 500):
        self.max_tweets = max_tweets
        self.tweet_num = 0
        super(StdOutListener, self).__init__()

    def on_connect(self):
        print('Stream starting...')

    def on_status(self, status):
        #if location exists, save the tweet and its coordinates into data 
        if status.geo is not None and self.tweet_num <= self.max_tweets:
            t = dict()
            t['text'] = status.text
            t['coordinates'] = status.coordinates
            data.append(t)
            trial.append(status.coordinates)
            self.tweet_num += 1
            #print(t)
            print(status.coordinates)
            return True

    def on_error(self, status):
        #print(status)
        return False

def main():    #set up tweepy authentication 
    auth = OAuthHandler(credentials.API_KEY, credentials.API_SECRET_KEY)
    auth.set_access_token(credentials.ACCESS_TOKEN, credentials.ACCESS_TOKEN_SECRET)

    #set up streaming 
    listener = StdOutListener(max_tweets=20)
    stream = Stream(auth, listener)

    #set up location limits  to include entire map
    loc = [-180,-90,180,90]

    #set up location filter, this filter will change later 
    stream.filter(locations=loc)

