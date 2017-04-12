# auto backup Mongodb document
import commands
import re
import subprocess
import datetime

def run_command(command):
    status,info = commands.getstatusoutput(command)
    print command,'result is ',status
    if status == 0:
        return 1
    else:
        print command,'info faile,bcs ',info
        return 0
        
# get today
today = datetime.today().strftime('%y-%m-%d %H %M %S')
# run mongodump
mongodump = run_command('mongodump --out /data/backup/'+today+'/')
if mongodump == 1:
    print 'backup success'
