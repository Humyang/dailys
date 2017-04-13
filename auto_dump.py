#!/usr/bin/env python
# auto backup Mongodb document
import commands
import re
import subprocess
from datetime import *

def run_command(command):
    status,info = commands.getstatusoutput(command)
    print command,'result is ',status
    if status == 0:
        return 1
    else:
        print command,'info faile,bcs ',info
        return 0

# get today
today = datetime.today().strftime('%y-%m-%d')
# run mongodump
mongodump = run_command('/usr/local/bin/mongodump --out /data/backup/'+today+'/')
if mongodump == 1:
    print 'backup success'
