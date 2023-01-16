def clean_lines(line):
    return line.strip().split("\t")

f = open("./coordenadas.txt", "r")
lines  = f.readlines()
cleanlines = list(map(clean_lines,lines))
f.close()
xformatted = list(map(lambda l: l[0], cleanlines))
yformatted = list(map(lambda l: l[1], cleanlines))
xstring = 'let xinput = [' + ','.join(xformatted) + ']\n'
ystring = 'let yinput = [' + ','.join(yformatted) + ']\n'

print(xstring + ystring)



nf = open("./datos.js", "w")
nf.write(xstring + ystring)
nf.close()
