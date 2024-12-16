from pymongo import MongoClient

# Connect to the MongoDB database
client = MongoClient('mongodb://localhost:27017/')

# Select the database and collection
db = client['mydatabase']
collection = db['mycollection']
