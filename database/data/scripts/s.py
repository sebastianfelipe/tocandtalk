cfile = open('language.json')
nfile = open('nfile.json', 'w')

for line in cfile:
	#print line.lower()
	nfile.write(line.lower())

cfile.close()
nfile.close()
