import statistics

def moda1(lista):
    moda = statistics.mode(lista)
    print('Moda: ', moda)
    
def mediana1(lista):
    mediana = statistics.median(lista)
    print('Mediana: ', mediana)

def varianca1(lista):
    varianca = statistics.variance(lista)
    print('Variança: ', varianca)
def desvio1(lista):
    desvio = statistics.stdev(lista)
    print(f'Desvio padrão:  {desvio}')
def media1(lista):
    media = statistics.mean(lista)
    print('Media: ', media)
 