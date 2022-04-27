import subprocess
#***************************SUMMARY OF THIS SHEET*******************************
#defination of this sheet
#to open stagedytest in MT4 and run sexy model init
#user will be able to define 7 variable in the parameter of sexy model, the 7 variable that user can be define is 
  #symbol
  #timeframe
  #from_date
  #to_date
  #---below is zigzag parameter-----
  #depth
  #diviation
  #backstep
#lastly the return of this sheet(def run) is the location of file that calculate from given parameter that lied above
#the result file is สถิติการกลับตัว ที่ยังไม่ได้ผ่านการกรอง จะเอาไปกรองอีกทีในชีท ที่ชื่อ "Wrapper_sexy_seperate_method.py"
#***************************----------------------*******************************
print("start")
def run(symbol, timeframe, from_date, to_date, depth, diviation, backstep): #date format to throw in example yyyy.mm.dd (2022.03.27)
  confiq_startup_fileName = "start_strategy_tester_"+symbol+"_"+timeframe+"_fromdate_"+from_date+"_todate_"+to_date+".txt" #start by declare the name of the confiq file via the input symbol
  f = open("C:/Users/ArKa/AppData/Roaming/MetaQuotes/Terminal/4D4B4D4E14CC1434F986FD62C448B847/"+confiq_startup_fileName, "w")#write a file that mean a previos confiq will get overwritten
  confiq_zigzig_fileName = "zigzag_param_"+symbol+"_depth_"+depth+"_diviation_"+diviation+"_backstep_"+backstep+".set" #start by declare the name of the confiq file via the preferance of zigzag
  zigzag_param = open("C:/Users/ArKa/AppData/Roaming\MetaQuotes/Terminal/4D4B4D4E14CC1434F986FD62C448B847/tester/"+confiq_zigzig_fileName, "w")#write a file that mean a previos confiq will get overwritten

  ##variable meaning
  #f : is for a typical config detail that can be config lied below
    #-symbol
    #-timeframe
    #-from_date
    #-to_date

  #zigzag_param : is for a typical config for zigzag detail that can be config lied below
    #-depth
    #-diaviation
    #-backstep
    
  #alright this will write the confiq_zigzag of Sexy.mql in MT4 to set it
  confiq_text_zigzag = "maxOrder=8\nmaxOrder,F=0\nmaxOrder,1=8\nmaxOrder,2=0\nmaxOrder,3=0\ndistance_input=400.00000000\ndistance_input,F=0\ndistance_input,1=400.00000000\ndistance_input,2=0.00000000\ndistance_input,3=0.00000000\ntakeProfit=200.00000000\ntakeProfit,F=0\ntakeProfit,1=200.00000000\ntakeProfit,2=0.00000000\ntakeProfit,3=0.00000000\nlotsize=0.01000000\nlotsize,F=0\nlotsize,1=0.01000000\nlotsize,2=0.00000000\nlotsize,3=0.00000000\nupBound=2.00000000\nupBound,F=0\nupBound,1=2.00000000\nupBound,2=0.00000000\nupBound,3=0.00000000\nlowBound=0.00000000\nlowBound,F=0\nlowBound,1=0.00000000\nlowBound,2=0.00000000\nlowBound,3=0.00000000\ntrailingstop=100.00000000\ntrailingstop,F=0\ntrailingstop,1=100.00000000\ntrailingstop,2=0.00000000\ntrailingstop,3=0.00000000\ncutloss=5.00000000\ncutloss,F=0\ncutloss,1=5.00000000\ncutloss,2=0.00000000\ncutloss,3=0.00000000\nmode=1\nmode,F=0\nmode,1=1\nmode,2=0\nmode,3=0\n"
  #we write what not out variable now let's dance on dynamic
  confiq_text_zigzag += "depth="+depth+"\ndepth,F=0\ndepth,1="+depth+"\ndepth,2=0\ndepth,3=0\ndiviation="+diviation+"\ndiviation,F=0\ndiviation,1="+diviation+"\ndiviation,2=0\ndiviation,3=0\nbackstep="+backstep+"\nbackstep,F=0\nbackstep,1="+backstep+"\nbackstep,2=0\nbackstep,3=0"
  zigzag_param.write(confiq_text_zigzag)
  zigzag_param.close() #don't forget to close the file after you finish writing it so it can use to another domain properly

  #alright this will write the confiq startup command of MT4 to the decleared file
  confiq_text_command = "; start strategy tester\nTestExpert=Sexy_V13\nTestExpertParameters="+confiq_zigzig_fileName+"\nTestSymbol="+symbol+"\nTestPeriod="+timeframe+"\nTestModel=0\nTestSpread=0\nTestOptimization=false\nTestDateEnable=true\nTestFromDate="+from_date+"\nTestToDate="+to_date+"\nTestReport=EURreport\nTestReplaceReport=true\nTestShutdownTerminal=true"
  f.write(confiq_text_command)
  f.close() #don't forget to close the file after you finish writing it

  #punch line this is use to call the subprocess that will open an exacuteble program in your local machine via python (another method is use os libary but I choose this subprocess lib) 
  subprocess.call(["C:\Program Files (x86)\GMI MetaTrader 4 Terminal/terminal.exe", confiq_startup_fileName])#yes the first perameter is where the execute program you want to lauch and second is a start up confiq if the execute program has one (in this case MT4 has an option start up that support .txt to store the confiq command)
  
  #The code below will execute once "subprocess.call" is done mean "error occur" or "exacuteble program is close (as the confiq say "TestShutdownTerminal=true" I aready told them to close once there finish so we good to go!!)"
  file_path = "C:/Users/ArKa/AppData/Roaming/MetaQuotes/Terminal/4D4B4D4E14CC1434F986FD62C448B847/tester/files"+"SWK_GC_01012020" #this could be the name of what professor declare it in his sexy.mql
  return file_path

file_and_path = run("EURUSDgmp", "M5", "2022.03.01", "2022.03.10", "30", "15", "10") #example once there run finish there will return an absolute file path
print("finish")