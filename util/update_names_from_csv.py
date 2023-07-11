import csv
from pymongo.mongo_client import MongoClient

uri = "mongodb://interstellar.mit.edu:27017/"
db_name = "productionnew" # imported from MongoDB Atlas DB
# db_name = "interstellar" # created along with XVM

client = MongoClient(uri)

db = client.get_database(db_name)
users_db = db["users"]

with open('names.csv', 'r') as f:
    reader = csv.reader(f)
    for line in reader:
        email, name = line
        if name == 'NA':
            name = 'Deactivated kerb'
        users_db.update_one({'email': email}, {'$set': {'name': name}})
