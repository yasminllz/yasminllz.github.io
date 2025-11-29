import os
import shutil


# 1. Criar e ler um arquivo 

# Cria um arquivo e escreve algo dentro
with open('arquivo.txt', 'w') as arq:
    arq.write("Olis criado pelo Python.")

# Lê o arquivo criado
with open('arquivo.txt', 'r') as arq:
    print("Conteúdo do arquivo.txt:")
    print(arq.read())



# 2. Criar um diretório

if not os.path.exists('diretorio_exemplo'):
    os.mkdir('diretorio_exemplo')
    print("Diretório criado: diretorio_exemplo")



# 3. Renomear um diretório

if os.path.exists('diretorio_exemplo'):
    os.rename('diretorio_exemplo', 'diretorio_renomeado')
    print("Diretório renomeado para: diretorio_renomeado")



# 4. Listar arquivos em um diretório

print("\nArquivos no diretório renomeado:")
with os.scandir('diretorio_renomeado') as entrada:
    for item in entrada:
        print(item.name)



# 5. Copiar arquivos ou diretórios

# Copiar arquivo
shutil.copy('arquivo.txt', 'diretorio_renomeado/arquivo_copiado.txt')
print("\nArquivo copiado para diretorio_renomeado")

# Copiar diretório inteiro
if os.path.exists('diretorio_renomeado'):
    if not os.path.exists('diretorio_copia'):
        shutil.copytree('diretorio_renomeado', 'diretorio_copia')
        print("Diretório copiado para: diretorio_copia")



# 6. Remover arquivos/diretórios

# Remove arquivo se existir
if os.path.exists('arquivo.txt'):
    os.remove('arquivo.txt')
    print("arquivo.txt removido.")

# Remove diretório recursivamente
if os.path.exists('diretorio_copia'):
    shutil.rmtree('diretorio_copia')
    print("diretorio_copia removido.")
