import subprocess
import time

"""
# call a mt4
subprocess.call(["C:\Program Files (x86)\GMI MetaTrader 4 Terminal/terminal.exe", "start.txt"])#yes
print("I am after subprocess call")
for i in range(10):
    print(i)
    time.sleep(1)
print("the test is done after the subprocess end")

#C:\Users\ArKa\AppData\Roaming\MetaQuotes\Terminal\4D4B4D4E14CC1434F986FD62C448B847

#create a confiq startup file
str = "pop.txt"

f = open("C:/Users/ArKa/AppData/Roaming/MetaQuotes/Terminal/4D4B4D4E14CC1434F986FD62C448B847/"+str, "x")
f.write("; start strategy tester\nTestExpert=Sexy_V13\nTestExpertParameters=my.set\nTestSymbol=EURUSDgmp\nTestPeriod=M5\nTestModel=0\nTestSpread=0\nTestOptimization=false\nTestDateEnable=true\nTestFromDate=2020.01.01\nTestToDate=2022.03.10\nTestReport=EURreport\nTestReplaceReport=true\nTestShutdownTerminal=false")
f.close()


 #Delete file if exist
import os
if os.path.exists("C:/Users/ArKa/AppData/Roaming/MetaQuotes/Terminal/4D4B4D4E14CC1434F986FD62C448B847/"+str):
  os.remove("C:/Users/ArKa/AppData/Roaming/MetaQuotes/Terminal/4D4B4D4E14CC1434F986FD62C448B847/"+str)
else:
  print("The file does not exist")

"""
#print("pop")

#def run(symbol, timeframe, from_date, to_date): #date format to throw in example yyyy.mm.dd (2022.03.27)
  #confiq_startup = "start_strategy_tester_"+symbol+"_"+timeframe+".txt" #start by declare the name of the confiq file via the input symbol
  #f = open("C:/Users/ArKa/AppData/Roaming/MetaQuotes/Terminal/4D4B4D4E14CC1434F986FD62C448B847/"+confiq_startup, "w")#write a file that mean a previos confiq will get overwritten

  #alright this will write the confiq startup command of MT4 to the decleared file
  #f.write("; start strategy tester\nTestExpert=Sexy_V13\nTestExpertParameters=my.set\nTestSymbol=", symbol, "\nTestPeriod=", timeframe, "\nTestModel=0\nTestSpread=0\nTestOptimization=false\nTestDateEnable=true\nTestFromDate=", from_date,"\nTestToDate=", to_date,"\nTestReport=EURreport\nTestReplaceReport=true\nTestShutdownTerminal=true")
  #f.close() #don't forget to close the file after you finish writing it

  #punch line this is use to call the subprocess or open a exacuteble program in your local machine via python (another method is use os libary but I choose this subprocess lib) 
  #subprocess.call(["C:\Program Files (x86)\GMI MetaTrader 4 Terminal/terminal.exe", confiq_startup])#yes the first perameter is where the execute program you want to lauch and second is a start up confiq if the execute program has one (in this case MT4 has an option start up that support .txt to store the confiq command)

  #The code below will execute once "subprocess.call" is done mean "error occur" or "exacuteble program is close (as the confiq say "TestShutdownTerminal=true" I aready told them to close once there finish so we good to go!!)"


