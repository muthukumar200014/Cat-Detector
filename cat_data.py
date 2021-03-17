from flask import Flask

app = Flask(__name__)

@app.route('/api')
def index():
    return {"name":"muthu"}

# from flask import Flask, jsonify
# from flask_cors import CORS
# from dotenv import load_dotenv
# import psycopg2
# import os
#
# load_dotenv()
#
# # PostgreSQL Database credentials loaded from the .env file
# DATABASE="catdetector"
# DATABASE_USERNAME="postgres"
# DATABASE_PASSWORD="malar@4321"
#
# app = Flask(__name__)
#
# # CORS implemented so that we don't get errors when trying to access the server from a different server location
# CORS(app)
#
# try:
#     con = psycopg2.connect(
#         database=DATABASE,
#         user=DATABASE_USERNAME,
#         password=DATABASE_PASSWORD)
#
#     cur = con.cursor()
#
#     # GET: Fetch all movies from the database
#     @app.route('/')
#     def fetch_all_movies():
#         cur.execute('SELECT * FROM cat_data_1')
#         rows = cur.fetchall()
#         print(rows)
#
#         return jsonify(rows)
# except:
#     print('Error')
#
#
#
