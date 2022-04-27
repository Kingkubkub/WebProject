from jinja2 import Undefined
import pandas as pd
import numpy as np
import json
import chardet #lib that use to read byte of the file and tell you what exacly there unicode is ,useful when need to open a file that caught unicode error
with open('test.csv', 'rb') as rawdata: # this use to see what unicode is to put in a pd.read_csv or else if you don't put correct unicode you end up get nothing from your data but error or wrong encode data
    result = chardet.detect(rawdata.read(100000))# read like 100000 byte this is what i belive an put it to chardet to detect
print(result) # print to see what unicode is

######### SUMMARY 
##### 1. READ DATA
##### 2. EXTRACT DATA
##### 3. Declare Variable for compare
##### 4. DECLARE(JSON TYPE)
##### 5. COMPARE TO(JSON TYPE)
#####* end of sumary
#########

##### 1. READ DATA
data = pd.read_csv('test.csv', encoding='UTF-16', header=None) #this is test sample in real sample  there will be thing we don't need
#example of sample 
    #2017.09.14 06:10:37	1.6082	1.60923	2	970
    #or put a , instead of \t
    #2017.09.14 06:10:37,1.6082,1.60923,2,970
    
    #explain data by index deli by whatever "\t" or ","
        #index0 aka 2017.09.14 06:10:37 
            #yes is a time
        #index1 aka 1.6082
            #bid   
        #index2 aka 1.60923
            #ask   
        #index3 aka 2
            #direction "2 mean down" "1 mean up" well we still have to prove this this is the most reliable what define 2 and 1 below is not
        #index4 aka 970
            #point by how far those direction in index3 go before going to another direction
#example of real data (real data is in "desktop/www/todo" by the way)
    #2017.09.15 15:59:48,3015.4,3051.4,2,170796,2017.09.18 11:22:18,3942.53,3978.53
#so to say that real data we don't need the second date and what come after that like this #2017.09.15 15:59:48,3015.4,3051.4,2,170796 #yes no second date
#*********that mean in real data you need to cut those second date off before going to use this code below
#####*

#####pop a sandbox
#print(data[0][1], type(data[0][1]))
#print(data[0][1][:19])
#print(data[0][1].find("\t"))
#print(len(data[0]))

#x =  '{ "forexName": {"pop":5} }'
#str_t = "test"

# parse x:
#y = json.loads(x)

# the result is a Python dictionary:
#y["forexName"]['skot'] ={}
#try:
  #y["forexName"][str_t] = y["forexName"][str_t]+1
#except:
  #y["forexName"][str_t] = 1

#y["forexName"]['skotik']
### ****************/////*******************/**** Here is important 1. TypeError error mean you're not declare {} aka object yet.    2. KeyError error mean you aready declare {} aka object but you invoke a value from unexist "key" i suppose there're call?
#print(y["forexName"]["test"])
#####
######*

##### 2. EXTRACT DATA
##Oficial
def cut(value_in_arr):#cut what we don't need aka (time, bid, ask)
    #example of arr
        #2017.09.14 06:10:37	1.6082	1.60923	2	970
    deli = value_in_arr.find("\t") #cut time
    value_in_arr = value_in_arr[deli+1:] #example of arr (1.6082	1.60923	2	970)
    deli = value_in_arr.find("\t") #cut bid
    value_in_arr = value_in_arr[deli+1:] #example of arr (1.60923	2	970)
    deli = value_in_arr.find("\t") #cut ask
    value_in_arr = value_in_arr[deli+1:] #example of arr (2	970)
    return value_in_arr
     #example of return [2	970]

x = map(cut, (data[0]))#cut(arr) what we don't need aka (time, bid, ask) in action
numpy_arr = np.asarray(list(x)) #map object are view by list so we convert that to numpay array to do map again

def digit_select(value_in_arr): #cut point and select only digit we need aka(101 = 1, 215 = 2, 1015 = 10, 2155 = 21) so to say we don't need last 2 digit in this case we can use slice last two digit aka(arr[:-2])
    #example of input aka(arr[n]) is something like 2\t970 or 2    970 ****well this digit select(arr) now handle point less then 100 yet
    #where first digit aka(2) is the direction of the zizag that gather this infomation where "2 is up" and "1 is down" direction
    #and second digit aka(970) is the point that tell how far the direction in the first digit go
    deli = value_in_arr.find("\t") #cut point
    point = value_in_arr[deli+1:] #put only point in to another array name point
    return (value_in_arr[:deli], point[:-2]) #put the first digit aka(arr[:deli]) back pair with point aka(point[:-2]) that aready cut two last digit
    #example of return  [['2' '9']
                        #['1' '4']
                        #['2' '10']
                        #...
                        #['1' '6']
                        #['2' '2']
                        #['1' '2']]

numpy_arr = map(digit_select, (numpy_arr)) #digit_select(arr) in action
numpy_arr = np.asarray(list(numpy_arr)) #again put a map object to list and convert them to numpyArray
#print(numpy_arr)
######*

##### 3. Variable for compare
#declare variable
direction_One = []
index_of_direction_One = 0
direction_Two = []
index_of_direction_Two = 0
min_lenght_of_direction_one_and_two = 0
first_data = numpy_arr[0][0] #this use to define how to compare either "1 to 2" or "2 to 1"
constrain = 1 #this variable use to plus on either "direction_One" or "direction_Two" index to match the order from_hight_to_low(1 to 2) or from_low_to_hight(2 to 1) 
#(It has to compare downward from the data right? no! lol  look like in example it upward and doing this seperate method logic it aready upward)
#*
for i in numpy_arr:
  if(i[0] == '1'): #put all the value of numpy_arr[i] where numpy_arr[i][0] == '1' to direction_One
    direction_One.append(i)
  else: #(i[0] == '1'): #put all the value of numpy_arr[i] where numpy_arr[i][0] == '2' to direction_Two
    direction_Two.append(i)  
#convert to numpy array for good use
direction_One = np.asarray(list(direction_One))
direction_Two = np.asarray(list(direction_Two))
#*
min_lenght_of_direction_one_and_two = (len(direction_One)) if len(direction_One) < len(direction_Two) else (len(direction_Two)) #choose the max lenght from direction_One and direction_Two

#about to do order from_hight_to_low(1 to 2)
#/// "constrain" variable rule
#/order from_hight_to_low(1 to 2)
#/-if first_data is "2" then += "constrain" variable to "index_of_direction_Two" variable
#/-else doing absolute nothing about constrain
#
#/order from_low_to_hight(2 to 1)
#/-if first_data is "1" then += "constrain" variable to "index_of_direction_One" variable
#/-else doing absolute nothing about constrain

#verify constrain rule in order from_hight_to_low(1 to 2)
if(first_data == '2'):
  index_of_direction_Two += constrain
#*
##### 4. DECLARE(JSON TYPE)
#JSON declare
json_initial =  '{ "forexName":"test" }'
json_initial = json.loads(json_initial)
json_initial["forexName"] = {} #from here you can add any value you want like a breads and butter if you not add {} first there will be one value it can hold
json_initial["forexName"]["name"] = "EURUSD(for example)" ##^  
json_initial["forexName"]["zigzig_parameter_aka_603015"] = {} ##^ 
json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Hight_to_Low_aka_GC"] = {} ###^ 
json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Low_To_Hight_aka_GC"] = {} ###^ 
##
#
##### 5. COMPARE(from_hight_to_low (12))(JSON TYPE)
for i in range(min_lenght_of_direction_one_and_two): #start from 0 like nomal index in array
  from_high_="from_high_"+direction_One[i+index_of_direction_One][1]+"00"
  to_low_ = "to_low_"+direction_Two[i+index_of_direction_Two][1]+"00"

  """ ### DEBUG aka print to compare value
  try:
    print(direction_One[i+index_of_direction_One], " | ",direction_Two[i+index_of_direction_Two])
  except:
    print("one data has end : one data lose")
  """

  try:## JSON it self** +1 to the value that "from_high" went to "to_low" IF it aready exist if not create one with the name of to_low_xxx where xxx is how far from_high went to and set value to 1 ***Mean from_high went to this to_low "+1" time(s)
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Hight_to_Low_aka_GC"][from_high_]
  except KeyError:
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Hight_to_Low_aka_GC"][from_high_] = {}

  try:
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Hight_to_Low_aka_GC"][from_high_][to_low_] += 1
  except KeyError:
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Hight_to_Low_aka_GC"][from_high_][to_low_] = 1
#*
####*


##### 3. Variable for compare(from_low_to_hight (21))
#reset index of direction to apply constrain rule to from_low_to_hight
index_of_direction_One = 0
index_of_direction_Two = 0
#about to do order from_low_to_hight(2 to 1)
#/// "constrain" variable rule
#/order from_hight_to_low(1 to 2)
#/-if first_data is "2" then += "constrain" variable to "index_of_direction_Two" variable
#/-else doing absolute nothing about constrain
#
#/order from_low_to_hight(2 to 1)
#/-if first_data is "1" then += "constrain" variable to "index_of_direction_One" variable
#/-else doing absolute nothing about constrain
#verify constrain rule in order from_low_to_hight(2 to 1)
if(first_data == '1'):
  index_of_direction_One += constrain
#*
#####*
##### 5. COMPARE(from_low_to_hight (21))(JSON TYPE)
for i in range(min_lenght_of_direction_one_and_two): #start from 0 like nomal index in array
  from_low_="from_low_"+direction_Two[i+index_of_direction_Two][1]+"00"
  to_high_ = "to_high_"+direction_One[i+index_of_direction_One][1]+"00"

  """ ### DEBUG aka print to compare value
  try:
    print(direction_One[i+index_of_direction_Two], " | ",direction_Two[i+index_of_direction_One])
  except:
    print("one data has end : one data lose")
  """

  try:## JSON it self** +1 to the value that "from_high" went to "to_low" IF it aready exist if not create one with the name of to_low_xxx where xxx is how far from_high went to and set value to 1 ***Mean from_high went to this to_low "+1" time(s)
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Low_To_Hight_aka_GC"][from_low_]
  except KeyError:
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Low_To_Hight_aka_GC"][from_low_] = {}

  try:
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Low_To_Hight_aka_GC"][from_low_][to_high_] += 1
  except KeyError:
    json_initial["forexName"]["zigzig_parameter_aka_603015"]["from_Low_To_Hight_aka_GC"][from_low_][to_high_] = 1
#*
####*
f = open("demofile2.txt", "a")
str = json.dumps(json_initial, indent=4, separators=(", ", " = "))
f.write(str)
f.close()
print(json.dumps(json_initial, indent=4, separators=(". ", " = "))) ### Debug logic

"""""
##########Test sample
##### POP a sandBOX
cout = 0
index = 0
for i in numpy_arr:
    if(i[1] == '18' and i[0] == '1'):
        cout+=1
        try:
            print(i,index+1," | ", data[0][index]," -----> ",data[0][index+1])
        except:
            print(i,index+1," | ", data[0][index]," -----> end")
    index += 1
print('cout = ',cout)
#####
###########
"""
