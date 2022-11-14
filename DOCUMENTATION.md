# Randmeet

## Sommaire

- [Randmeet](#randmeet)
  - [Sommaire](#sommaire)
  - [Format du fichier CSV](#format-du-fichier-csv)

## Format du fichier CSV

Le fichier CSV doit obligatoirement avoir des points virgules pour la séparation
des données et avoir ce format:

| Nom           | Status  |   Projet |
| :------------ | :-----: | -------: |
| Jean Dupont   | Manager | Projet A |
| Paul Dupont   |   PM    | Projet A |
| Marie Dupont  |         | Projet B |
| Claire Dupont |  DUOA   | Projet C |

**Attention: Les champs _Nom_ et _Projet_ sont obligatoires !**

Si vous ouvrez ce même fichier dans un éditeur de texte, il doit ressembler à
ceci:

```csv
Nom;Status;Projet
Jean Dupont;Manager;Projet A
Paul Dupont;PM;Projet A
Marie Dupont;;Projet B
Claire Dupont;DUOA;Projet B
```
