# -*- coding: utf-8 -*-
"""
    DWX_ZeroMQ_Connector_v2_0_1_RC8.py
    --
    @author: Darwinex Labs (www.darwinex.com)
    
    Copyright (c) 2017-2019, Darwinex. All rights reserved.
    
    Licensed under the BSD 3-Clause License, you may not use this file except 
    in compliance with the License. 
    
    You may obtain a copy of the License at:    
    https://opensource.org/licenses/BSD-3-Clause
"""
####################   Purpose   ##########
#this is a sever powered by
#1.python-flask
#2.MT4
#2.dwx zeromq connector (connect python to mt4 via zeromq(socket))
#3.socket.io (for streaming bid/ask)
#4.MongoDB(for database)
#5.and me <3
####################             ##########
##Flask sever
from distutils.debug import DEBUG
from distutils.log import debug
from random import sample
from socket import socket
from unicodedata import name
from flask_pymongo import PyMongo
from flask import Flask, jsonify
from flask_socketio import SocketIO, send, emit
from flask import current_app, g, Blueprint, jsonify, request
from jinja2 import Undefined
from numpy import double
from werkzeug.local import LocalProxy
from bson.json_util import dumps
import json
import zmq
import subprocess
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
##

import zmq
from time import sleep, time
from pandas import DataFrame, Timestamp
from threading import Thread
# 30-07-2019 10:58 CEST
from zmq.utils.monitor import recv_monitor_message
from flask_socketio import join_room, leave_room
from flask import Flask, redirect, url_for, request
from flask_cors import CORS, cross_origin
#***********************Crude SUMMARAY**********************
##Flask sever on line 39
##socket on line 820
#***********************************************************
##Flask sever
app = Flask(__name__) ##app = flask (ตัวนี้ใช้บ่อย เลยสำคัญ)
app.config['SECRET_KEY'] = 'mysecret'
app.config['MONGO_URI'] = "mongodb://localhost:27017/myDB"# tell flask to connect to mongoDB and direcly to myDB(my custom database)
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)
MT4_process = Undefined

#เชื่อม python-flask เข้ากับ Database(mongoDB)
def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = PyMongo(current_app).db #this is bind mongoDB cammand like insert, delete, create collection(s) record and more to variable db
    return db
# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)

# เรียกตัวดึงและประมวลข้อมูลที่ได้จาก sexy มาทำเป็น json
import Wrapper_sexy_seperate_method as Wrapper_and_calculate_raw_statistic_to_JSON                              #return is a json format of a callculated raw statistic data (expected full param)
import open_stragedytester_in_MT4_run_sexymodel_withparam as open_stragedytester_and_run_sexy_with_param        #return is a location of the raw statistic file (expected full param)
#stat_forex = sexy_method.run()## ตัวนี้จะคืนค้าเป็น dict(json) ที่จะใช้ในการเขียนลงดาต้าเบส(Mongodb) ด้วย flask ต่อไปในด้านล่าง
stat_forex = "pop" #temp

#ต่อ route ของ FLASK  (app = FLASK)
#ใช้จรืง
@app.route("/start_MT4")#Start MT4 with MT4_process
def start_MT4():
    global MT4_process
    try: #Start multiple time without close occur (this is a proplem don't do it, I aready  told the program to close so don't worry seeing this message)
        MT4_process.kill()
    except Exception as e: 
        print(":D")
    MT4_process = subprocess.Popen("C:\Program Files (x86)\GMI MetaTrader 4 Terminal/terminal.exe")
    print("Waiting MT4 to open for 4 second...")
    for i in range(4):
        sleep(1)
        print(i+1)
    return "Sucsess"

@app.route("/close_MT4")#Kill MT4 with MT4_process
def terminate_MT4():
    if(MT4_process != Undefined):
        MT4_process.kill()
    else :
        return "MT4 aready close or tactical technic occur (MT4 did't start on standby MT4_process)(MT4_process Undefine)"
    return "close MT4 Sucsess"

@app.route("/check_statistic_data/<symbol>/<timeframe>/<from_date>/<to_date>/<depth>/<diviation>/<backstep>")#Update statistic data
def check_statistic_data(symbol, timeframe, from_date, to_date, depth, diviation, backstep):
    timeframeName_in_json = "timeframe."+timeframe
    zig_zagName_in_json = "zig_zag_parameter_"+depth+"_"+diviation+"_"+backstep
    cursor = db.forex_stat.find({"name":symbol},{"_id":0,timeframeName_in_json+"."+zig_zagName_in_json:1})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    timeframe_check_str = dumps(list_cursor)
    # some JSON:
    x =  '{ "status":"False"}'

    # parse x:
    y = json.loads(x)
    if(timeframe_check_str == '[{"timeframe": {"'+timeframe+'": {}}}]'):#check will true if could not find anything in given zigzag argument #[{'+'"'+timeframeName_in_json+'"'+': {}}]
        return y
    else:
        y["status"]="True"
        return y

@app.route("/update_statistic_data/<symbol>/<timeframe>/<from_date>/<to_date>/<depth>/<diviation>/<backstep>")#Update statistic data
def update_statistic_data(symbol, timeframe, from_date, to_date, depth, diviation, backstep):
    try:
        MT4_process.kill()
        print("Update statistic data")
    except Exception as e: 
        print("Update statistic data(in execption)")
    file_location = open_stragedytester_and_run_sexy_with_param.run(symbol, timeframe, from_date, to_date, depth, diviation, backstep)
    JSON_TAKER = Wrapper_and_calculate_raw_statistic_to_JSON.run(file_location, symbol, timeframe, from_date, to_date, depth, diviation, backstep)
    timeframeName_in_json = "timeframe."+timeframe
    zig_zagName_in_json = "zig_zag_parameter_"+depth+"_"+diviation+"_"+backstep
    timeframe_cut = JSON_TAKER["timeframe"][timeframe]
    zig_zag_parameter_cut = JSON_TAKER["timeframe"][timeframe][zig_zagName_in_json]

    #1      check if symbol exxist in database
    cursor = db.forex_stat.find({"name":symbol},{"_id":0,"name":1})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    symbol_checkk_str = dumps(list_cursor)
    if(symbol_checkk_str == '[]'): #check will true if could not find anything in given timeframe argument
        insert_log = db.forex_stat.insert_one(JSON_TAKER) #insert_log to keep track of the insert (what are you trying to say?)
        return JSON_TAKER
        return "No symbol_"+symbol+" exist insert symbol comsplete"
    
    #2      check if timframe in symbol exxist in database
    cursor = db.forex_stat.find({"name":symbol},{"_id":0,timeframeName_in_json:1})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    timeframe_check_str = dumps(list_cursor)
    if(timeframe_check_str == '[{"timeframe": {}}]'): #check will true if could not find anything in given argument
        #symbol_json = symbol+"."+"name"
        insert_log = db.forex_stat.update_one({ "name": symbol}, { "$set": { timeframeName_in_json: timeframe_cut }}) #insert_log to keep track of the insert (what are you trying to say?) #$set is use to insert or change exist data
        return JSON_TAKER
        return "No timframe_"+timeframe+" in exist symbol_"+symbol+" insert comsplete"
    
    #3      check if zigzag in symbol exxist in database
    cursor = db.forex_stat.find({"name":symbol},{"_id":0,timeframeName_in_json+"."+zig_zagName_in_json:1})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    timeframe_check_str = dumps(list_cursor)
    if(timeframe_check_str == '[{"timeframe": {"'+timeframe+'": {}}}]'): #check will true if could not find anything in given zigzag argument #[{'+'"'+timeframeName_in_json+'"'+': {}}]
        symbol_json = symbol+"."+"name"
        insert_log = db.forex_stat.update_one({ "name": symbol}, { "$set": { timeframeName_in_json+"."+zig_zagName_in_json: zig_zag_parameter_cut }}) #insert_log to keep track of the insert (what are you trying to say?) #$set is use to insert or change exist data
        return JSON_TAKER
        return "No zigzag"+depth+"_"+diviation+"_"+backstep+" in timframe_"+timeframe+" in exist symbol_"+symbol+" insert comsplete"
    elif(timeframe_check_str != '[{"timeframe": {"'+timeframe+'": {}}}]'): # Do the same as "if" did but a diference return message (this is an update actualy)
        symbol_json = symbol+"."+"name"
        insert_log = db.forex_stat.update_one({ "name": symbol}, { "$set": { timeframeName_in_json+"."+zig_zagName_in_json: zig_zag_parameter_cut }}) #insert_log to keep track of the insert (what are you trying to say?) #$set is use to insert or change exist data
        return JSON_TAKER
        return "Update zigzag"+depth+"_"+diviation+"_"+backstep+" in timframe_"+timeframe+" in exist symbol_"+symbol+" insert comsplete"
    
    return "last return log = "+timeframe_check_str+"\n"+'[{'+'"'+timeframeName_in_json+'"'+': {}}]' #did not exist

@app.route('/mongo_forexStat_request/<symbol>') #return ค่าตามพาท #debug
def mongo_forexStat_request(symbol): #ฟังชั่น ที่จะทำอะไรก็ตาม แล้ว return ค่ากลับ 
    cursor = db.forex_stat.find({"name":symbol},{"_id":0})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    json_data = dumps(list_cursor)
    return json_data

@app.route('/login/<username>/<password>',methods=['POST']) #login
def login(username, password):
    print(request.method)
    if request.method == 'POST':
        cursor = db.user.find({"name":username, "password":password},{"_id":0}) #[] what you looking for not here
        list_cursor = list(cursor)
        json_data = dumps(list_cursor)
        if json_data == "[]":
            return jsonify(status=False) #no username or wrong password status : false
        else:
            return jsonify(status=True)
        return jsonify(json_data)#debug

@app.route('/signin/<username>/<password>/<email>',methods = ['POST']) #login
def signin(username, password, email):
   if request.method == 'POST':
        cursor = db.user.find({"name":username},{"_id":0}) #[] what you looking for not here
        list_cursor = list(cursor)
        json_data = dumps(list_cursor)#string
        if json_data != "[]":
            return jsonify(status=False)
        else:
            JSON_MAKER = {
            "name": username,
            "password":password,
            "email": email
            }
            insert_log = db.user.insert_one(JSON_MAKER)
            return jsonify(status=True)

@app.route('/user/<username>',methods=['POST']) #login
def user(username):
    #print(request.method)
    if request.method == 'POST':
        cursor = db.user.find({"name":username},{"_id":0}) #[] mean what you looking for not here
        list_cursor = list(cursor)
        json_data = dumps(list_cursor)
        if json_data == "[]":
            x = [{
                "name":"not found"
            }]
            x = dumps(x)
            return x #no username found status : false
        else:
            return json_data #flask aready wrap the return with the json

@app.route('/alluser',methods=['POST']) #login
def alluser():
    print(request.method)
    if request.method == 'POST':
        cursor = db.user.find({},{"_id":0}) #[] what you looking for not here
        list_cursor = list(cursor)
        json_data = dumps(list_cursor)
        if json_data == "[]":
            x = [{
                "no username exist":"not found"
            }]
            x = dumps(x)
            return x #no username found or wrong password status : false
        else:
            return json_data #flask aready wrap the return with the json


@app.route('/email_cc/<username>/<new_email>',methods=['POST']) #login
def email_cc(username, new_email):
    print(request.method)
    if request.method == 'POST':
        cursor = db.user.find({"name":username},{"_id":0}) #[] what you looking for not here
        list_cursor = list(cursor)
        json_data = dumps(list_cursor)
        if json_data == "[]":
            x = [{
                "name":"not found"
            }]
            x = dumps(x)
            return x #no username found or wrong password status : false
        else:
            insert_log = db.user.update_one({ "name": username}, { "$set": { "email": new_email }})
            x = [{
                "status":"sucsess"
            }]
            x = dumps(x)
            return x #flask aready wrap the return with the json

@app.route('/psw_cc/<username>/<psw>/<new_psw>',methods=['POST']) #login
def psw_cc(username, psw, new_psw):
    print(request.method)
    if request.method == 'POST':
        cursor = db.user.find({"name":username, "password":psw},{"_id":0}) #[] what you looking for not here
        list_cursor = list(cursor)
        json_data = dumps(list_cursor)
        if json_data == "[]":
            x = [{
                "status":"invalid"
            }]
            x = dumps(x)
            return x #no username not found or wrong password status : false
        else:
            insert_log = db.user.update_one({ "name": username}, { "$set": { "password": new_psw }})
            x = [{
                "status":"sucsess"
            }]
            x = dumps(x)
            return x #flask aready wrap the return with the json

@app.route('/psw_cc_forget/<username>/<new_psw>',methods=['POST']) #login
def psw_cc_forget(username, new_psw):
    print(request.method)
    if request.method == 'POST':
        cursor = db.user.find({"name":username},{"_id":0}) #[] what you looking for not here
        list_cursor = list(cursor)
        json_data = dumps(list_cursor)
        if json_data == "[]":
            x = [{
                "status":"invalid"
            }]
            x = dumps(x)
            return x #no username not found status : false
        else:
            insert_log = db.user.update_one({ "name": username}, { "$set": { "password": new_psw }})
            x = [{
                "status":"sucsess"
            }]
            x = dumps(x)
            return x #flask aready wrap the return with the json

@app.route('/send_email/<username>',methods=['POST']) #login
def send_email(username):
    #check if user exist first
    cursor = db.user.find({"name":username},{"_id":0}) #[] mean what you looking for not here
    list_cursor = list(cursor)
    json_data = dumps(list_cursor)
    if json_data == "[]":
        x = [{
            "status":"not found"
        }]
        x = dumps(x)
        return x #no username found status : false
    #
    json_ = json.loads(json_data) #no need but leave it here in practice
    email = list_cursor[0]["email"]

    server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    sender_email = "tsender14@gmail.com"
    password = "forexforsendertest_4582"
    subject = 'forex_web_project greengrapth password change' # The subject line aka header
    messageHTML = '<p>คุณได้ทำการขอเปลี่ยนรหัสผ่านจากเว็บไซต์ forex green graph <a href="http://localhost:3000/Index/Resetpassword/">click here<a> เพื่อทำการเปลี่ยนรหัส' #server change
    #messagePlain = 'Visit nitratine.net for some great tutorials and projects!'

    msg = MIMEMultipart('alternative')
    msg['From'] = sender_email
    msg['To'] = email
    msg['Subject'] = subject

    # Attach both plain and HTML versions
    #msg.attach(MIMEText(messagePlain, 'plain'))
    msg.attach(MIMEText(messageHTML, 'html'))
    text = msg.as_string()

    server.login(sender_email, password)
    server.sendmail(sender_email, email, text)
    server.quit()
    ########################
    x = [{
    "status":"sucsess"
    }]
    x = dumps(x)
    return x #flask aready wrap the return with the json

@app.route('/mongo_test_return') #return ค่าตามพาท #debug
def mongo_test_return(): #ฟังชั่น ที่จะทำอะไรก็ตาม แล้ว return ค่ากลับ 
    cursor = db.forex_stat.find({},{"_id":0,"pop":1})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    json_data = dumps(list_cursor)
    print("pop "+json_data)
    return json_data
#
#ทดลอง 
@app.route('/mongo_test') #return ค่าตามพาท #debug
def mongo_test(): #ฟังชั่น ที่จะทำอะไรก็ตาม แล้ว return ค่ากลับ 
    cursor = db.mycollection.find({},{"_id":0,"x": 1})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    json_data = dumps(list_cursor)
    return json_data

@app.route('/mongo_test_insert') #ลองสัง insert ใน Mongo ผ่าน flask #debug
def mongo_test_insert(): #ฟังชั่น ที่จะทำอะไรก็ตาม แล้ว return ค่ากลับ 
    comment_doc = { 'movie_id' : "movie_id", 'name' : "name", 'email' : "email",'text' : "comment", 'date' : "date"} #dict type
    db.mycollection.insert_one(comment_doc) #insert_one parameter require "dict tpye"
    return "success"

@app.route('/mongo_forex_stat_insert') #ลองสัง insert ใน Mongo ผ่าน flask
def mongo_forex_stat_insert(): #ฟังชั่น ที่จะทำอะไรก็ตาม แล้ว return ค่ากลับ 
    stat_forex_in = stat_forex #เขียนไว้ให้อ่านง่ายๆ
    db.forex_stat.insert_one(stat_forex_in) #insert_one parameter require "dict tpye"
    return "put forex sat data in mongoDB success"

@app.route("/test_for_json_export")#debug
def hello_world():
    x =  '{ "name":"John", "age":30, "city":"New York"}'

    # parse x:
    y = json.loads(x) #json.load(s) return dict tpye
    return y

@app.route('/mongo_test_forex_data') #return ค่าตามพาท #หาค่าจากใน mongo
def mongo_test_forex_data(): #ฟังชั่น ที่จะทำอะไรก็ตาม แล้ว return ค่ากลับ 
    cursor = db.forex_stat.find({"forexName.name": "EURUSD(for example)"},{"_id":0})  #ค่าจาก Database  ###find({},{"_id":0,"x": 1}) first argument aka {} mean find everything and second argument {"_id":0,"x": 1} define what feel you want "1" mean yes "0" mean no
    #convert "CURSOR" type that we have after request to mongoDB to a list so we can return and display them correctly
    list_cursor = list(cursor)
    json_data = dumps(list_cursor)
    return json_data
#
##

class DWX_ZeroMQ_Connector():

    """
    Setup ZeroMQ -> MetaTrader Connector
    """
    def __init__(self, 
                 _ClientID='dwx-zeromq',    # Unique ID for this client
                 _host='localhost',         # Host to connect to
                 _protocol='tcp',           # Connection protocol
                 _PUSH_PORT=32768,          # Port for Sending commands
                 _PULL_PORT=32769,          # Port for Receiving responses
                 _SUB_PORT=32770,           # Port for Subscribing for prices
                 _delimiter=';',
                 _pulldata_handlers = [],   # Handlers to process data received through PULL port.
                 _subdata_handlers = [],    # Handlers to process data received through SUB port.
                 _verbose=True,             # String delimiter
                 _poll_timeout=1000,        # ZMQ Poller Timeout (ms)
                 _sleep_delay=0.001,        # 1 ms for time.sleep()
                 _monitor=False):           # Experimental ZeroMQ Socket Monitoring
    
        ######################################################################
        
        # Strategy Status (if this is False, ZeroMQ will not listen for data)
        self._ACTIVE = True
        
        # Client ID
        self._ClientID = _ClientID
        
        # ZeroMQ Host
        self._host = _host
        
        # Connection Protocol
        self._protocol = _protocol

        # ZeroMQ Context
        self._ZMQ_CONTEXT = zmq.Context()
        
        # TCP Connection URL Template
        self._URL = self._protocol + "://" + self._host + ":"
        
        # Handlers for received data (pull and sub ports)
        self._pulldata_handlers = _pulldata_handlers
        self._subdata_handlers = _subdata_handlers

        # Ports for PUSH, PULL and SUB sockets respectively
        self._PUSH_PORT = _PUSH_PORT
        self._PULL_PORT = _PULL_PORT
        self._SUB_PORT = _SUB_PORT
        
        # Create Sockets
        self._PUSH_SOCKET = self._ZMQ_CONTEXT.socket(zmq.PUSH)
        self._PUSH_SOCKET.setsockopt(zmq.SNDHWM, 1)        
        self._PUSH_SOCKET_STATUS = {'state': True, 'latest_event': 'N/A'}
        
        self._PULL_SOCKET = self._ZMQ_CONTEXT.socket(zmq.PULL)
        self._PULL_SOCKET.setsockopt(zmq.RCVHWM, 1)
        self._PULL_SOCKET_STATUS = {'state': True, 'latest_event': 'N/A'}
        
        self._SUB_SOCKET = self._ZMQ_CONTEXT.socket(zmq.SUB)
        
        # Bind PUSH Socket to send commands to MetaTrader
        self._PUSH_SOCKET.connect(self._URL + str(self._PUSH_PORT))
        print("[INIT] Ready to send commands to METATRADER (PUSH): " + str(self._PUSH_PORT))
        
        # Connect PULL Socket to receive command responses from MetaTrader
        self._PULL_SOCKET.connect(self._URL + str(self._PULL_PORT))
        print("[INIT] Listening for responses from METATRADER (PULL): " + str(self._PULL_PORT))
        
        # Connect SUB Socket to receive market data from MetaTrader
        print("[INIT] Listening for market data from METATRADER (SUB): " + str(self._SUB_PORT))
        self._SUB_SOCKET.connect(self._URL + str(self._SUB_PORT))
        
        # Initialize POLL set and register PULL and SUB sockets
        self._poller = zmq.Poller()
        self._poller.register(self._PULL_SOCKET, zmq.POLLIN)
        self._poller.register(self._SUB_SOCKET, zmq.POLLIN)
        
        # Start listening for responses to commands and new market data
        self._string_delimiter = _delimiter
        
        self._main_string_delimiter = ':|:'
        
        # BID/ASK Market Data Subscription Threads ({SYMBOL: Thread})
        self._MarketData_Thread = None
        
        # Socket Monitor Threads
        self._PUSH_Monitor_Thread = None
        self._PULL_Monitor_Thread = None
        
        # Market Data Dictionary by Symbol (holds tick data)
        self._Market_Data_DB = {}   # {SYMBOL: {TIMESTAMP: (BID, ASK)}}
        # My_edit _Market_Data_DB edit
        self._Market_Data_DB_last_tick_only = {} #containt just like the original but only the last tick of each only
        
        # History Data Dictionary by Symbol (holds historic data of the last HIST request for each symbol)
        self._History_DB = {}   # {SYMBOL_TF: [{'time': TIME, 'open': OPEN_PRICE, 'high': HIGH_PRICE, 
                                #               'low': LOW_PRICE, 'close': CLOSE_PRICE, 'tick_volume': TICK_VOLUME, 
                                #               'spread': SPREAD, 'real_volume': REAL_VOLUME}, ...]}
                                
        # Temporary Order STRUCT for convenience wrappers later.
        self.temp_order_dict = self._generate_default_order_dict()
        
        # Thread returns the most recently received DATA block here
        self._thread_data_output = None
        
        # Verbosity
        self._verbose = _verbose
        
        # ZMQ Poller Timeout
        self._poll_timeout = _poll_timeout
        
        # Global Sleep Delay
        self._sleep_delay = _sleep_delay
        
        # Begin polling for PULL / SUB data
        self._MarketData_Thread = Thread(target=self._DWX_ZMQ_Poll_Data_, 
                                         args=(self._string_delimiter,
                                               self._poll_timeout,))
        self._MarketData_Thread.daemon = True
        self._MarketData_Thread.start()
        
        ###########################################
        # Enable/Disable ZeroMQ Socket Monitoring #
        ###########################################
        if _monitor == True:
            
            # ZeroMQ Monitor Event Map
            self._MONITOR_EVENT_MAP = {}
            
            print("\n[KERNEL] Retrieving ZeroMQ Monitor Event Names:\n")
            
            for name in dir(zmq):
                if name.startswith('EVENT_'):
                    value = getattr(zmq, name)
                    print(f"{value}\t\t:\t{name}")
                    self._MONITOR_EVENT_MAP[value] = name
            
            print("\n[KERNEL] Socket Monitoring Config -> DONE!\n")
        
            # Disable PUSH/PULL sockets and let MONITOR events control them.
            self._PUSH_SOCKET_STATUS['state'] = False
            self._PULL_SOCKET_STATUS['state'] = False
            
            # PUSH
            self._PUSH_Monitor_Thread = Thread(target=self._DWX_ZMQ_EVENT_MONITOR_, 
                                               args=("PUSH",
                                                     self._PUSH_SOCKET.get_monitor_socket(),))
            
            self._PUSH_Monitor_Thread.daemon = True
            self._PUSH_Monitor_Thread.start()
            
            # PULL
            self._PULL_Monitor_Thread = Thread(target=self._DWX_ZMQ_EVENT_MONITOR_, 
                                               args=("PULL",
                                                     self._PULL_SOCKET.get_monitor_socket(),))
            
            self._PULL_Monitor_Thread.daemon = True
            self._PULL_Monitor_Thread.start()
       
    ##########################################################################
    
    def _DWX_ZMQ_SHUTDOWN_(self):
        
        # Set INACTIVE
        self._ACTIVE = False
        
        # Get all threads to shutdown
        if self._MarketData_Thread is not None:
            self._MarketData_Thread.join()
            
        if self._PUSH_Monitor_Thread is not None:
            self._PUSH_Monitor_Thread.join()
            
        if self._PULL_Monitor_Thread is not None:            
            self._PULL_Monitor_Thread.join()
        
        # Unregister sockets from Poller
        self._poller.unregister(self._PULL_SOCKET)
        self._poller.unregister(self._SUB_SOCKET)
        print("\n++ [KERNEL] Sockets unregistered from ZMQ Poller()! ++")
        
        # Terminate context 
        self._ZMQ_CONTEXT.destroy(0)
        print("\n++ [KERNEL] ZeroMQ Context Terminated.. shut down safely complete! :)")
        
    ##########################################################################
    
    """
    Set Status (to enable/disable strategy manually)
    """
    def _setStatus(self, _new_status=False):
    
        self._ACTIVE = _new_status
        print("\n**\n[KERNEL] Setting Status to {} - Deactivating Threads.. please wait a bit.\n**".format(_new_status))
                
    ##########################################################################
    
    """
    Function to send commands to MetaTrader (PUSH)
    """
    def remote_send(self, _socket, _data):
        
        if self._PUSH_SOCKET_STATUS['state'] == True:
            try:
                _socket.send_string(_data, zmq.DONTWAIT)
            except zmq.error.Again:
                print("\nResource timeout.. please try again.")
                sleep(self._sleep_delay)
        else:
            print('\n[KERNEL] NO HANDSHAKE ON PUSH SOCKET.. Cannot SEND data')
      
    ##########################################################################
    
    def _get_response_(self):
        return self._thread_data_output
    
    ##########################################################################
    
    def _set_response_(self, _resp=None):
        self._thread_data_output = _resp
    
    ##########################################################################
    
    def _valid_response_(self, _input='zmq'):
        
        # Valid data types
        _types = (dict,DataFrame)
        
        # If _input = 'zmq', assume self._zmq._thread_data_output
        if isinstance(_input, str) and _input == 'zmq':
            return isinstance(self._get_response_(), _types)
        else:
            return isinstance(_input, _types)
            
        # Default
        return False
    
    ##########################################################################
    
    """
    Function to retrieve data from MetaTrader (PULL)
    """
    def remote_recv(self, _socket):
        
        if self._PULL_SOCKET_STATUS['state'] == True:
            try:
                msg = _socket.recv_string(zmq.DONTWAIT)
                return msg
            except zmq.error.Again:
                print("\nResource timeout.. please try again.")
                sleep(self._sleep_delay)
        else:
            print('\r[KERNEL] NO HANDSHAKE ON PULL SOCKET.. Cannot READ data', end='', flush=True)
            
        return None
        
    ##########################################################################
    
    # Convenience functions to permit easy trading via underlying functions.
    
    # OPEN ORDER
    def _DWX_MTX_NEW_TRADE_(self, _order=None):
        
        if _order is None:
            _order = self._generate_default_order_dict()
        
        # Execute
        self._DWX_MTX_SEND_COMMAND_(**_order)
        
    # MODIFY ORDER
    # _SL and _TP given in points. _price is only used for pending orders. 
    def _DWX_MTX_MODIFY_TRADE_BY_TICKET_(self, _ticket, _SL, _TP, _price=0):
        
        try:
            self.temp_order_dict['_action'] = 'MODIFY'
            self.temp_order_dict['_ticket'] = _ticket
            self.temp_order_dict['_SL'] = _SL
            self.temp_order_dict['_TP'] = _TP
            self.temp_order_dict['_price'] = _price
            
            # Execute
            self._DWX_MTX_SEND_COMMAND_(**self.temp_order_dict)
            
        except KeyError:
            print("[ERROR] Order Ticket {} not found!".format(_ticket))
    
    # CLOSE ORDER
    def _DWX_MTX_CLOSE_TRADE_BY_TICKET_(self, _ticket):
        
        try:
            self.temp_order_dict['_action'] = 'CLOSE'
            self.temp_order_dict['_ticket'] = _ticket
            
            # Execute
            self._DWX_MTX_SEND_COMMAND_(**self.temp_order_dict)
            
        except KeyError:
            print("[ERROR] Order Ticket {} not found!".format(_ticket))
            
    # CLOSE PARTIAL
    def _DWX_MTX_CLOSE_PARTIAL_BY_TICKET_(self, _ticket, _lots):
        
        try:
            self.temp_order_dict['_action'] = 'CLOSE_PARTIAL'
            self.temp_order_dict['_ticket'] = _ticket
            self.temp_order_dict['_lots'] = _lots
            
            # Execute
            self._DWX_MTX_SEND_COMMAND_(**self.temp_order_dict)
            
        except KeyError:
            print("[ERROR] Order Ticket {} not found!".format(_ticket))
            
    # CLOSE MAGIC
    def _DWX_MTX_CLOSE_TRADES_BY_MAGIC_(self, _magic):
        
        try:
            self.temp_order_dict['_action'] = 'CLOSE_MAGIC'
            self.temp_order_dict['_magic'] = _magic
            
            # Execute
            self._DWX_MTX_SEND_COMMAND_(**self.temp_order_dict)
            
        except KeyError:
            pass
    
    # CLOSE ALL TRADES
    def _DWX_MTX_CLOSE_ALL_TRADES_(self):
        
        try:
            self.temp_order_dict['_action'] = 'CLOSE_ALL'
            
            # Execute
            self._DWX_MTX_SEND_COMMAND_(**self.temp_order_dict)
            
        except KeyError:
            pass
        
    # GET OPEN TRADES
    def _DWX_MTX_GET_ALL_OPEN_TRADES_(self):
        
        try:
            self.temp_order_dict['_action'] = 'GET_OPEN_TRADES'
                        
            # Execute
            self._DWX_MTX_SEND_COMMAND_(**self.temp_order_dict)
            
        except KeyError:
            pass
    
    # DEFAULT ORDER DICT
    def _generate_default_order_dict(self):
        return({'_action': 'OPEN',
                  '_type': 0,
                  '_symbol': 'EURUSD',
                  '_price': 0.0,
                  '_SL': 500, # SL/TP in POINTS, not pips.
                  '_TP': 500,
                  '_comment': self._ClientID,
                  '_lots': 0.01,
                  '_magic': 123456,
                  '_ticket': 0})
        
    ##########################################################################

    """
    Function to construct messages for sending HIST commands to MetaTrader

    Because of broker GMT offset _end time might have to be modified.
    """
    def _DWX_MTX_SEND_HIST_REQUEST_(self,
                                 _symbol='EURUSD',
                                 _timeframe=1440,
                                 _start='2020.01.01 00:00:00',
                                 _end=Timestamp.now().strftime('%Y.%m.%d %H:%M:00')):
                                 #_end='2019.01.04 17:05:00'):
        
        _msg = "{};{};{};{};{}".format('HIST',
                                     _symbol,
                                     _timeframe,
                                     _start,
                                     _end)

        # Send via PUSH Socket
        self.remote_send(self._PUSH_SOCKET, _msg)
    
    
    ##########################################################################
    """
    Function to construct messages for sending TRACK_PRICES commands to 
    MetaTrader for real-time price updates
    """
    def _DWX_MTX_SEND_TRACKPRICES_REQUEST_(self,
                                 _symbols=['EURUSD']):
        _msg = 'TRACK_PRICES'
        for s in _symbols:
          _msg = _msg + ";{}".format(s)

        # Send via PUSH Socket
        self.remote_send(self._PUSH_SOCKET, _msg)
    
    
    ##########################################################################
    """
    Function to construct messages for sending TRACK_RATES commands to 
    MetaTrader for OHLC
    """
    def _DWX_MTX_SEND_TRACKRATES_REQUEST_(self,
                                 _instruments=[('EURUSD_M1', 'EURUSD',1)]):
        _msg = 'TRACK_RATES'                                 
        for i in _instruments:
          _msg = _msg + ";{};{}".format(i[1], i[2])
          
        # Send via PUSH Socket
        self.remote_send(self._PUSH_SOCKET, _msg)
    
    
    ##########################################################################
    
    
    ##########################################################################
    """
    Function to construct messages for sending Trade commands to MetaTrader
    """
    def _DWX_MTX_SEND_COMMAND_(self, _action='OPEN', _type=0,
                                 _symbol='EURUSD', _price=0.0,
                                 _SL=50, _TP=50, _comment="Python-to-MT",
                                 _lots=0.01, _magic=123456, _ticket=0):
        
        _msg = "{};{};{};{};{};{};{};{};{};{};{}".format('TRADE',_action,_type,
                                                         _symbol,_price,
                                                         _SL,_TP,_comment,
                                                         _lots,_magic,
                                                         _ticket)
        
        # Send via PUSH Socket
        self.remote_send(self._PUSH_SOCKET, _msg)
        
        """
         compArray[0] = TRADE or DATA
         compArray[1] = ACTION (e.g. OPEN, MODIFY, CLOSE)
         compArray[2] = TYPE (e.g. OP_BUY, OP_SELL, etc - only used when ACTION=OPEN)
         
         For compArray[0] == DATA, format is: 
             DATA|SYMBOL|TIMEFRAME|START_DATETIME|END_DATETIME
         
         // ORDER TYPES: 
         // https://docs.mql4.com/constants/tradingconstants/orderproperties
         
         // OP_BUY = 0
         // OP_SELL = 1
         // OP_BUYLIMIT = 2
         // OP_SELLLIMIT = 3
         // OP_BUYSTOP = 4
         // OP_SELLSTOP = 5
         
         compArray[3] = Symbol (e.g. EURUSD, etc.)
         compArray[4] = Open/Close Price (ignored if ACTION = MODIFY)
         compArray[5] = SL
         compArray[6] = TP
         compArray[7] = Trade Comment
         compArray[8] = Lots
         compArray[9] = Magic Number
         compArray[10] = Ticket Number (MODIFY/CLOSE)
         """
        # pass
    
    ##########################################################################
    
    """
    Function to check Poller for new reponses (PULL) and market data (SUB)
    """
    
    def _DWX_ZMQ_Poll_Data_(self, 
                           string_delimiter=';',
                           poll_timeout=1000):
        
        while self._ACTIVE:
            
            sleep(self._sleep_delay) # poll timeout is in ms, sleep() is s.
            
            sockets = dict(self._poller.poll(poll_timeout))
            
            # Process response to commands sent to MetaTrader
            if self._PULL_SOCKET in sockets and sockets[self._PULL_SOCKET] == zmq.POLLIN:
                
                if self._PULL_SOCKET_STATUS['state'] == True:
                    try:
                        
                        # msg = self._PULL_SOCKET.recv_string(zmq.DONTWAIT)
                        msg = self.remote_recv(self._PULL_SOCKET)
                        
                        # If data is returned, store as pandas Series
                        if msg != '' and msg != None:
                            
                            try: 
                                _data = eval(msg)
                                if '_action' in _data and _data['_action'] == 'HIST':
                                    _symbol = _data['_symbol']
                                    if '_data' in _data.keys():
                                        if _symbol not in self._History_DB.keys():
                                            self._History_DB[_symbol] = {}
                                        self._History_DB[_symbol] = _data['_data']
                                    else:
                                        print('No data found. MT4 often needs multiple requests when accessing data of symbols without open charts.')
                                        print('message: ' + msg)
                                
                                # invokes data handlers on pull port
                                for hnd in self._pulldata_handlers:
                                    hnd.onPullData(_data)
                                
                                self._thread_data_output = _data
                                self._thread_data_output_HIST = _data
                                if self._verbose == False:
                                    print(_data) # default logic
                                    
                            except Exception as ex:
                                _exstr = "Exception Type {0}. Args:\n{1!r}"
                                _msg = _exstr.format(type(ex).__name__, ex.args)
                                print(_msg)
                   
                    except zmq.error.Again:
                        pass # resource temporarily unavailable, nothing to print
                    except ValueError:
                        pass # No data returned, passing iteration.
                    except UnboundLocalError:
                        pass # _symbol may sometimes get referenced before being assigned.
                
                else:
                    print('\r[KERNEL] NO HANDSHAKE on PULL SOCKET.. Cannot READ data.', end='', flush=True)
            
            # Receive new market data from MetaTrader
            if self._SUB_SOCKET in sockets and sockets[self._SUB_SOCKET] == zmq.POLLIN:
                
                try:
                    msg = self._SUB_SOCKET.recv_string(zmq.DONTWAIT)
                    
                    if msg != "":

                        _timestamp = str(Timestamp.now('UTC'))[:-6]
                        _symbol, _data = msg.split(self._main_string_delimiter)
                        if len(_data.split(string_delimiter)) == 2:
                            _bid, _ask = _data.split(string_delimiter)   
                                                                   
                        
                            if not self._verbose:
                                print("\n[" + _symbol + "] " + _timestamp + " (" + _bid + "/" + _ask + ") BID/ASK"+"  "+msg) # This is what you see when forex bid/ask requesst          
                    
                            # Update Market Data DB
                            if _symbol not in self._Market_Data_DB.keys():
                                self._Market_Data_DB[_symbol] = {}
                            
                            ##self._Market_Data_DB[_symbol][_timestamp] = (float(_bid), float(_ask)) #defualt that i disable
                            # My_edit
                            try: #try if error mean first initial
                                self._Market_Data_DB_last_tick_only[_symbol]["previous"] = self._Market_Data_DB_last_tick_only[_symbol]["stream"] #to see if error
                            except Exception as e:#if error(first initial) we set previous the same as stream
                                self._Market_Data_DB_last_tick_only[_symbol] = {}
                                self._Market_Data_DB_last_tick_only[_symbol]["previous"] = (_bid, _ask, _timestamp)

                            self._Market_Data_DB_last_tick_only[_symbol]["stream"] = (_bid, _ask, _timestamp)
                            #
                            # My_edit
                            #socketio.emit('test','I am test')
                            selected_symbol = {}
                            selected_symbol[_symbol] = self._Market_Data_DB_last_tick_only[_symbol]
                            room = _symbol+"_room" # _symbol ~ EURUSDgmp
                            socketio.emit('forex_request_dynamic_private', selected_symbol, to=room)
                            #print('i am in stream')
                            #

                        elif len(_data.split(string_delimiter)) == 8:
                            _time, _open, _high, _low, _close, _tick_vol, _spread, _real_vol = _data.split(string_delimiter)
                            if self._verbose:
                                print("\n[" + _symbol + "] " + _timestamp + " (" + _time + "/" + _open + "/" + _high + "/" + _low + "/" + _close + "/" + _tick_vol + "/" + _spread + "/" + _real_vol + ") TIME/OPEN/HIGH/LOW/CLOSE/TICKVOL/SPREAD/VOLUME")                    
                            # Update Market Rate DB
                            if _symbol not in self._Market_Data_DB.keys():
                                self._Market_Data_DB[_symbol] = {}
                            self._Market_Data_DB[_symbol][_timestamp] = (int(_time), float(_open), float(_high), float(_low), float(_close), int(_tick_vol), int(_spread), int(_real_vol))

                        # invokes data handlers on sub port
                        for hnd in self._subdata_handlers:
                            hnd.onSubData(msg)

                except zmq.error.Again:
                    pass # resource temporarily unavailable, nothing to print
                except ValueError:
                    pass # No data returned, passing iteration.
                except UnboundLocalError:
                    pass # _symbol may sometimes get referenced before being assigned.
                    
        print("\n++ [KERNEL] _DWX_ZMQ_Poll_Data_() Signing Out ++")
                
    ##########################################################################
    
    """
    Function to subscribe to given Symbol's BID/ASK feed from MetaTrader
    """
    def _DWX_MTX_SUBSCRIBE_MARKETDATA_(self, 
                                       _symbol='EURUSD'):

        # Subscribe to SYMBOL first.
        self._SUB_SOCKET.setsockopt_string(zmq.SUBSCRIBE, _symbol)
        
        print("[KERNEL] Subscribed to {} BID/ASK updates. See self._Market_Data_DB.".format(_symbol))
    
    """
    Function to unsubscribe to given Symbol's BID/ASK feed from MetaTrader
    """
    def _DWX_MTX_UNSUBSCRIBE_MARKETDATA_(self, _symbol):
        
        self._SUB_SOCKET.setsockopt_string(zmq.UNSUBSCRIBE, _symbol)
        print("\n**\n[KERNEL] Unsubscribing from " + _symbol + "\n**\n")
        
        
    """
    Function to unsubscribe from ALL MetaTrader Symbols
    """
    def _DWX_MTX_UNSUBSCRIBE_ALL_MARKETDATA_REQUESTS_(self):
        
        # 31-07-2019 12:22 CEST
        for _symbol in self._Market_Data_DB.keys():
            self._DWX_MTX_UNSUBSCRIBE_MARKETDATA_(_symbol=_symbol)
        
    ##########################################################################
    
    def _DWX_ZMQ_EVENT_MONITOR_(self, 
                                socket_name, 
                                monitor_socket):
        
        # 05-08-2019 11:21 CEST
        while self._ACTIVE:
            
            sleep(self._sleep_delay) # poll timeout is in ms, sleep() is s.
            
            # while monitor_socket.poll():
            while monitor_socket.poll(self._poll_timeout):
                
                try:
                    evt = recv_monitor_message(monitor_socket, zmq.DONTWAIT)
                    evt.update({'description': self._MONITOR_EVENT_MAP[evt['event']]})
                    
                    # print(f"\r[{socket_name} Socket] >> {evt['description']}", end='', flush=True)
                    print(f"\n[{socket_name} Socket] >> {evt['description']}")
                    
                    # Set socket status on HANDSHAKE
                    if evt['event'] == 4096:        # EVENT_HANDSHAKE_SUCCEEDED
                        
                        if socket_name == "PUSH":
                            self._PUSH_SOCKET_STATUS['state'] = True
                            self._PUSH_SOCKET_STATUS['latest_event'] = 'EVENT_HANDSHAKE_SUCCEEDED'
                            
                        elif socket_name == "PULL":
                            self._PULL_SOCKET_STATUS['state'] = True
                            self._PULL_SOCKET_STATUS['latest_event'] = 'EVENT_HANDSHAKE_SUCCEEDED'
                            
                        # print(f"\n[{socket_name} Socket] >> ..ready for action!\n")
                            
                    else:    
                        # Update 'latest_event'
                        if socket_name == "PUSH":
                            self._PUSH_SOCKET_STATUS['state'] = False
                            self._PUSH_SOCKET_STATUS['latest_event'] = evt['description']
                            
                        elif socket_name == "PULL":
                            self._PULL_SOCKET_STATUS['state'] = False
                            self._PULL_SOCKET_STATUS['latest_event'] = evt['description']
                
                    if evt['event'] == zmq.EVENT_MONITOR_STOPPED:
                        
                        # Reinitialize the socket
                        if socket_name == "PUSH":
                            monitor_socket = self._PUSH_SOCKET.get_monitor_socket()
                        elif socket_name == "PULL":
                            monitor_socket = self._PULL_SOCKET.get_monitor_socket()
                        
                except Exception as ex:
                    _exstr = "Exception Type {0}. Args:\n{1!r}"
                    _msg = _exstr.format(type(ex).__name__, ex.args)
                    print(_msg)
               
        # Close Monitor Socket
        monitor_socket.close()
        
        print(f"\n++ [KERNEL] {socket_name} _DWX_ZMQ_EVENT_MONITOR_() Signing Out ++")
            
    ##########################################################################
    
    def _DWX_ZMQ_HEARTBEAT_(self):
        self.remote_send(self._PUSH_SOCKET, "HEARTBEAT;")
        
    ##########################################################################

##############################################################################

def _DWX_ZMQ_CLEANUP_(_name='DWX_ZeroMQ_Connector',
                      _globals=globals(), 
                      _locals=locals()):
    
    print('\n++ [KERNEL] Initializing ZeroMQ Cleanup.. if nothing appears below, no cleanup is necessary, otherwise please wait..')
    try:
        _class = _globals[_name]
        _locals = list(_locals.items())
        
        for _func, _instance in _locals:
            if isinstance(_instance, _class): 
                print(f'\n++ [KERNEL] Found & Destroying {_func} object before __init__()')
                eval(_func)._DWX_ZMQ_SHUTDOWN_()
                print('\n++ [KERNEL] Cleanup Complete -> OK to initialize DWX_ZeroMQ_Connector if NETSTAT diagnostics == True. ++\n')
           
    except Exception as ex:
        
        _exstr = "Exception Type {0}. Args:\n{1!r}"
        _msg = _exstr.format(type(ex).__name__, ex.args)
            
        if 'KeyError' in _msg:
            print('\n++ [KERNEL] Cleanup Complete -> OK to initialize DWX_ZeroMQ_Connector. ++\n')
        else:
            print(_msg)
            
##############################################################################


#### SOCKET ###########
import datetime

_zmq = DWX_ZeroMQ_Connector()

##### 1
@app.route("/hist_forex_request/<forex_name>/<timeframe>")# This is belong to flask
def hist_forex_request(forex_name,timeframe):
    #dict of the timeframe
    _timeframe_dict = {
        "M1" : 1,
        "M5" : 5,
        "M15" : 15,
        "M30" : 30,
        "H1" : 60,
        "H4" : 240,
        "D1" : 1440
    }

    #dict of timeframe_token   #this represent how much day we gonna request for hist judge by timeframe   #we need like 100 sample for each timeframe
    _timeframe_token = {
        "M1" : 1, #days
        "M5" : 5, #days
        "M15" : 15, #days
        "M30" : 10, #days
        "H1" : 5, #days
        "H4" : 17, #days
        "D1" : 100 #days
    }
    time_token = _timeframe_token[timeframe]

    #date weekly
    x = datetime.datetime.now()
    days = datetime.timedelta(days=time_token)
    weekly = x - days
    weekly = weekly.strftime('%Y.%m.%d')
    weekly += " 00:00:00"

    _zmq._DWX_MTX_SEND_HIST_REQUEST_(_symbol=forex_name, _timeframe=_timeframe_dict[timeframe], _start=weekly)
    # some JSON:
    x =  '{}'

    # parse x:
    forex_hist = json.loads(x)
    #forex_timeframe
    forex_timeframe = forex_name+"_"+timeframe
    try:
        forex_hist[forex_name] = _zmq._History_DB[forex_timeframe]
        forex_hist["timeframe"] = timeframe
        forex_hist["timedelta"] = time_token
        #print(forex_hist)
        return forex_hist
    except:
        #print("try again")
        return "try again"

##### 2
########### use in (2 and 3)
all_request = {}
all_request["arr_forexname"] = []
all_request["arr_quantity"] = {}
###########
@socketio.on('forex_request_dynamic_private')##I use this? #yes
def forex_request_dynamic(forex_name, socketID):
    #print(forex_name, socketID)
    room = forex_name+"_room" # _symbol ~ EURUSDgmp #simply join the room of the specific symbol
    join_room(room)
    try: #try if error mean first initial
        all_request["arr_quantity"][forex_name] += 1
    except Exception as e:#if error(first initial) we set previous the same as stream
        all_request["arr_quantity"][forex_name] = 1
    
    if forex_name not in all_request["arr_forexname"]:
        all_request["arr_forexname"].append(forex_name)
    print(all_request["arr_forexname"])
    print(all_request["arr_quantity"][forex_name])
    _zmq._DWX_MTX_SUBSCRIBE_MARKETDATA_(forex_name)
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('EURUSDd')
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('AUDCADd')
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('GBPUSDd')
    _zmq._DWX_MTX_SEND_TRACKPRICES_REQUEST_(all_request["arr_forexname"])
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('EURUSDd')
    #print(_zmq._thread_data_output)
    #print(_zmq._get_response_())
    #print('forex request success')
    #emit('forex_request_dynamic_private', _zmq._Market_Data_DB_last_tick_only)

##### 3
@socketio.on("left_room")# test to close all trace and yes it work!
def left_room(forex_name):
    room = forex_name+"_room" # _symbol ~ EURUSDgmp #simply join the room of the specific symbol
    leave_room(room)
    try: #try if error mean first initial
        all_request["arr_quantity"][forex_name] -= 1
    except Exception as e:#if error(first initial) we set previous the same as stream
        all_request["arr_quantity"][forex_name] = "NO this is error"

    if all_request["arr_quantity"][forex_name] == 0 :
        all_request["arr_forexname"].remove(forex_name)

    print("array in leave_room after check zeo = ",all_request["arr_forexname"], " :: forex_name = ",forex_name)
    _zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_(forex_name)
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('EURUSDd')
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('AUDCADd')
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('GBPUSDd')
    _zmq._DWX_MTX_SEND_TRACKPRICES_REQUEST_(all_request["arr_forexname"])
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('EURUSDd')
    #print(_zmq._thread_data_output)
    #print(_zmq._get_response_())
    #print('forex request success')
    # some JSON:

##### 4 this is flask not socket
@app.route("/forex_shutdown")# test to close all trace and yes it work!
def forex_shutdown():
    _zmq._DWX_MTX_UNSUBSCRIBE_ALL_MARKETDATA_REQUESTS_()
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('EURUSDd')
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('AUDCADd')
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('GBPUSDd')
    _zmq._DWX_MTX_SEND_TRACKPRICES_REQUEST_([])
    #_zmq._DWX_MTX_UNSUBSCRIBE_MARKETDATA_('EURUSDd')
    #print(_zmq._thread_data_output)
    #print(_zmq._get_response_())
    #print('forex request success')
    # some JSON:
    x =  '{}'

    # parse x:
    data = json.loads(x)
    data["status"] = "unsub and tacking empty arraay sucsess"
    return data

if __name__ == '__main__':
	socketio.run(app, debug=True)

####################################

#Use find # My_edit to see where I add up some code in the source
#Use #defualt that i disable
