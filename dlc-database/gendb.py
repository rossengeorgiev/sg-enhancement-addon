#!/usr/bin/python -u

"""
DLC Database generator - extracts all active DLCs from store.steampowered.com
Copyright (C) 2012 Rossen Georgiev

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""

import json
import urllib2 
import re
import sys
import threading

# global vars
page = 1
s_url = "http://store.steampowered.com/search/?term=%20&category1=21&sort_order=ASC&page="
dlc = {}
output_filename = "sge_dlc_database.json"
max_threads = 5

def flush_db():
	#output to json
	print "\nWritting to %s" % output_filename

	out = open(output_filename, 'w')
	out.write(json.dumps(dlc,indent=4).replace("    ",'\t'))

	# close files
	out.close()
	log.close()

def worker(url,name):
	global dlc, thread_n, log
	
	try:
		r = bro.open(url).read()
		game = re.findall(r"base game.*?>(.*?)<\/a> on Steam", r)[0]

		if not dlc.has_key(game):
			dlc[game] = []
		
		dlc[game].append(name)
	except:
		log.write("Failed to parse: %s\n" % url)	

	thread_n -= 1 # thread is finished

bro = urllib2.build_opener()
bro.addheaders.append(('Cookie', 'birthtime=-1735660799')) # to pass steam age check

thread_n = 0
log = open('error.log', 'w')

try:
	while 1:
		# print progress
		print "\rParsing page %d... " % page, " "*10,

		r = re.sub("[\n\r]", "", bro.open(s_url + str(page)).read())
		d = re.findall(r"href=\"(.{,150})\" class=\"search_result_row.*?<h4>(.*?)<\/h4>", r)

		# we've reached the end, stop
		if len(d) == 0:
			break;
			print "\n",

		# this is 2012, parallel is king
		x = 0
		thread_n = 0
		while x < len(d):
			if thread_n < max_threads:
				dlc_url = d[x][0]
				dlc_name = d[x][1]
				threading.Thread(target=worker, args=(dlc_url,dlc_name,)).start()
				thread_n += 1

				# update progress
				x += 1
				print "\rParsing page %d..." % page, "%d/%d" % (x,len(d)),

		# move to next page
		page += 1

except KeyboardInterrupt:
	print "\nInterrupted, stopping...\n",
	flush_db()
	sys.exit()

flush_db()





