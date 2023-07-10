"""
Update everyone's name in the database to reflect the People API
"""

import requests
import os
import sys
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.database import Database
from pymongo.collection import ObjectId
from progress.bar import Bar

uri = "mongodb://interstellar.mit.edu:27017/"
db_name = "productionnew" # imported from MongoDB Atlas DB
# db_name = "interstellar" # created along with XVM

client = MongoClient(uri)

db = client.get_database(db_name)
users_db = db["users"]

def lookup_name(email: str):
    """
    Lookup a name by email using the people API, or return None if it could not be found
    """
    kerb = email.split('@')[0]
    response = requests.get(f'https://mit-people-v3.cloudhub.io/people/v3/people/{kerb}', headers={
        'client_id': os.environ['MULESOFT_CLIENT_ID'],
        'client_secret': os.environ['MULESOFT_CLIENT_SECRET'],
    })
    if response.status_code == 200:
        return response.json()['item']['displayName']
    elif response.status_code == 400:
        print(f'{email} gave {response.json()}', file=sys.stderr)
        return None
    else:
        print(response.json(), file=sys.stderr)
        raise Exception(f'status code {response.status_code}')

num_users = users_db.count_documents({})

with Bar('Updating names', max=num_users) as bar:
    for user in users_db.find():
        if 'name' in user:
            email = user['email']
            old_name = user['name']
            new_name = lookup_name(email)
            if new_name and new_name != old_name:
                users_db.update_one({'_id': user['_id']}, {'$set': {'name': new_name}})
                print(f'Updated {new_name}', file=sys.stderr)
        bar.next()

